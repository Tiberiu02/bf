#include <bits/stdc++.h>

using namespace std;

struct interpretor {
    static const long long MAX_OP = 5e9;
    vector <unsigned char> v;
    string output;
    unsigned int pointer;
    long long op;
    interpretor() {
        pointer = op = 0;
        output = "";
        v.push_back( 0 );
    }
    inline void inc_p() {
        pointer ++;
        if ( pointer == v.size() ) v.push_back( 0 );
    }
    inline void dec_p() { pointer --; }
    inline void inc_b() { v[pointer] ++; }
    inline void dec_b() { v[pointer] --; }
    inline void print_b() { output += v[pointer]; }
    inline void read_b() { cin >> v[pointer]; }

    char* end_of_loop( char* s, int cnt = 1 ) {
        if ( cnt == 0 ) return s;
        if ( (*s) == '[' ) return end_of_loop( s + 1, cnt + 1 );
        if ( (*s) == ']' ) return end_of_loop( s + 1, cnt - 1 );
        return end_of_loop( s + 1, cnt );
    }
    void execution( char* s ) {
        op ++;
        if ( op > MAX_OP ) {
            output = "TLE";
            exit( 0 );
        }
        char ch = (*s);
        if ( ch == '\0' || ch == ']' ) return;
        switch ( ch ) {
        case '>':
            inc_p();
            break;
        case '<':
            dec_p();
            break;
        case '+':
            inc_b();
            break;
        case '-':
            dec_b();
            break;
        case '.':
            print_b();
            break;
        case ',':
            read_b();
            break;
        case '[':
            while ( v[pointer] != 0 ) {
                execution( s + 1 );
            }
            s = end_of_loop( s + 1 ) - 1;
            break;

        }
        execution( s + 1 );
    }
    inline void run_and_print_output( char* s ) {
        execution( s );
        cout << output;
    }
};

int main() {
    interpretor brainfuck;
    char s[] = "[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]++++++++++++++++++++++++++++++++++++++++++++.[-]++++++++++++++++++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.[-]+++++++++++++++++++++++++++++++++.";
    brainfuck.run_and_print_output( s );
    return 0;
}
