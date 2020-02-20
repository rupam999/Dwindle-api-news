import sys
from pycricbuzz import Cricbuzz
import json

mid = sys.argv[1]

c = Cricbuzz()
lscore = c.livescore(mid)
print(json.dumps(lscore, indent=4, sort_keys=True))