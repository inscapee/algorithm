const input = `2 4
CAAB
ADCB`;

const [size, ...map] = input.split("\n");
const [h, w] = size.split(" ");

let arr = [];
for (let i = 0; i < h; i++) {
  arr[i] = map[i].split("");
}

// 왼쪽, 위, 오른쪽, 아래
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

// 시작 위치
const r = 0;
const c = 0;

const visit = Array.from({ length: h }, () =>
  Array.from({ length: w }, () => 0)
);

// 가장 높은 숫자
let result = 1;
// 현재 카운팅 값
let count = 1;

// 지나온 알파벳 체크
let visitedAlphabet = {};

function solution(h, w, arr) {
  function dfs(r, c, count) {
    for (let i = 0; i < 4; i++) {
      const nr = r + dx[i];
      const nc = c + dy[i];

      if (
        nr >= 0 &&
        nc >= 0 &&
        nr < h &&
        nc < w &&
        !visitedAlphabet[arr[nr][nc]] &&
        visit[nr][nc] === 0
      ) {
        visitedAlphabet[arr[nr][nc]] = true;
        visit[nr][nc] = 1;
        count++;

        if (count > result) {
          result = count;
        }

        dfs(nr, nc, count);

        count--;
        visit[nr][nc] = 0;
        visitedAlphabet[arr[nr][nc]] = false;
      }
    }
  }

  visitedAlphabet[arr[0][0]] = true;
  visit[0][0] = 1;
  dfs(0, 0, count);

  console.log(result);
}

solution(h, w, arr);