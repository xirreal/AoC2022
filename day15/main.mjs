import getInput from "../fetchInput.mjs";

const input = await getInput(15);

const gridMap = new Map();
const manhattanDistances = new Map();

for (let line of input.trim().split("\n")) {
  const [sensorX, sensorY, beaconX, beaconY] = line.match(/-?\d+/g).map(Number);

  const manhattanDistance =
    Math.abs(beaconX - sensorX) + Math.abs(beaconY - sensorY);

  const sensorKey = `S_${sensorX},${sensorY}`;
  const beaconKey = `B_${beaconX},${beaconY}`;
  gridMap.set(sensorKey, beaconKey);
  manhattanDistances.set(sensorKey, manhattanDistance);
}

const entries = [...gridMap.entries()];
const occupied = new Set();

const TARGET = 2_000_000;

for (const [sensor, beacon] of entries) {
  const [sensorX, sensorY] = sensor.split("_")[1].split(",").map(Number);
  const [beaconX, beaconY] = beacon.split("_")[1].split(",").map(Number);

  const manhattanDistance = manhattanDistances.get(sensor);

  for (
    let x = sensorX - manhattanDistance;
    x <= sensorX + manhattanDistance;
    x++
  ) {
    if (x == beaconX && TARGET == beaconY) continue;
    const newManthattanDistance =
      Math.abs(x - sensorX) + Math.abs(TARGET - sensorY);
    if (newManthattanDistance > manhattanDistance) continue;
    occupied.add(`${x},${TARGET}`);
  }
}

console.log(
  Array.from(occupied).sort((a, b) => a.split(",")[0] - b.split(",")[0]).length
);

for (let x = 0; x <= 4_000_000; x++) {
  for (let y = 0; y <= 4_000_000; y++) {
    let amountToSkip = undefined;
    for (const [sensor, manhattanDistance] of manhattanDistances.entries()) {
      const [sensorX, sensorY] = sensor.split("_")[1].split(",").map(Number);

      const deltax = Math.abs(x - sensorX);
      const deltay = Math.abs(y - sensorY);

      const manhattanDistance2 = deltax + deltay;

      if (manhattanDistance2 <= manhattanDistance) {
        if (amountToSkip === undefined) amountToSkip = 0;
        amountToSkip = Math.max(
          amountToSkip,
          sensorY + manhattanDistance - deltax - y
        );
      }
    }
    if (amountToSkip === undefined) {
      console.log(x, y);
      console.log(x * 4_000_000 + y);
      process.exit();
    }
    y += amountToSkip;
  }
}
