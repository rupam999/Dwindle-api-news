import sys
from pycricbuzz import Cricbuzz
import json

mid = sys.argv[1]

c = Cricbuzz()
minfo = c.matchinfo(mid)
print(json.dumps(minfo, indent=4, sort_keys=True))