let input = require("fs")
  .readFileSync(process.argv[2], "utf-8")
  .split("")
  .filter((x) => x)
  .map((x) => x.charCodeAt(0));

const width = input.length;
const height = 1;

console.log(width, height);

require("fs").writeFileSync("out.dat", new Uint32Array(input.flat()));
