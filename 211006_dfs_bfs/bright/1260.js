// const input = require('fs').readFileSync('/dev/stdin').toString();

// const input = `4 5 1
// 1 2
// 1 3
// 1 4
// 2 4
// 3 4`;

// const input = `5 5 3
// 5 4
// 5 2
// 1 2
// 3 4
// 3 1`;

// const input = `1000 1 1000
// 999 1000`;

const [size, ...others] = input.split('\n');
const [n, m, s] = size.split(' ').map((n) => parseInt(n));
const trunks = others
  .slice(0, m)
  .map((row) => row.split(' ').map((n) => parseInt(n)));

function solution(n, m, s, trunks) {
  const dfsResults = [];
  const bfsResults = [];

  const nodes = Array.from({ length: n + 1 }, () => []);
  for (const [v1, v2] of trunks) {
    nodes[v1].push(v2);
    nodes[v2].push(v1);
  }

  let visit;

  function dfs(s) {
    dfsResults.push(s);
    nodes[s].sort((a, b) => a - b);
    for (const v of nodes[s]) {
      if (!visit[v]) {
        visit[v] = true;
        dfs(v);
      }
    }
  }

  function bfs(s) {
    const queue = [s];

    while (queue.length) {
      const s = queue.shift();
      bfsResults.push(s);
      nodes[s].sort((a, b) => a - b);
      for (const v of nodes[s]) {
        if (!visit[v]) {
          visit[v] = true;
          queue.push(v);
        }
      }
    }
  }

  visit = Array.from({ length: n + 1 }, () => false);
  visit[s] = true;
  dfs(s);

  visit = Array.from({ length: n + 1 }, () => false);
  visit[s] = true;
  bfs(s);

  console.log(dfsResults.join(' '));
  console.log(bfsResults.join(' '));
}

solution(n, m, s, trunks);
