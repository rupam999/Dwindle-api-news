import sys
from pycricbuzz import Cricbuzz
import json

mid = sys.argv[1]

c = Cricbuzz()
scard = c.scorecard(mid)
print(json.dumps(scard, indent=4, sort_keys=True))