const input = require('fs').readFileSync('/dev/stdin').toString().split('\n');

const [n, ...arr] = input;

const map = arr.map((row) => row.split('').map((s) => parseInt(s)));

const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function solution(n, map) {
  const visit = Array.from({ length: n }, () => {
    return Array.from({ length: n }, () => 1000);
  });

  function bfs() {
    const queue = [];
    visit[0][0] = 0;
    queue.push([0, 0, 0]);

    while (queue.length) {
      const [r, c, d] = queue.shift();
      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && visit[nr][nc] > d) {
          const nd = map[nr][nc] === 0 ? d + 1 : d;
          visit[nr][nc] = nd;
          queue.push([nr, nc, nd]);
        }
      }
    }

    return visit[n - 1][n - 1];
  }

  console.log(bfs());
}

solution(n, map);
