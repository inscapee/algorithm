/* 피보나치 */

// const input = 17;
const input = require('fs').readFileSync('/dev/stdin').toString();

const fibonacci = input => {
  let i = 2;
  let prev = 0;
  let current = 1;
  let result = prev + current;
  while (i <= input) {
    result = prev + current;
    prev = current;
    current = result;
    i++;
  }

  console.log(result)
}

fibonacci(input);