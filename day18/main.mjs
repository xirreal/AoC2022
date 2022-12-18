import getInput from "../fetchInput.mjs";

const input = await getInput(18);

const lines = input
  .trim()
  .split("\n")
  .map((x) => x.split(",").map((x) => Number(x)));

const grid = new Set();

for (const [x, y, z] of lines) {
  grid.add(`${x},${y},${z}`);
}

const directions = [
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
];

let count = 0;

for (let tile of grid.values()) {
  let exposedSides = 6;
  const [x, y, z] = tile.split(",").map((x) => Number(x));
  for (const [dx, dy, dz] of directions) {
    if (grid.has(`${x + dx},${y + dy},${z + dz}`)) {
      exposedSides--;
    }
  }
  count += exposedSides;
}

console.log(count);

const min = [Infinity, Infinity, Infinity];
const max = [0, 0, 0];

for (let tile of grid.values()) {
  const [x, y, z] = tile.split(",").map((x) => Number(x));
  min[0] = Math.min(min[0], x);
  min[1] = Math.min(min[1], y);
  min[2] = Math.min(min[2], z);
  max[0] = Math.max(max[0], x);
  max[1] = Math.max(max[1], y);
  max[2] = Math.max(max[2], z);
}

const queue = [[0, 0, 0]];
const visited = new Set();

const outermost = {};
for (let d of directions) {
  outermost[d] = new Set();
}

while (queue.length) {
  const [x, y, z] = queue.shift();
  if (visited.has(`${x},${y},${z}`)) {
    continue;
  }

  if (x < min[0] - 2 || y < min[1] - 2 || z < min[2] - 2) {
    continue;
  }
  if (x >= max[0] + 2 || y >= max[1] + 2 || z >= max[2] + 2) {
    continue;
  }

  visited.add(`${x},${y},${z}`);
  for (const [dx, dy, dz] of directions) {
    if (!grid.has(`${x + dx},${y + dy},${z + dz}`)) {
      queue.push([x + dx, y + dy, z + dz]);
    } else {
      outermost[[dx, dy, dz]].add(`${x + dx},${y + dy},${z + dz}`);
    }
  }
}

console.log(Object.values(outermost).reduce((a, b) => a + b.size, 0));
