const input = require('fs').readFileSync('/dev/stdin').toString();
const result = Array.from({length: 26}, () => 0);

const alphabetNum = (input) => {
    for(let i = 0; i < input.length; i++) {
        const index = input[i].charCodeAt() - 97;
        result[index]++;
    }

    console.log(result.join(' '));
}

alphabetNum(input)