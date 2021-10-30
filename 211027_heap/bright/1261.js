const input = require('fs').readFileSync('/dev/stdin').toString().trim();

// const input = `3 3
// 011
// 111
// 110`;

// const input = `4 2
// 0001
// 1000`;

// const input = `6 6
// 001111
// 010000
// 001111
// 110001
// 011010
// 100010`;

const [pos, ...board] = input.split('\n');
const [m, n] = pos.split(' ').map((s) => parseInt(s));

class PriorityQueue {
  queue = [];

  insert({ r, c, count }) {
    this.queue.push({ r, c, count });
    let ci = this.queue.length - 1;
    let pi = parseInt((ci - 1) / 2);

    while (this.queue[pi].count > this.queue[ci].count) {
      this.swap(pi, ci);
      ci = pi;
      pi = parseInt((ci - 1) / 2);
    }
  }

  pop() {
    if (this.queue.length < 2) return this.queue.pop();

    const result = this.queue[0];

    this.queue[0] = this.queue.pop();

    let pi = 0;
    let ci = pi * 2 + 1;
    if (
      ci + 1 < this.queue.length &&
      this.queue[ci].count > this.queue[ci + 1].count
    ) {
      ci++;
    }

    while (this.queue[ci] && this.queue[pi].count > this.queue[ci].count) {
      this.swap(pi, ci);
      pi = ci;
      ci = pi * 2 + 1;
      if (
        ci + 1 < this.queue.length &&
        this.queue[ci].count > this.queue[ci + 1].count
      ) {
        ci++;
      }
    }

    return result;
  }

  swap(i, j) {
    [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const dr = [1, 0, -1, 0];
const dc = [0, 1, 0, -1];

function solution(m, n, board) {
  if (m === 1 && n === 1) return console.log(0);

  const pq = new PriorityQueue();
  const visit = Array.from({ length: n }, () => {
    return Array.from({ length: m }, () => Number.MAX_SAFE_INTEGER);
  });

  visit[0][0] = 0;
  pq.insert({ r: 0, c: 0, count: 0 });

  while (!pq.isEmpty()) {
    const { r, c, count } = pq.pop();

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
        const nCount = board[nr][nc] === '1' ? count + 1 : count;
        if (nr === n - 1 && nc === m - 1) return console.log(nCount);
        if (visit[nr][nc] > nCount) {
          visit[nr][nc] = nCount;
          pq.insert({ r: nr, c: nc, count: nCount });
        }
      }
    }
  }
}

solution(m, n, board);
