import getInput from "../fetchInput.mjs";

const input = await getInput(9);

const moves = input.trim().split("\n");

const headPos = [0, 0];
const tailPositions = new Array(9).fill(0).map(() => new Array(2).fill(0));

const directions = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0],
};

function updateTailPosition(src, dst) {
  if (Math.abs(dst[0] - src[0]) < 2 && Math.abs(dst[1] - src[1]) < 2) {
    return src;
  } else {
    // Apparently i can't just assume i can move TO dst?? But this works for part1 but not part2????
    return [
      src[0] + Math.sign(dst[0] - src[0]),
      src[1] + Math.sign(dst[1] - src[1]),
    ];
    /*
    return dst;
    */
  }
}

const visitedTilesP1 = new Set();
const visitedTilesP2 = new Set();
visitedTilesP1.add("0,0");
visitedTilesP2.add("0,0");

for (let i = 0; i < moves.length; i++) {
  const [direction, distance] = moves[i].split(" ");

  const [x, y] = directions[direction];
  for (let k = 0; k < distance; k++) {
    let prevPos = [...headPos];

    headPos[0] += x;
    headPos[1] += y;

    for (let j = 0; j < tailPositions.length; j++) {
      tailPositions[j] = updateTailPosition(tailPositions[j], prevPos);
      prevPos = [...tailPositions[j]];
    }

    visitedTilesP1.add(tailPositions[0].join(","));
    visitedTilesP2.add(tailPositions[8].join(","));
  }
}
//         Why is this off by one?????
console.log(visitedTilesP1.size + 1, visitedTilesP2.size);
