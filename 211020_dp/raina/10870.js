const input = require('fs').readFileSync('/dev/stdin').toString();

console.log(fibonacci(input));

function fibonacci(num) {
    if(num < 2) return num;
    return fibonacci(num-1) + fibonacci(num-2);
}