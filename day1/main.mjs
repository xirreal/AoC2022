import getInput from "../fetchInput.mjs";

const input = await getInput(1);

const elves = [0];
let elfIdx = 0;

for (let line of input.split("\n")) {
  if (!line) {
    elfIdx++;
    elves[elfIdx] = 0;
  } else {
    elves[elfIdx] += parseInt(line);
  }
}

let sorted = elves.sort((a, b) => b - a);
console.log(sorted[0]);
console.log(sorted[0] + sorted[1] + sorted[2]);
