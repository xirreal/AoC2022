import getInput from "../fetchInput.mjs";

const input = await getInput(21);

const monkeys = new Map();

for (const line of input.trim().split("\n")) {
  const [name, value] = line.split(": ");

  let v = {
    value: null,
    op: undefined,
    waitFor: [],
  };

  if (Number.isNaN(Number(value))) {
    let operations = value.split(" ");
    v.op = operations[1];
    v.waitFor = [operations[0], operations[2]];
  } else {
    v.value = Number(value);
  }

  monkeys.set(name, v);
}

function calculateMonkeyValue(name) {
  if (monkeys.get(name).value !== null) {
    return monkeys.get(name).value;
  }

  let v = monkeys.get(name);

  let a = calculateMonkeyValue(v.waitFor[0]);
  let b = calculateMonkeyValue(v.waitFor[1]);

  if (v.op === "+") {
    v.value = a + b;
  }
  if (v.op === "-") {
    v.value = a - b;
  }
  if (v.op === "*") {
    v.value = a * b;
  }
  if (v.op === "/") {
    v.value = a / b;
  }

  return v.value;
}

function calculateMonkeyValueReverse(name, targetValue) {
  if (name == "humn") return targetValue;

  let finishMonkey = monkeys.get(name);

  let queue = finishMonkey.waitFor.slice().map((x) => {
    return {
      origin: x,
      toExplore: x,
    };
  });

  let branchToGuess = null;

  while (queue.length > 0) {
    let monkey = queue.shift();
    let monkeyObj = monkeys.get(monkey.toExplore);
    if (monkey.toExplore == "humn") {
      branchToGuess = monkey.origin;
      break;
    }
    queue.push(
      ...monkeyObj.waitFor.slice().map((x) => {
        return {
          origin: monkey.origin,
          toExplore: x,
        };
      })
    );
  }

  let leftSide = finishMonkey.waitFor[0];
  let rightSide = finishMonkey.waitFor[1];

  if (branchToGuess == leftSide) {
    let rightValue = calculateMonkeyValue(rightSide);
    let leftValue = 0;

    if (finishMonkey.op == "+") {
      leftValue = targetValue - rightValue;
    }
    if (finishMonkey.op == "-") {
      leftValue = targetValue + rightValue;
    }
    if (finishMonkey.op == "*") {
      leftValue = targetValue / rightValue;
    }
    if (finishMonkey.op == "/") {
      leftValue = targetValue * rightValue;
    }

    return calculateMonkeyValueReverse(leftSide, leftValue);
  } else {
    let leftValue = calculateMonkeyValue(leftSide);
    let rightValue = 0;

    if (finishMonkey.op == "+") {
      rightValue = targetValue - leftValue;
    }
    if (finishMonkey.op == "-") {
      rightValue = leftValue - targetValue;
    }
    if (finishMonkey.op == "*") {
      rightValue = targetValue / leftValue;
    }
    if (finishMonkey.op == "/") {
      rightValue = leftValue / targetValue;
    }

    return calculateMonkeyValueReverse(rightSide, rightValue);
  }
}

function Part2() {
  let finishMonkey = monkeys.get("root");

  let queue = finishMonkey.waitFor.slice().map((x) => {
    return {
      origin: x,
      toExplore: x,
    };
  });

  let branchToGuess = null;

  while (queue.length > 0) {
    let monkey = queue.shift();
    let monkeyObj = monkeys.get(monkey.toExplore);
    if (monkey.toExplore == "humn") {
      branchToGuess = monkey.origin;
      break;
    }
    queue.push(
      ...monkeyObj.waitFor.slice().map((x) => {
        return {
          origin: monkey.origin,
          toExplore: x,
        };
      })
    );
  }

  let otherMonkey = finishMonkey.waitFor.find((x) => x != branchToGuess);
  let targetValue = calculateMonkeyValue(otherMonkey);

  let result = calculateMonkeyValueReverse(branchToGuess, targetValue);
  console.log(result);
}

console.log(calculateMonkeyValue("root"));
console.log(Part2());
