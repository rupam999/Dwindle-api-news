from flask import Flask, request
from flask_restful import Resource, Api
from pycricbuzz import Cricbuzz
import sys
import json

app = Flask(__name__)
api = Api(app)

class AllMatch(Resource):
    def get(self):
    	matches = Cricbuzz()
    	data = json.dumps(matches.matches(), indent=4, sort_keys=True)
    	return json.loads(data)

class Livescore(Resource):
	def get(self):
		c = Cricbuzz()
		matchid = request.args.get('matchid')
		lscore = c.livescore(matchid)
		scoreData = json.dumps(lscore, indent=4, sort_keys=True)
		return json.loads(scoreData)

api.add_resource(AllMatch, '/')
api.add_resource(Livescore, '/livescore')

if __name__ == '__main__':
    app.run(debug=True)