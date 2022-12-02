import getInput from "../fetchInput.mjs";

const input = await getInput(2);

const moveEnum = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const games = input
  .split("\n")
  .filter((line) => line)
  .map((line) => line.split(" "));

let score = 0;

for (let game of games) {
  const [move1, move2] = game;

  score += moveEnum[move2];

  if (moveEnum[move1] == moveEnum[move2]) {
    score += 3;

    continue;
  }
  if (move1 == "A" && move2 == "Y") {
    // Rock paper
    score += 6;
  }
  if (move1 == "B" && move2 == "Z") {
    // Paper scissors
    score += 6;
  }
  if (move1 == "C" && move2 == "X") {
    // Scissors rock
    score += 6;
  }
}

console.log(score);

score = 0;

for (let game of games) {
  const [move1, result] = game;

  if (result == "Y") {
    score += 3;
    score += moveEnum[move1];
    continue;
  }
  if (move1 == "A" && result == "Z") {
    // Rock paper
    score += 6;
    score += moveEnum["Y"];
  }
  if (move1 == "A" && result == "X") {
    // Rock scissors
    score += moveEnum["Z"];
  }
  if (move1 == "B" && result == "X") {
    // Paper rock
    score += moveEnum["X"];
  }
  if (move1 == "B" && result == "Z") {
    // Paper scissors
    score += 6;
    score += moveEnum["Z"];
  }
  if (move1 == "C" && result == "Z") {
    // Scissors rock
    score += 6;
    score += moveEnum["X"];
  }
  if (move1 == "C" && result == "X") {
    // Scissors paper
    score += moveEnum["Y"];
  }
}

console.log(score);
