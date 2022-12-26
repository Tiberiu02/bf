import fs from 'fs';
const coffeefuck = require('coffeefuck');

const vars = new Map<string, number>();
function varPos(varName: string): number {
  if (!vars.has(varName)) {
    vars.set(varName, vars.size * 2);
  }
  return vars.get(varName) || 0;
}

let currentPos = 0;

function useVar(name: string, op: () => string[]) {
  let oldPos = currentPos;
  currentPos = varPos(name);

  let code = '';
  if (oldPos > currentPos) {
    return `${'<'.repeat(oldPos - currentPos)}${op().join('')}`;
  } else {
    return `${'>'.repeat(currentPos - oldPos)}${op().join('')}`;
  }
}

function preservePos(code: () => string) {
  let oldPos = currentPos;
  let result = code();
  const diff = currentPos - oldPos;
  currentPos = oldPos;
  return result + (diff > 0 ? '<'.repeat(diff) : '>'.repeat(-diff));
}

const increment = (value: number) => '+'.repeat(value);

const printLetter = (letter: string) => `[-]${increment(letter.charCodeAt(0))}.`;

const printString = (string: string) => string.split('').map(printLetter).join('\n');

type Var = ReturnType<typeof Var>;
function Var(name: string) {
  return {
    print: () => useVar(name, () => ['.']),
    read: () => useVar(name, () => [',']),
    set: (value: number) => useVar(name, () => ['[-]', increment(value)]),
    increment: (value: number) => useVar(name, () => [increment(value)]),
    decrement: (value: number) => useVar(name, () => ['-'.repeat(value)]),
    ifGreaterThan: (val: number, code: () => string[]) => useVar(name, () => [ifGreaterThan(val, code)]),
  };
}

const ifGreaterThan = (val: number, code: () => string[]) => preservePos(() => `
  ${'[-'.repeat(val)}
  [
    ${'+'.repeat(val)}
    ${code().join('')}
    ${'-'.repeat(val)}
  >]<
  ${'+>]<'.repeat(val)}
`);

const ZERO = '0'.charCodeAt(0);

let a = Array(10).fill(0).map((_, i) => Var(`a${i}`));
let b = Array(10).fill(0).map((_, i) => Var(`a${i}`));

function readNum(vec: Var[]): string[] {
  if (vec.length === 0) return [];

  return [
    vec[0].read(),
    vec[0].decrement(ZERO - 1),
    vec[0].ifGreaterThan(0, () => readNum(vec.slice(1)))
  ]
}

function printNum(vec: Var[]): string[] {
  if (vec.length === 0) return [];

  return [
    vec[0].increment(ZERO - 1),
    vec[0].print(),
    vec[0].ifGreaterThan(ZERO + 2, () => printNum(vec.slice(1)))
  ]
}

let brainfuckCode = [
  ...readNum(a),
  a[0].increment(ZERO - 1),
  a[0].print(),
  a[1].increment(ZERO - 1),
  a[1].print()
].join('');

fs.writeFileSync('code.bf', brainfuckCode);

const { brainfuck } = require("js-brainfuck");

const brainfuckOptions = {
    input: "123 123", // Input. The , operator reads a single character from this every time it's called
    // invalidCommandError: true // Whether or not to throw an error when an invalid command/operator is reached. (Default: false)
};
brainfuck(brainfuckCode, brainfuckOptions).then((output: string) => {
    console.log(output); // Logs the output. In this case, the output will be "@"
});

// const {
//   output,     // Array of the bytes extracted with "."
//   memory,     // Array of the memory
//   timeout,    // True if the time exceeded the timeout
//   time,       // The time that it took (will be similar to the timeout if set)
// } = coffeefuck(brainfuckCode, { inputs: [10] });//'5'.split('').map((c) => c.charCodeAt(0)) });


// console.log(output);//.map((byte: number) => String.fromCharCode(byte)).join(''));