import getInput from "../fetchInput.mjs";

const input = await getInput(14);

let lowestY = 0;
function generateGrid() {
  const grid = new Array(500).fill(0).map(() => new Array(1000).fill("."));

  for (const line of input.trim().split("\n")) {
    const paths = line.split(" -> ");
    for (let i = 0; i < paths.length - 1; i++) {
      const pathFrom = paths[i];
      const pathTo = paths[i + 1];
      const [fromX, fromY] = pathFrom.split(",").map(Number);
      const [toX, toY] = pathTo.split(",").map(Number);

      if (toY > lowestY) lowestY = toY;
      if (fromX === toX) {
        if (fromY < toY) {
          for (let y = fromY; y <= toY; y++) {
            grid[y][fromX] = "#";
          }
        } else {
          for (let y = fromY; y >= toY; y--) {
            grid[y][fromX] = "#";
          }
        }
      } else {
        if (fromX < toX) {
          for (let x = fromX; x <= toX; x++) {
            grid[fromY][x] = "#";
          }
        } else {
          for (let x = fromX; x >= toX; x--) {
            grid[fromY][x] = "#";
          }
        }
      }
    }
  }
  return grid;
}

function simulateParticles(grid) {
  let done = false;
  let particlesSimulated = 0;
  while (!done) {
    let [x, y] = [500, 0];
    let particleIsFalling = true;

    if (grid[y][x] === "o") {
      done = true;
      break;
    }

    while (particleIsFalling && y < lowestY + 2) {
      grid[y][x] = ".";
      if (grid[y + 1][x] === ".") {
        y++;
      } else if (grid[y + 1][x - 1] === ".") {
        y++;
        x--;
      } else if (grid[y + 1][x + 1] === ".") {
        y++;
        x++;
      } else {
        particleIsFalling = false;
      }
      grid[y][x] = "o";
    }
    if (y == lowestY + 2) done = true;
    particlesSimulated++;
  }
  return particlesSimulated;
}

let grid1 = generateGrid();
console.log(simulateParticles(grid1)); // Part 1
// Add bottom floor
let grid2 = generateGrid();
for (let x = 0; x < grid2[0].length; x++) {
  grid2[lowestY + 2][x] = "#";
}
console.log(simulateParticles(grid2)); // Part 2
