const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = 10;

function solution(n) {
  const arr = [0, 1];

  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  console.log(arr[n]);
}

solution(parseInt(input));
