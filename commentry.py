import sys
from pycricbuzz import Cricbuzz
import json

mid = sys.argv[1]
mid = str(mid)

c = Cricbuzz()
comm = c.commentary(mid)
print(json.dumps(comm, indent=4, sort_keys=True))