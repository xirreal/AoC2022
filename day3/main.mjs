import getInput from "../fetchInput.mjs";

const input = await getInput(3);

const priorities = [];
const badges = [];

let lines = input.split("\n");

for (let line of lines) {
  const partition1 = line.slice(0, line.length / 2).split("");
  const partition2 = line.slice(line.length / 2).split("");

  for (const item of partition1) {
    if (partition2.includes(item)) {
      priorities.push(
        item.charCodeAt(0) - (item.charCodeAt(0) > 96 ? 96 : 64 - 26)
      );
      break;
    }
  }
}

for (let i = 0; i < lines.length - 1; i += 3) {
  const rucksack1 = lines[i].split("");
  const rucksack2 = lines[i + 1].split("");
  const rucksack3 = lines[i + 2].split("");

  for (const item of rucksack1) {
    if (rucksack2.includes(item)) {
      if (rucksack3.includes(item)) {
        badges.push(
          item.charCodeAt(0) - (item.charCodeAt(0) > 96 ? 96 : 64 - 26)
        );
        break;
      }
    }
  }
}

console.log(priorities.reduce((a, b) => a + b, 0));
console.log(badges.reduce((a, b) => a + b, 0));
