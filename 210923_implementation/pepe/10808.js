const input = require('fs').readFileSync('/dev/stdin').toString().split('');

const arr = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];
const result = [];

for (let a of arr) {
  result.push([...input].filter((b) => b === a).length);
}

console.log(result.join(' '));