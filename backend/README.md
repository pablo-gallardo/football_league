# Football league server

This is a simple service that create football leagues, this service uses mongodb for the data storage. Currently, the service saves a league information in a db within mongo, and then created the necessary collections. 

## Datanase topology

```
db (league)
|__ teams
|__ standings
|__ matches
```

## Collections

| Collections   | Desc          |
| ------------- |-------------|
| teams         | Saves the league and teams data |
| standings     | Saves the standing table information      |
| matches       | Saves the match calendar based on match days      |

# How to run

### Dependencies

To start running this service, for the backend, install `poetry` which can be found on this link: https://python-poetry.org/

Other than that, the usual: docker, mongodb

Once poetry has been installed, run `poetry install` to install the packages needed to run this service

Use `poetry run python server.py` to start he service