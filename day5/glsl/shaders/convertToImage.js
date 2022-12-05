let input = require("fs")
  .readFileSync(process.argv[2], "utf-8")
  .split("\n\n")
  .map((line) => line.split("\n"));

const widthState = 9;
const heightState = input[0].length - 1;

const initialState = [];
for (let i = 1; i < input[0][0].split("").length; i += 4) {
  let column = [];
  for (let j = 0; j < heightState; j++) {
    column.push(input[0][j][i] == " " ? 0 : input[0][j][i].charCodeAt(0));
  }
  initialState.push(column.reverse());
}

console.log(widthState, heightState);

require("fs").writeFileSync("out1.dat", new Uint32Array(initialState.flat()));

const moves = [];
for (let move of input[1].filter((x) => x)) {
  let line = move.split(" ");

  let howMany = line[1];
  let from = line[3];
  let to = line[5];

  moves.push([howMany, from, to]);
}

console.log(3, moves.length);

require("fs").writeFileSync("out2.dat", new Uint32Array(moves.flat()));
