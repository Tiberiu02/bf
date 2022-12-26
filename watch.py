import time
import os
import sys

import runbf

print( sys.argv )

BF_FILE = sys.argv[1]
WATCH = False
if len( sys.argv ) > 2 and sys.argv[2] == 'watch':
    WATCH = True

if not os.path.exists( BF_FILE ):
    print( 'Nu exista fisierul!' )
    sys.exit( 1 )

prev_timestamp = 0

if not WATCH:
    print( 'output: ', end = '' )
    runbf.run( BF_FILE )
    sys.exit( 0 )

while True:
    curr_timestamp = os.path.getmtime( BF_FILE )

    if prev_timestamp != curr_timestamp:
        print( 'File Changed: running...' )
        print( 'output: ', end = '' )
        runbf.run( BF_FILE )
        prev_timestamp = curr_timestamp

    time.sleep( 0.1 )
