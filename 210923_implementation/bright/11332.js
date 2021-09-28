const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `5
// O(N) 1000 10 10
// O(2^N) 1000 10 10
// O(N!) 10 10 10
// O(N^3) 1000 1 10
// O(N^3) 1001 1 10`

const unit = 100_000_000;

/**
 * 시간 복잡도 : O(1)
 * 공간 복잡도 : O(1) 
 */
function solution(input) {
  const [n, ...tests] = input.split('\n');

  for (let i = 0; i < n; i++) {
    const [s, n, t, l] = tests[i].split(' ');
    if (check(s, n, t, l)) {
      console.log('May Pass.');
    } else {
      console.log('TLE!');
    }
  }

  function check(s, n, t, l) {
    const base = l * unit / t
    switch (s) {
      case 'O(N)': {
        return n <= base;
      }
      case 'O(N^2)': {
        return n ** 2 <= base;
      }
      case 'O(N^3)': {
        return n ** 3 <= base;
      }
      case 'O(2^N)': {
        return n <= Math.log2(base);
      }
      case 'O(N!)': {
        let v = 1;
        for (let i = 1; i <= n; i++) {
          v *= i;
          if (v > base) return false;
        }
        return v <= base;
      }
    }
  }
}

solution(input);