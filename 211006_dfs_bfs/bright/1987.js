// const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `2 4
// CAAB
// ADCB`;

// const input = `3 6
// HFDFFB
// AJHGDH
// DGAGEH`;

const input = `5 5
IEFCJ
FHFKC
FFALF
HFGCF
HMCHH`;

const [size, ...board] = input.split('\n');
const [r, c] = size.split(' ').map((n) => parseInt(n));

const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function solution(R, C, board) {
  let max = 0;

  const visit = {};

  function dfs(r, c, count) {
    if (count > max) max = count;

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr >= 0 && nr < R && nc >= 0 && nc < C && !visit[board[nr][nc]]) {
        visit[board[nr][nc]] = true;
        dfs(nr, nc, count + 1);
        visit[board[nr][nc]] = false;
      }
    }
  }

  visit[board[0][0]] = true;
  dfs(0, 0, 1);

  console.log(max);
}

solution(r, c, board);
