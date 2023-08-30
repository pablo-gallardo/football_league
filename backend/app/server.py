from flask import Flask, jsonify, request
from flask_cors import CORS
from competitions.scheduler.roundrobin import RoundRobinScheduler
from pymongo import MongoClient
from helpers.helpers import update_standing
import logging
from bson import ObjectId
from os import environ as env

PORT = env.get("APP_PORT", 5001)
MONGO_PORT = env.get("MONGO_PORT", 5010)
MONGO_USERNAME = env.get("MONGO_USERNAME", "admin")
MONGO_PASSWORD = env.get("MONGO_PASSWORD", "adminpassword")
MONGO_URL = env.get("MONGO_URL", f"mongodb://{MONGO_USERNAME}:{MONGO_PASSWORD}@localhost:{MONGO_PORT}")

logging.basicConfig(level=logging.DEBUG,  # Set the minimum level to record (DEBUG, INFO, WARNING, ERROR, CRITICAL)
                    format='%(asctime)s - %(levelname)s - %(message)s')

client = MongoClient(MONGO_URL)
app = Flask(__name__)
CORS(app)

@app.route('/api/league/<league>/match', methods=['POST'])
def generate_schedule(league):
    """
    Create new match schedule.

    ...

    output:
    ------
    
    {
        str: [{
            "away": str,
            "home": str,
            "scores": {
                "away": null
                "home": null
            }
        },
        {
            ...
        }],
        str: [{...}]
    }
    """
    db = client[league]
    teams = list(db['teams'].find({}))[0]['teams']

    matches = RoundRobinScheduler(teams, 2)
    schedule = matches.generate_schedule()

    result = {}
    for day, matches in enumerate(schedule, 1):
        result[f"{day}"] = []
        for home, away in matches:
            if home == None or away == None:
                continue
            result[f"{day}"].append({"day": day, "home": home, "away": away, "scores": {"home": None, "away": None}})
    
    collection = db['matches']
    create_doc = collection.insert_one(result)
    
    return jsonify({'message': 'Created successfully', 'id': f"{create_doc.inserted_id}"}), 201

@app.route('/api/league/<league>/match/<id>', methods=['PUT'])
def update_schedule(league: str, id: str):
    """
    Update match score and the standings table

    ...

    params:
    ------
        league: The name of the football league
        id: The id of the document to update
    
    body:
    -----
        {
        "value": {
            str: [{
                "away": str,
                "home": str,
                "scores": {
                    "away": int
                    "home": int
                },
                { ... }
            ]
        },
        "match_updated": int
    ...
    """
    body = request.json
    value = body['value']
    match_updated = body['match_updated']
    db = client[league]
    collection_matches = db['matches']
    update_match = collection_matches.update_one({"_id": ObjectId(id)}, {"$set": value})
    if update_match.modified_count != 0:

        collection_standings = db['standings']
        current_standings = list(collection_standings.find({}))[0]
        
        new_standing, obj_id = update_standing(current_standings, match_updated, value)

        collection_standings.update_one({"_id": obj_id}, {"$set": new_standing})

        return jsonify({'message': 'Updated successfully'}), 201

    return jsonify({'message': 'No modification took place'}), 200

@app.route('/api/league/<league>/match/<id>', methods=['DELETE'])
def delete_schedule(league, id):
    """
    Delete match score and the standings table

    ...

    params:
    ------
        league: The name of the football league
        id: The id of the document to update
    ...
    """
    db = client[league]
    collection = db['matches']
    result = collection.delete_one({"_id": ObjectId(id)})

    if result.deleted_count > 0:
        return jsonify({'message': 'Deleted successfully'}), 200
    else:
        return jsonify({'message': 'No documents were deleted'}), 200

@app.route('/api/league/<league>/match', methods=['GET'])
def get_matches(league):
    """
    Retrieves the matches information

    ...

    params
    -----
        league: The name of the league

    output:
    -----

    {
        str: [{
            "away": str,
            "home": str,
            "scores": {
                "away": int
                "home": int
            }
        },
        {
            ...
        }],
        str: [{...}]
    }
    """
    try:
        db = client[league]
        collection = db['matches']
        items = list(collection.find({}))[0]
        items["_id"] = str(items["_id"])
    except Exception as err:
        print(err)
        return jsonify({'error': 'Internal Server Error'}), 500
    return jsonify(items), 200

@app.route('/api/league/<league>', methods=['GET'])
def get_league_info(league):
    """
    Gets a new league on the database in the 'teams' collection
    ...

    params
    -----

        league: the name of the league

    output
    -----
    {
        desc: string,
        teams: list
    }
    ...
    """
    try:
        db = client[league]
        collection = db['teams']
        items = list(collection.find({}))[0]
        items["_id"] = str(items["_id"])
    except Exception as err:
        print(err)
        return jsonify({'error': 'Internal Server Error'}), 500
    return jsonify(items), 200

@app.route('/api/league/<league>/<id>', methods=['DELETE'])
def delete_league(league, id):
    """
    Delete league

    ...

    params:
    ------
        league: The name of the football league
        id: The id of the document to update
    ...
    """
    db = client[league]
    collection = db['teams']
    result = collection.delete_one({"_id": ObjectId(id)})

    if result.deleted_count > 0:
        return jsonify({'message': 'Deleted successfully'}), 200
    else:
        return jsonify({'message': 'No documents were deleted'}), 200

@app.route('/api/league/<league>', methods=['POST'])
def create_league(league):
    """
    Creates a new league on the database with the 'teams' collection

    ...

    Body:
    _____
    {
        desc: string,
        teams: list
    }
    ...
    """
    try:
        data = request.json
        data['name'] = league
        teams = data["teams"]
        db = client[data['name']]
        collection = db['teams']
        collection.insert_one(data)

        result = {}
        for item in teams:
            result[item] = {
                "MP": 0,
                "W": 0,
                "D": 0,
                "L": 0,
                "GF": 0,
                "GA": 0,
                "GD": 0,
                "PTS": 0,
                "Team": item
            }
        
        standings = db['standings']
        standings.insert_one(result)
    except Exception as err:
        print(err)
        return jsonify({'error': 'Internal Server Error'}), 500
    return jsonify({'message': 'League created successfully'}), 201

@app.route('/api/league/<league>/standings', methods=['GET'])
def get_standings(league):
    """Retrieves information from the league"""
    try:
        db = client[league]
        collection = db['standings']
        items = list(collection.find({}))[0]
        items["_id"] = str(items["_id"])
    except Exception as err:
        print(err)
        return jsonify({'error': 'Internal Server Error'}), 500
    return jsonify(items), 200

@app.route('/api/league/<league>/standings', methods=['POST'])
def create_standings(league):
    """Retrieves information from the league"""
    try:
        db = client[league]
        standings = db['standings']
        teams_collection = db['teams']
        teams = list(teams_collection.find({}))[0]['teams']
        result = {}
        for item in teams:
            result[item] = {
                "MP": 0,
                "W": 0,
                "D": 0,
                "L": 0,
                "GF": 0,
                "GA": 0,
                "GD": 0,
                "PTS": 0,
                "Team": item
            }
        create_doc = standings.insert_one(result)
    except Exception as err:
        print(err)
        return jsonify({'error': 'Internal Server Error'}), 500
    return jsonify({'message': 'Created successfully', 'id': f"{create_doc.inserted_id}"}), 201

@app.route('/api/league/<league>/standings/<id>', methods=['DELETE'])
def delete_standing(league, id):
    db = client[league]
    collection = db['standings']
    result = collection.delete_one({"_id": ObjectId(id)})

    if result.deleted_count > 0:
        return jsonify({'message': 'Deleted successfully'}), 200
    else:
        return jsonify({'message': 'No documents were deleted'}), 200

@app.route('/api/league/all', methods=['GET'])
def get_league_all():
    """
    Get all leagues
    ...

    params
    -----

        league: the name of the league

    output
    -----
    {
        desc: string,
        teams: list
    }
    ...
    """
    try:
        db_to_remove = ['admin', 'local', 'config']
        items = client.list_database_names()
        for db in db_to_remove:
            items.remove(db)
    except Exception as err:
        print(err)
        return jsonify({'error': 'Internal Server Error'}), 500
    return jsonify(items), 200

if __name__ == '__main__':
    app.run(debug=True, port=PORT, host='localhost')