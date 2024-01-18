import logging

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

def update_standing(standings: list, match_updated, value: dict):
    for k in value.keys():
        game = value[k][match_updated]
    draw = False
    if game['scores']['home'] == game['scores']['away']:
        draw = True
    elif game['scores']['home'] > game['scores']['away']:
        game_won = "home"
        game_lost = "away"
    else:
        game_won = "away"
        game_lost = "home"
    
    if draw:
        standings[game['home']]["D"] =int( standings[game['home']]["D"]) + 1
        standings[game['away']]["D"] = int(standings[game['away']]["D"]) + 1

        standings[game['home']]["PTS"] = int(standings[game['home']]["PTS"]) + 1
        standings[game['away']]["PTS"] = int(standings[game['away']]["PTS"]) + 1
    else:
        standings[game[game_won]]["PTS"] = int(standings[game[game_won]]["PTS"]) + 3
        standings[game[game_won]]["W"] = int(standings[game[game_won]]["W"]) + 1
        standings[game[game_lost]]["L"] = int(standings[game[game_lost]]["L"]) + 1

    standings[game['home']]["MP"] = int(standings[game['home']]["MP"]) + 1
    standings[game['away']]["MP"] = int(standings[game['away']]["MP"]) + 1

    standings[game['home']]["GA"] = int(standings[game['home']]["GA"]) + int(game['scores']['away'])
    standings[game['away']]["GA"] = int(standings[game['away']]["GA"]) + int(game['scores']['home'])

    standings[game['home']]["GF"] = int(standings[game['home']]["GF"]) + int(game['scores']['home'])
    standings[game['away']]["GF"] = int(standings[game['away']]["GF"]) + int(game['scores']['away'])

    standings[game['home']]["GD"] = int(standings[game['home']]["GF"]) - int(standings[game['home']]["GA"])
    standings[game['away']]["GD"] = int(standings[game['away']]["GF"]) - int(standings[game['away']]["GA"])

    obj_id = standings.pop('_id')

    return standings, obj_id
