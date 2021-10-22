function solution(input) {
  const arr = Array.from({ length: input }, () => 0);
  if (input === 0) {
    return console.log(0);
  }

  function dp(x) {
    if (x === 1) return (arr[x] = 1);
    if (x === 2) return (arr[x] = 1), (arr[x - 1] = 1);
    if (arr[x - 1] !== 0) return arr[x];
    return (arr[x] = dp(x - 1) + dp(x - 2));
  }

  dp(input);
  console.log(arr[input]);
  console.log(arr);
}

solution(parseInt(input));
