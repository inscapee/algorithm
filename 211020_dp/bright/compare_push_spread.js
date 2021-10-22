function measureExcutionTime(callback, repeat = 100, label = 'random') {
  console.time(label);

  callback(repeat);

  console.timeEnd(label);
}

function usingPush(repeat = 100, arr = []) {
  for (let i = 0; i < repeat; i++) {
    arr.push(i);
  }
}

function usingSpread(repeat = 100, arr = []) {
  for (let i = 0; i < repeat; i++) {
    arr = [...arr, i];
  }
}

console.time('ready');
console.timeEnd('ready');
for (let i = 1; i < 10001; i *= 10) {
  const repeat = i * 10;
  console.log(`\nrepeat : ${repeat}`);
  measureExcutionTime(usingPush, repeat, 'push');
  measureExcutionTime(usingSpread, repeat, 'spread');
}
