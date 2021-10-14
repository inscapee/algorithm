/* 피보나치 */

// const input = 17;
const input = require('fs').readFileSync('/dev/stdin').toString().trim();

const fibonacci = index => {
  let i = 2;
  let prev = 0;
  let current = 1;
  let result = [prev, current];
  while (i <= index) {
    result = [...result, prev + current];
    prev = current;
    current = result[i];
    i++;
  }

  console.log(result[index]);
};

fibonacci(input);