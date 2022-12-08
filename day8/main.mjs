import getInput from "../fetchInput.mjs";

const input = await getInput(8);

const map = input
  .trim()
  .split("\n")
  .map((line) => line.trim().split(""));

let visibleTrees = new Map();

const mapSize = map.length;

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

for (let i = 0; i < mapSize; i++) {
  for (let j = 0; j < mapSize; j++) {
    const mapIndex = i * mapSize + j;
    if (i == 0 || i == mapSize - 1 || j == 0 || j == mapSize - 1) {
      visibleTrees.set(mapIndex, 0);
      continue;
    }
    let treeIsVisible = 4;
    let tree = map[i][j];
    for (let direction of directions) {
      let [x, y] = direction;
      let [x1, y1] = [i + x, j + y];
      while (x1 >= 0 && x1 < mapSize && y1 >= 0 && y1 < mapSize) {
        if (map[x1][y1] >= tree) {
          treeIsVisible--;
          break;
        }
        x1 += x;
        y1 += y;
      }
      if (!treeIsVisible) break;
    }
    if (treeIsVisible > 0) {
      visibleTrees.set(mapIndex, 0);
    }
  }
}

console.log(visibleTrees.size);

let scenicScores = new Map();

for (let i = 0; i < mapSize; i++) {
  for (let j = 0; j < mapSize; j++) {
    const mapIndex = i * mapSize + j;
    if (i == 0 || i == mapSize - 1 || j == 0 || j == mapSize - 1) {
      scenicScores.set(mapIndex, 0);
      continue;
    }
    let scenicScore = 1;
    let tree = map[i][j];
    for (let direction of directions) {
      let [x, y] = direction;
      let [x1, y1] = [i + x, j + y];
      let visibleTrees = 0;
      while (x1 >= 0 && x1 < mapSize && y1 >= 0 && y1 < mapSize) {
        if (map[x1][y1] >= tree) {
          visibleTrees++;
          break;
        }
        visibleTrees++;
        x1 += x;
        y1 += y;
      }
      scenicScore *= visibleTrees;
    }
    scenicScores.set(mapIndex, scenicScore);
  }
}

console.log(Math.max(...scenicScores.values()));
