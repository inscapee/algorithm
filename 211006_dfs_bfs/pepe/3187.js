/* 양치기 꿍 */

// const input = `9 12
// .###.#####..
// #.kk#...#v#.
// #..k#.#.#.#.
// #..##k#...#.
// #.#v#k###.#.
// #..#v#....#.
// #...v#v####.
// .####.#vv.k#
// .......####.`;

const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

const [size, ...arr] = input;
const [h, w] = size.split(' ');

const wolf = 'v';
const sheep = 'k';
const wall = '#';

let wolfCount = 0;
let sheepCount = 0;
let wolfResult = 0;
let sheepResult = 0;

const arrY = [1, -1, 0, 0];
const arrX = [0, 0, 1, -1];

const visited = Array.from(Array(Number(w)), () => Array(Number(h)).fill(0));

const newArr = [];

for (const [i, a] of arr.entries()) {
  newArr[i] = a.split('');
}

const dfs = ({ i, j }) => {
  if (newArr[i][j] === wolf) wolfCount++;
  if (newArr[i][j] === sheep) sheepCount++;
  visited[i][j] = 1;
  for (let k = 0; k < 4; k++) {
    const moveY = i + arrY[k];
    const moveX = j + arrX[k];
    if (moveY < 0 || moveX < 0 || moveY >= h || moveX >= w || visited[moveY][moveX] || newArr[moveY][moveX] === wall) continue;

    dfs({ i: moveY, j: moveX });
  }
};

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    if (newArr[i][j] === wolf) wolfResult++;
    else if (newArr[i][j] === sheep) sheepResult++;

    wolfCount = 0;
    sheepCount = 0;

    if (!visited[i][j]) {
      dfs({ i, j });

      if (sheepCount > wolfCount) {
        wolfResult -= wolfCount;
      } else {
        sheepResult -= sheepCount;
      }
    }
  }
}

console.log(sheepResult, wolfResult);
