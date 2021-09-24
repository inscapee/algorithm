const shark = (input) => {
  const arr = input.split('\n').slice(1);
  const SHARK = '9';
  const newArr = [];
  const position = [0, 0];
  let min = 2;
  let count = 0;

  for (let [i, a] of [...arr].entries()) {
    newArr[i] = a.split(' ');
    if (a.indexOf(SHARK) > -1) {
      position[1] = i;
    }
  }

  position[0] = newArr[position[1]].indexOf(SHARK);

  console.log(newArr, position);
};

shark(`4
4 3 2 1
0 0 0 0
0 0 9 0
1 2 3 4`);
