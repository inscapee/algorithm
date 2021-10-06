// const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `3 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1`;

// const input = `3 2
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2`;

// const input = `3 5
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 0 3 2`;

// const input = `3 10
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 0 3 2 1 2 3 2 3`;

// const input = `3 10
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 4 5 6 7 8
// 8 7 6 5 4 3 2 1
// 1 2 3 1 2 3 1 2 3 1`;

// const input = `3 10
// 1 0 3 4 5 6 7 0
// 8 0 6 5 4 3 2 1
// 1 2 0 4 5 6 7 0
// 8 7 6 5 4 3 2 1
// 1 2 3 4 0 6 7 0
// 8 7 0 5 4 3 2 1
// 1 2 3 4 5 6 7 0
// 0 7 0 5 4 3 2 1
// 1 2 3 1 2 3 1 2 3 1`;

const rows = input.split('\n');

const [n, q] = rows[0].split(' ').map((s) => parseInt(s));
const board = rows
  .slice(1, 2 ** n + 1)
  .map((row) => row.split(' ').map((s) => parseInt(s)));
const levels = rows[2 ** n + 1].split(' ').map((s) => parseInt(s));

const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function solution(n, q, board, levels) {
  const boardSize = 2 ** n;
  let totalCount = 0;
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      totalCount += board[i][j];
    }
  }
  const temp = Array.from({ length: boardSize }, () => {
    return Array.from({ length: boardSize }, () => 0);
  });

  function rotate(r, c, size) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        temp[j][size - i - 1] = board[r + i][c + j];
      }
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        board[r + i][c + j] = temp[i][j];
      }
    }
  }

  function melt() {
    const meltedList = [];
    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (board[i][j] === 0) continue;
        let count = 0;
        for (let k = 0; k < 4; k++) {
          const nr = i + dr[k];
          const nc = j + dc[k];
          if (
            nr >= 0 &&
            nr < boardSize &&
            nc >= 0 &&
            nc < boardSize &&
            board[nr][nc] > 0
          ) {
            count++;
          }
        }
        if (count < 3) {
          meltedList.push([i, j]);
        }
      }
    }

    for (const [i, j] of meltedList) {
      board[i][j]--;
    }

    return meltedList.length;
  }

  function bfs(i, j) {
    let count = 1;
    const queue = [];
    temp[i][j] = true;
    queue.push([i, j]);

    while (queue.length) {
      const [r, c] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (
          nr >= 0 &&
          nr < boardSize &&
          nc >= 0 &&
          nc < boardSize &&
          board[nr][nc] > 0 &&
          !temp[nr][nc]
        ) {
          temp[nr][nc] = true;
          count++;
          queue.push([nr, nc]);
        }
      }
    }

    return count;
  }

  for (const level of levels) {
    const size = 2 ** level;
    // 회전
    for (let i = 0; i < boardSize; i += size) {
      for (let j = 0; j < boardSize; j += size) {
        rotate(i, j, size);
      }
    }
    // melt
    totalCount -= melt();
  }

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      temp[i][j] = false;
    }
  }

  let max = 0;

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j] > 0 && !temp[i][j]) {
        max = Math.max(max, bfs(i, j));
      }
    }
  }

  console.log(totalCount);
  console.log(max);
}

solution(n, q, board, levels);
