import getInput from "../fetchInput.mjs";

const input = await getInput(5);

const parsed = input.split("\n\n");

const graph = parsed[0].split("\n").slice(0, -1);
const moves = parsed[1].split("\n");

const graphArrayp1 = [];
const graphArrayp2 = [];

for (let i = graph.length - 1; i >= 0; i--) {
  let line = graph[i].split("");

  for (
    let position = 1, graphIndex = 0;
    position < line.length;
    position += 4, graphIndex++
  ) {
    if (!graphArrayp1[graphIndex]) {
      graphArrayp1[graphIndex] = [];
      graphArrayp2[graphIndex] = [];
    }

    if (line[position] !== " ") {
      graphArrayp1[graphIndex].push(line[position]);
      graphArrayp2[graphIndex].push(line[position]);
    }
  }
}

// Part 1, move one box at a time
for (let move of moves) {
  let line = move.split(" ");

  let howMany = line[1];
  let from = line[3];
  let to = line[5];

  for (let i = 0; i < howMany; i++) {
    let crate = graphArrayp1[from - 1].pop();
    graphArrayp1[to - 1].push(crate);
  }
}

let part1 = "";
for (let line of graphArrayp1) {
  part1 += line.slice(-1);
}

console.log(part1);

// Part 2, move multiple boxes at once
for (let move of moves) {
  let line = move.split(" ");

  let howMany = line[1];
  let from = line[3];
  let to = line[5];

  let crates = [];
  // Pop n crates from a stack
  for (let i = 0; i < howMany; i++) {
    crates.push(graphArrayp2[from - 1].pop());
  }
  // Push them in reverse order
  for (let crate of crates.reverse()) {
    graphArrayp2[to - 1].push(crate);
  }
}

let part2 = "";
for (let line of graphArrayp2) {
  part2 += line.slice(-1);
}

console.log(part2);
