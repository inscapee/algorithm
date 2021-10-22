const input = require('fs').readFileSync('/dev/stdin').toString();

function solution(n) {
  console.log(n % 2 === 0 ? 'SK' : 'CY');
}

solution(parseInt(input));
