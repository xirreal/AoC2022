import getInput from "../fetchInput.mjs";

const input = await getInput(1);

const elves = [0];
let elfIdx = 0;
for (let line of input.split("\n")) {
  !line ? elfIdx++ : (elves[elfIdx] = (elves[elfIdx] ?? 0) + Number(line));
}
console.log(
  elves
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b)
);
