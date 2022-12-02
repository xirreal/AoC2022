let input = require("fs")
  .readFileSync(process.argv[2], "utf-8")
  .split("\n")
  .filter((line) => line)
  .map((line) => line.split(" "));

let width = input[0].length;
let height = input.length;

console.log(width, height);

const enumVal = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

console.log(input.flat().map((x) => enumVal[x]));

require("fs").writeFileSync(
  "out.dat",
  new Uint32Array(input.flat().map((x) => enumVal[x]))
);
