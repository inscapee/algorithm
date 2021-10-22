const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `7
// 3
// 7
// 5
// 2
// 6
// 1
// 4`;

const [n, ...arr] = input.split('\n').map((s) => parseInt(s));

function solution(n, arr) {
  const lis = [0];
  const dp = Array.from({ length: n }, () => 0);
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    const num = arr[i];
    if (num > lis[lis.length - 1]) {
      lis.push(num);
      dp[i] = lis.length + 1;
    } else {
      let d = Math.ceil(lis.length / 2);
      let j = d;
      while (d > 0) {
        if (lis[j] < num) {
          d = Math.ceil(d / 2);
          j += d;
        } else if (lis[j - 1] > num) {
          d = Math.ceil(d / 2);
          j -= d;
        } else {
          dp[i] = j;
          lis[j] = num;
          break;
        }
      }
    }
  }

  console.log(n - lis.length + 1);
}

solution(n, arr);
