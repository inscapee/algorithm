// const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `7
// 6 6 0 1`;

// const input = `6
// 5 1 0 5`;

// const input = `7
// 0 3 4 3`;

const [size, positions] = input.split('\n');

const dr = [-2, -2, 0, 0, 2, 2];
const dc = [-1, 1, -2, 2, -1, 1];

function solution(size, [r1, c1, r2, c2]) {
  const visit = Array.from({ length: size }, () => {
    return Array.from({ length: size }, () => false);
  });

  function bfs() {
    const queue = [];
    visit[r1][c1] = true;
    queue.push([r1, c1, 0]);

    while (queue.length) {
      const [r, c, count] = queue.shift();
      for (let i = 0; i < 6; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (nr >= 0 && nr < size && nc >= 0 && nc < size && !visit[nr][nc]) {
          if (nr === r2 && nc === c2) return count + 1;
          visit[nr][nc] = true;
          queue.push([nr, nc, count + 1]);
        }
      }
    }

    return -1;
  }

  console.log(bfs());
}

solution(
  parseInt(size),
  positions.split(' ').map((s) => parseInt(s))
);
