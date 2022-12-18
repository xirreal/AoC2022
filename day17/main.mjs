import getInput from "../fetchInput.mjs";

//const input = await getInput(17);

const input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;

const shapes = [
  [[1, 1, 1, 1]], // |
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ], // +
  [
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ], // L
  [[1], [1], [1], [1]], // -
  [
    [1, 1],
    [1, 1],
  ], // square
];

const moves = input.trim().split("");

const grid = new Array(5001).fill(0).map(() => new Array(7).fill(0));

grid[5000] = new Array(7).fill(2);

let fallenRocks = 0;

function solidifyShape(x, y, shape) {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] == 1) {
        grid[y + i][x + j] = 2;
      }
    }
  }
}

function collideShape(x, y, shape) {
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (grid[y + i][x + j] != 0 && shape[i][j] == 1) {
        return true;
      }
    }
  }
  return false;
}

let highestRock = 5000;
let moveCounter = 0;

while (fallenRocks < 2022) {
  const shape = shapes[fallenRocks % shapes.length];
  let startingX = 2;
  let startingY = highestRock - 3 - shape.length;

  let still = false;
  while (!still) {
    const move = moves[moveCounter % moves.length];
    moveCounter++;

    let previousX = startingX;

    if (move == ">") {
      startingX++;
    }
    if (move == "<") {
      startingX--;
    }

    if (startingX < 0) startingX = 0;
    if (startingX > grid[0].length - shape[0].length)
      startingX = grid[0].length - shape[0].length;

    if (collideShape(startingX, startingY, shape)) {
      startingX = previousX;
    }

    startingY++;
    if (collideShape(startingX, startingY, shape)) {
      still = true;
      startingY--;
    }
  }

  solidifyShape(startingX, startingY, shape);

  highestRock = Math.min(highestRock, startingY);

  fallenRocks++;
}

console.log(5000 - highestRock);
