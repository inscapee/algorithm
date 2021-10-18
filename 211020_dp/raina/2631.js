// const input = require('fs').readFileSync('/dev/stdin').toString();

const input = `7
3
7
5
2
6
1
4`;

const [size, ...children] = input.split('\n');

function solution(){
    let target = Array(children[0]);
    for(let i=1; i<size; i++){
        if(target[target.length-1] > children[i]){
            target[target.length-1] = children[i];
        }else if(target[target.length-1] < children[i]){

        }
    }

}