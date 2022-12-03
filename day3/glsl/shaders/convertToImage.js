let input = require("fs")
  .readFileSync(process.argv[2], "utf-8")
  .split("\n")
  .filter((line) => line);

let sorted = Array.from(input);
sorted = sorted.sort((a, b) => b.length - a.length);

const width = sorted[0].length;
const height = input.length;

console.log(width, height);

let pixels = input.map((row) => {
  return Array.from({ ...row.split(""), length: width }, (v) =>
    v ? v.charCodeAt(0) : 0
  );
});

require("fs").writeFileSync("out.dat", new Uint32Array(pixels.flat()));
