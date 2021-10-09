const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `6 6
// ...#..
// .##v#.
// #v.#.#
// #.k#.#
// .###.#
// ...###`;

// const input = `8 8
// .######.
// #..k...#
// #.####.#
// #.#v.#.#
// #.#.k#k#
// #k.##..#
// #.v..v.#
// .######.`;

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

const [size, ...others] = input.split('\n');

const [r, c] = size.split(' ').map((n) => parseInt(n));
const board = others.slice(0, r).map((row) => row.split(''));

const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

function solution(r, c, board) {
  const count = [0, 0]; // 양, 늑대

  const visit = Array.from({ length: r }, (_, i) => {
    return Array.from({ length: c }, (_, j) => board[i][j] === '#');
  });

  function bfs(sr, sc) {
    let wolfCount = 0;
    let sheepCount = 0;

    const queue = [];

    visit[sr][sc] = true;
    queue.push([sr, sc]);

    while (queue.length > 0) {
      const [r, c] = queue.shift();
      if (board[r][c] === 'v') wolfCount++;
      else if (board[r][c] === 'k') sheepCount++;

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (
          nr >= 0 &&
          nr < board.length &&
          nc >= 0 &&
          nc < board[0].length &&
          !visit[nr][nc]
        ) {
          visit[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }

    if (sheepCount > wolfCount) count[0] += sheepCount;
    else count[1] += wolfCount;
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (!visit[i][j]) {
        bfs(i, j);
      }
    }
  }

  console.log(count.join(' '));
}

solution(r, c, board);
