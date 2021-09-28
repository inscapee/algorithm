const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `3
// 0 0 0
// 0 0 0
// 0 9 0`

// const input = `3
// 0 0 1
// 0 0 0
// 0 9 0`

// const input = `4
// 4 3 2 1
// 0 0 0 0
// 0 0 9 0
// 1 2 3 4`

// const input = `6
// 5 4 3 2 3 4
// 4 3 2 3 4 5
// 3 2 9 5 6 6
// 2 1 2 3 4 5
// 3 2 1 6 5 4
// 6 6 6 6 6 6`

// const input = `6
// 6 0 6 0 6 1
// 0 0 0 0 0 2
// 2 3 4 5 6 6
// 0 0 0 0 0 2
// 0 2 0 0 0 0
// 3 9 3 0 0 1`

// const input = `6
// 1 1 1 1 1 1
// 2 2 6 2 2 3
// 2 2 5 2 2 3
// 2 2 2 4 6 3
// 0 0 0 0 0 6
// 0 0 0 0 0 9`

const dr = [-1, 0, 0, 1];
const dc = [0, -1, 1, 0];

/**
 * 시간복잡도 : O(kn^2), k는 물고기의 수, n은 배열의 크기
 * 공간복잡도 : O(n^2), n은 배열의 크기
 */
function solution(input) {
  const [n, ...arr] = input.split('\n');
  let sharkSize = 2;
  let sizeUpCount = 2;
  let answer = 0;
  let d = 0;
  const pos = [-1, -1]; // row, col
  const map = arr.map((row, r) => row.split(' ').map((str, c) => {
    if (str === '9') {
      pos[0] = r;  
      pos[1] = c;
      return 0;
    }
    return parseInt(str)
  }));

  function eat() {
    let max = Number.MAX_SAFE_INTEGER;
    const visit = Array.from({ length: n }, () => Array.from({ length: n }, () => false))

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (map[r][c] > sharkSize) {
          visit[r][c] = true;
        }
      }
    }
    
    visit[pos[0]][pos[1]] = true;

    let fish = [21, 21, 0];

    const queue = [];
    queue.push([...pos, 0]);

    while (queue.length > 0) {
      const [r, c, d] = queue.shift();

      if (d > max) break;

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visit[nr][nc]) {
          if (map[nr][nc] !== 0 && map[nr][nc] < sharkSize) {
            max = d;
            if (nr < fish[0] || (nr === fish[0] && nc < fish[1])) {
              fish = [nr, nc, d + 1];
            }
          }
          visit[nr][nc] = true;
          queue.push([nr, nc, d + 1]);
        }
      }
    }

    if (fish[2] !== 0) {
      sizeUpCount--;
      if (sizeUpCount === 0) {
        sharkSize++;
        sizeUpCount = sharkSize;
      }
      pos[0] = fish[0];
      pos[1] = fish[1];
      map[pos[0]][pos[1]] = 0;
      
      return fish[2];
    }

    return 0;
  }

  do {
    d = eat();
    answer += d;
  } while(d !== 0);

  console.log(answer);
}

solution(input);