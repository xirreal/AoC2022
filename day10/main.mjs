import getInput from "../fetchInput.mjs";

const input = await getInput(10);

let register_x = 1;

const instructions = input
  .trim()
  .split("\n")
  .map((line) => {
    const [op, ...args] = line.split(" ");
    return { op, args };
  });

let cycleCounter = 1;
let sumOfSignalStrengths = 0;

function updateSignalStrength() {
  if ((cycleCounter + 20) % 40 == 0) {
    sumOfSignalStrengths += register_x * cycleCounter;
  }
}

function drawPixel() {
  if (cycleCounter >= 240) return;
  const x = Math.floor(cycleCounter % 40) - 1;
  const y = Math.floor(cycleCounter / 40);

  let xSprite = Math.floor(register_x % 40);

  if (Math.abs(x - xSprite) > 1) return;

  screen[y][x] = "#";
}

const screen = new Array(6).fill(0).map(() => new Array(40).fill("."));

drawPixel();

for (let instruction of instructions) {
  cycleCounter++;
  updateSignalStrength();
  drawPixel();
  switch (instruction.op) {
    case "addx":
      register_x += Number(instruction.args[0]);
      cycleCounter++;
      updateSignalStrength();
      drawPixel();
      break;
    case "noop":
      continue;
    default:
      throw new Error("Unknown op");
  }
}

console.log(sumOfSignalStrengths);
screen.forEach((x) => x.push("\n"));
console.log(screen.flat().join(""));
