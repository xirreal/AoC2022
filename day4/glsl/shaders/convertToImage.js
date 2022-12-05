let input = require("fs")
  .readFileSync(process.argv[2], "utf-8")
  .split("\n")
  .filter((line) => line);

const width = 4;
const height = input.length;

console.log(width, height);

let pixels = input.map((x) =>
  x
    .split(",")
    .map((x) => x.split("-").map(Number))
    .flat()
);

require("fs").writeFileSync("out.dat", new Uint32Array(pixels.flat()));
