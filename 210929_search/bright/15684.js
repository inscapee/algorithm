const input = require('fs').readFileSync('/dev/stdin').toString();

const [[n, h, m], ...rows] = input
  .split('\n')
  .map((row) => row.split(' ').map((s) => (s === '' ? 0 : parseInt(s))));

const MIN = 4;

function solution(n, h, m, rows) {
  let min = MIN;
  const board = Array.from({ length: m + 1 }, () => {
    return Array.from({ length: n + 1 }, () => 0);
  });

  for (const [a, b] of rows) {
    board[a][b] = 1;
  }

  function check(board) {
    for (let i = 1; i < n; i++) {
      let p = i;
      for (let j = 1; j <= m; j++) {
        if (board[j][p] === 1) p++;
        else if (board[j][p - 1] === 1) p--;
      }
      if (p !== i) return false;
    }
    return true;
  }

  if (check(board)) return 0;

  const empty = [];

  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= m; j++) {
      if (board[j][i - 1] + board[j][i] + board[j][i + 1] === 0)
        empty.push([j, i]);
    }
  }

  function dfs(s, m) {
    for (let i = s; i < empty.length && min > m; i++) {
      const [r, c] = empty[i];
      if (board[r][c - 1] === 1 || board[r][c + 1] === 1) continue;
      board[r][c] = 1;

      if (check(board)) min = m;

      if (m + 1 < min) dfs(i + 1, m + 1);

      board[r][c] = 0;
    }
  }

  dfs(0, 1);

  return min === MIN ? -1 : min;
}

console.log(solution(n, h, m, rows));
