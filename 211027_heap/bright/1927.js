const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `16
// 3
// 1
// 5
// 4
// 7
// 8
// 2
// 2
// 0
// 0
// 0
// 0
// 0
// 0
// 0
// 0`;

const [n, ...inputs] = input.split('\n');

const arr = inputs.slice(0, parseInt(n)).map((s) => parseInt(s));

class MinHeap {
  queue = [];

  insert(n) {
    this.queue.push(n);
    let ci = this.queue.length - 1;
    let pi = parseInt((ci - 1) / 2);
    while (this.queue[pi] > this.queue[ci]) {
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
    if (this.queue[ci + 1] && this.queue[ci] > this.queue[ci + 1]) ci++;

    while (this.queue[ci] && this.queue[pi] > this.queue[ci]) {
      this.swap(pi, ci);
      pi = ci;
      ci = pi * 2 + 1;
      if (this.queue[ci + 1] && this.queue[ci] > this.queue[ci + 1]) ci++;
    }

    return result;
  }

  swap(i1, i2) {
    [this.queue[i1], this.queue[i2]] = [this.queue[i2], this.queue[i1]];
  }
}

function solution(arr) {
  const answer = [];
  const minHeap = new MinHeap();

  for (const x of arr) {
    if (x === 0) {
      answer.push(minHeap.pop());
    } else {
      minHeap.insert(x);
    }
  }
  console.log(answer.join('\n'));
}

solution(arr);
