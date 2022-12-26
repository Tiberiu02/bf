import subprocess
import re

TEMPLATE_PATH = "template.cpp"
SOURCE_PATH = "source.cpp"
EXEC_PATH = "compiled"

instructions = '.,<>[]+-'

def sanitize_line( line ):
    line = line.replace( ' ', '' ) # remove spaces
    end_idx = len( line )
    for idx, ch in enumerate( reversed( line ) ): # reverses string
        if not ch in instructions:
            end_idx = idx

    return line[:end_idx]

def run( file_path ):
    user_program = ''
    with open( file_path, 'r' ) as bf:
        user_program = bf.read()

    # remove \r because it is wierd af
    clean_program = ''.join( list( map( sanitize_line, user_program.split( '\n' ) ) ) )

    with open( TEMPLATE_PATH, 'r' ) as tmp:
        source = tmp.read().replace( 'PROGRAM_BF', clean_program )
        src = open( SOURCE_PATH, 'w' )
        src.write( source )
        src.close()

        subprocess.run( ['g++', '-Wall', '-O2', SOURCE_PATH, '-o', EXEC_PATH] )
        subprocess.run( ['./compiled'] )
        print( '' )
