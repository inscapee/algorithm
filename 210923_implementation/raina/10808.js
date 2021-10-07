const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const count = new Map([
  ['a', 0],
  ['b', 0],
  ['c', 0],
  ['d', 0],
  ['e', 0],
  ['f', 0],
  ['g', 0],
  ['h', 0],
  ['i', 0],
  ['j', 0],
  ['k', 0],
  ['l', 0],
  ['m', 0],
  ['n', 0],
  ['o', 0],
  ['p', 0],
  ['q', 0],
  ['r', 0],
  ['s', 0],
  ['t', 0],
  ['u', 0],
  ['v', 0],
  ['w', 0],
  ['x', 0],
  ['y', 0],
  ['z', 0],
]);

rl.on('line', function (line) {
  for (let i = 0; i < line.length; i++) {
    count.set(line.charAt(i), count.get(line.charAt(i)) + 1);
  }
  const output = [];
  for (const [, value] of count) {
    output.push(value);
  }
  console.log(output.join(' '));
  rl.close();
}).on('close', function () {
  process.exit();
});