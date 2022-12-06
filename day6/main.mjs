import getInput from "../fetchInput.mjs";

const input = await getInput(6);

let i = 0;
for (i = 0; i < input.length; i++) {
  if (new Set(input.slice(i, i + 4)).size === 4) {
    break;
  }
}
console.log(i + 4);

for (i = 0; i < input.length; i++) {
  if (new Set(input.slice(i, i + 14)).size === 14) {
    break;
  }
}
console.log(i + 14);
