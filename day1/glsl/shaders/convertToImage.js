let input = require("fs")
  .readFileSync(process.argv[2], "utf-8")
  .split("\n\n")
  .map((x) => x.split("\n"));

let sorted = Array.from(input);
sorted = sorted.sort((a, b) => b.length - a.length);

let width = sorted[0].length;
let height = input.length;

console.log(width, height);

let pixels = input.map((row) => {
  return Array.from({ ...row, length: width }, (v) => (v ? Number(v) : 0));
});

require("fs").writeFileSync("out.dat", new Uint32Array(pixels.flat()));
