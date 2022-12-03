import getInput from "../fetchInput.mjs";

const input = await getInput(3);

console.log(
  input
    .trim()
    .split("\n")
    .map((x) => [
      x.slice(0, x.length / 2).split(""),
      x.slice(x.length / 2).split(""),
    ])
    .map((x) => x[0].find((a) => x[1].includes(a)))
    .map((x) => x.charCodeAt(0) - (x.charCodeAt(0) > 96 ? 96 : 64 - 26))
    .reduce((a, b) => a + b, 0)
);

console.log(
  input
    .trim()
    .split("\n")
    .map((_, i, a) => a.slice(i * 3, i * 3 + 3).map((x) => x.split("")))
    .filter((x) => x[0])
    .map((x) => x[0].find((a) => x[1].includes(a) && x[2].includes(a)))
    .map((x) => x.charCodeAt(0) - (x.charCodeAt(0) > 96 ? 96 : 64 - 26))
    .reduce((a, b) => a + b, 0)
);
