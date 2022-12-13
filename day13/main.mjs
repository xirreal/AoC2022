import getInput from "../fetchInput.mjs";

const input = await getInput(13);

const pairs = input.trim().split("\n\n");

function compare(a, b) {
  if (typeof a == "number" && typeof b == "number") {
    return a == b ? -1 : a < b;
  }

  if (typeof a == "number") {
    a = [a];
  }

  if (typeof b == "number") {
    b = [b];
  }

  let i = 0;
  while (i < a.length && i < b.length) {
    const result = compare(a[i], b[i]);
    if (result != -1) {
      return result;
    }
    i++;
  }
  return a.length == b.length ? -1 : a.length < b.length;
}

let index = 0;
let sum = 0;
for (const pair of pairs) {
  index++;
  const [a, b] = pair.trim().split("\n").map(JSON.parse);
  const result = compare(a, b);
  if (result) {
    sum += index;
  }
}

console.log(sum);

let packets = pairs.flatMap((x) => x.trim().split("\n").map(JSON.parse));

packets.push([[2]]);
packets.push([[6]]);

let sorted = false;
while (!sorted) {
  sorted = true;
  for (let i = 0; i < packets.length - 1; i++) {
    if (!compare(packets[i], packets[i + 1])) {
      [packets[i], packets[i + 1]] = [packets[i + 1], packets[i]];
      sorted = false;
      break;
    }
  }
}

let strings = packets.map((x) => JSON.stringify(x));
console.log((strings.indexOf("[[2]]") + 1) * (strings.indexOf("[[6]]") + 1));
