import fs from 'fs';
const coffeefuck = require('coffeefuck');

const increment = (value: number) => '+'.repeat(value);

const printLetter = (letter: string) => `[-]${increment(letter.charCodeAt(0))}.`;

const printString = (string: string) => string.split('').map(printLetter).join('\n');

const brainfuckCode = printString('Hello, World!');

fs.writeFileSync('code.bf', brainfuckCode);

const {
  output,     // Array of the bytes extracted with "."
  memory,     // Array of the memory
  timeout,    // True if the time exceeded the timeout
  time,       // The time that it took (will be similar to the timeout if set)
} = coffeefuck(brainfuckCode);


console.log(output.map((byte: number) => String.fromCharCode(byte)).join(''));