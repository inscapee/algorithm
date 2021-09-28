const input = require('fs').readFileSync('/dev/stdin').toString();

/**
 * 시간 복잡도 : O(n) n은 input의 길이
 * 공간 복잡도 : O(1)
 */
function solution(input) {
  const answer = Array.from({ length: 26 }, () => 0);
  
  for (let i = 0; i < input.length; i++) {
    const index = input[i].charCodeAt() - 97;
    answer[index]++;
  }

  console.log(answer.join(' '));
}

solution(input);