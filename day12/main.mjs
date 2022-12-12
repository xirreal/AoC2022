import getInput from "../fetchInput.mjs";

const input = await getInput(12);

const tiles = input
  .trim()
  .split("\n")
  .map((line) => line.split("").map((x) => x.charCodeAt()));

const width = tiles[0].length;
const height = tiles.length;

let startingPositions = [];
let endPosition = [-1, -1];

for (let y = 0; y < tiles.length; y++) {
  for (let x = 0; x < tiles[y].length; x++) {
    if (tiles[y][x] == "S".charCodeAt()) {
      startingPositions.push([x, y, true]);
      tiles[y][x] = "a".charCodeAt() - 1;
    }
    if (tiles[y][x] == "a".charCodeAt()) {
      startingPositions.push([x, y]);
    }
    if (tiles[y][x] == "E".charCodeAt()) {
      endPosition = [x, y];
      tiles[y][x] = "z".charCodeAt() + 1;
    }
  }
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

let shortestDistance = Infinity;

for (let startingPosition of startingPositions) {
  const visited = new Set();
  const toVisit = [[0, startingPosition.slice(0, 2)]];
  const isP1 = startingPosition[2];

  while (toVisit.length != 0) {
    const tile = toVisit.shift();

    const distance = tile[0];
    const [x, y] = tile[1];

    if (visited.has(`${x},${y}`)) continue;
    visited.add(`${x},${y}`);

    if (x == endPosition[0] && y == endPosition[1]) {
      if (isP1) {
        console.log("Part 1:", distance);
      } else if (distance < shortestDistance) {
        shortestDistance = distance;
      }
      break;
    }

    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX < 0 || newX >= width || newY < 0 || newY >= height) continue;

      if (tiles[newY][newX] - tiles[y][x] > 1) continue;

      toVisit.push([distance + 1, [newX, newY]]);
    }
  }
}

console.log("Part 2:", shortestDistance);
