import subprocess
import re

TEMPLATE_PATH = "template.cpp"
SOURCE_PATH = "source.cpp"
EXEC_PATH = "compiled"

import re

instructions = r'\,\.\[\]\<\>\+\-'

def sanitize_line( line ):
    line = line.replace( ' ', '' ) # remove spaces
    end_idx = -1
    for idx, ch in line[::-1]: # reverses string
        if not re.match( instructions, ch ):
            end_idx = idx

    end_idx = len( line ) - end_idx
    line = line[:end_idx]

def run( file_path ):
    user_program = ''
    with open( file_path, r ) as bf:
        user_program = bf.read()

    # remove \r because it is wierd af
    clean_program = ''.join( list( map( user_program.split( '\n' ), sanitize_line ) ) )

    with open( TEMPLATE_PATH, 'r' ) as tmp:
        source = tmp.read().replace( 'PROGRAM_BF', clean_program )
        src = open( SOURCE_PATH, 'w' )
        src.write( source )
        src.close()

        subprocess.run( ['g++', '-Wall', '-O2', SOURCE_PATH, '-o', EXEC_PATH] )
