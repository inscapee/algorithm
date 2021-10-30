const input = require('fs').readFileSync('/dev/stdin').toString().trim();

// const input = `13
// 0
// 1
// 2
// 0
// 0
// 3
// 2
// 1
// 0
// 0
// 0
// 0
// 0`;

const [n, ...arr] = input.split('\n').map((s) => parseInt(s));

class MaxHeap {
  queue = [];

  insert(n) {
    this.queue.push(n);
    let ci = this.queue.length - 1;
    let pi = parseInt((ci - 1) / 2);

    while (this.queue[pi] < this.queue[ci]) {
      this.swap(pi, ci);
      ci = pi;
      pi = parseInt((ci - 1) / 2);
    }
  }

  pop() {
    if (this.queue.length < 2) return this.queue.pop() || 0;

    const result = this.queue[0];

    this.queue[0] = this.queue.pop();

    let pi = 0;
    let ci = pi * 2 + 1;
    if (this.queue[ci + 1] && this.queue[ci] < this.queue[ci + 1]) ci++;

    while (this.queue[ci] && this.queue[pi] < this.queue[ci]) {
      this.swap(pi, ci);
      pi = ci;
      ci = pi * 2 + 1;
      if (this.queue[ci + 1] && this.queue[ci] < this.queue[ci + 1]) ci++;
    }

    return result;
  }

  swap(i, j) {
    [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
  }
}

function solution(n, arr) {
  const answer = [];
  const maxHeap = new MaxHeap();

  for (const x of arr) {
    if (x === 0) {
      answer.push(maxHeap.pop());
    } else {
      maxHeap.insert(x);
    }
  }

  console.log(answer.join('\n'));
}

solution(n, arr);
