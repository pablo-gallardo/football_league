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
        standings[game['home']]["D"] = standings[game['home']]["D"] + 1
        standings[game['away']]["D"] = standings[game['away']]["D"] + 1

        standings[game['home']]["PTS"] = standings[game['home']]["PTS"] + 1
        standings[game['away']]["PTS"] = standings[game['away']]["PTS"] + 1
    else:
        standings[game[game_won]]["PTS"] = standings[game[game_won]]["PTS"] + 3
        standings[game[game_won]]["W"] = standings[game[game_won]]["W"] + 1
        standings[game[game_lost]]["L"] = standings[game[game_lost]]["L"] + 1

    standings[game['home']]["MP"] = standings[game['home']]["MP"] + 1
    standings[game['away']]["MP"] = standings[game['away']]["MP"] + 1

    standings[game['home']]["GA"] = standings[game['home']]["GA"] + game['scores']['away']
    standings[game['away']]["GA"] = standings[game['away']]["GA"] + game['scores']['home']

    standings[game['home']]["GF"] = standings[game['home']]["GF"] + game['scores']['home']
    standings[game['away']]["GF"] = standings[game['away']]["GF"] + game['scores']['away']

    standings[game['home']]["GD"] = standings[game['home']]["GF"] - standings[game['home']]["GA"]
    standings[game['away']]["GD"] = standings[game['away']]["GF"] - standings[game['away']]["GA"]

    obj_id = standings.pop('_id')

    return standings, obj_id
