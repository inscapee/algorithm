// const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `5 1 5
// 1 2 1
// 2 3 2
// 3 4 3
// 4 5 4`;

// const input = `9 1 9
// 1 2 8
// 2 3 6
// 2 4 5
// 2 5 10
// 9 5 6
// 6 5 14
// 6 7 7
// 8 6 7`;

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

function solution(input) {
  const [info, ...others] = input;
  const [n, v1, v2] = info.split(' ').map((s) => parseInt(s));

  if (v1 === v2) return 0;

  const trunks = others
    .slice(0, n - 1)
    .map((row) => row.split(' ').map((s) => parseInt(s)));

  const visit = Array.from({ length: n + 1 }, () => false);
  const nodes = Array.from({ length: n + 1 }, () => []);

  trunks.forEach(([v1, v2, length]) => {
    nodes[v1].push([v2, length]);
    nodes[v2].push([v1, length]);
  });

  const queue = [];
  visit[v1] = true;
  queue.push([v1, 0, 0]);

  while (queue.length) {
    const [v, sum, max] = queue.shift();

    for (const [nv, length] of nodes[v]) {
      const total = sum + length;
      if (nv === v2) return total - Math.max(max, length);
      if (!visit[nv]) {
        visit[nv] = true;
        queue.push([nv, total, Math.max(max, length)]);
      }
    }
  }
}

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  console.log(solution(input));
});
