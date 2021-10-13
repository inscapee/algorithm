const [map, position] = input.split('\n');
const [r, c, er, ec] = position.split(' ').map((n) => parseInt(n));

// (r-2, c-1), (r-2, c+1), (r, c-2), (r, c+2), (r+2, c-1), (r+2, c+1)
const dr = [-2, -2, 0, 0, 2, 2];
const dc = [-1, 1, -2, 2, -1, 1];

let visit = Array.from({ length: map }, () =>
  Array.from({ length: map }, () => 0)
);

let count = 0;

function solution(map, r, c, er, ec) {
  const queue = [];
  visit[r][c] = 1;
  queue.push([r, c, count]);

  function bfs() {
    while (queue.length) {
      const [r, c, count] = queue.shift();

      for (let i = 0; i < 6; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (nr >= 0 && nr < map && nc >= 0 && nc < map && visit[nr][nc] === 0) {
          visit[nr][nc] = 1;
          if (nr === er && nc === ec) {
            console.log(count + 1);
            return;
          }
          queue.push([nr, nc, count + 1]);
        }
      }
    }
    console.log(-1);
    return;
  }

  bfs();

  return;
}

solution(parseInt(map), r, c, er, ec);
