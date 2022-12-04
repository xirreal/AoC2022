import getInput from "../fetchInput.mjs";

const input = await getInput(4);

let completelyOverlappingRanges = 0;
let overlappingRanges = 0;

for (let line of input.trim().split("\n")) {
  const [group1, group2] = line.split(",");

  let [min1, max1] = group1.split("-").map(Number);
  let [min2, max2] = group2.split("-").map(Number);

  if (min1 >= min2 && max1 <= max2) {
    completelyOverlappingRanges++;
  } else if (min2 >= min1 && max2 <= max1) {
    completelyOverlappingRanges++;
  }

  if (min1 <= max2 && min2 <= max1) {
    overlappingRanges++;
  }
}

console.log(completelyOverlappingRanges, overlappingRanges);
