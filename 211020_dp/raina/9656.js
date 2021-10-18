//const input = require('fs').readFileSync('/dev/stdin').toString();

const input = 51;

console.log(solution(input));

function solution(num){
  if(num % 2 === 0) return 'SK';
  else return 'CY';
}
