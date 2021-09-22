const input = require('fs').readFileSync('/dev/stdin').toString();
const result = Array.from({length: 26}, () => 0);

for(let i; i = input.length; i++) {
    const index = input[i].charCodeAt() - 97;
    result[index]++;
}

console.log(result.join(' '));

// 런타임 에러 (TypeError) <- 발생