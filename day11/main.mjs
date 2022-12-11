import getInput from "../fetchInput.mjs";

const input = await getInput(11);

const monkeys = input
  .trim()
  .split("\n\n")
  .map((monkey) => {
    const [_, ...lines] = monkey.split("\n");
    const [startingItems, operation, test, trueCase, falseCase] = lines;
    return {
      startingItems: startingItems.split(": ")[1].split(", ").map(BigInt),
      operation: operation
        .split(": ")[1]
        .split(" = ")[1]
        .split(" ")
        .map((x, i) => (i == 1 || x == "old" ? x : BigInt(x))),
      test: BigInt(test.split(": ")[1].split("by ")[1]),
      trueCase: trueCase.split(": ")[1].split("monkey ")[1],
      falseCase: falseCase.split(": ")[1].split("monkey ")[1],
      inspectedItems: 0,
    };
  });

const modulo = monkeys.reduce((a, b) => a * b.test, 1n);

for (let rounds = 0; rounds < 10000; rounds++) {
  for (let monkey of monkeys) {
    let newItems = [];
    for (let item of monkey.startingItems) {
      monkey.inspectedItems++;
      let [operand1, operation, operand2] = monkey.operation;
      let newItem;
      if (operand1 == "old") operand1 = item;
      if (operand2 == "old") operand2 = item;

      switch (operation) {
        case "*":
          newItem = operand1 * operand2;
          break;
        case "/":
          newItem = operand1 / operand2;
          break;
        case "+":
          newItem = operand1 + operand2;
          break;
        case "-":
          newItem = operand1 - operand2;
          break;
      }

      newItem = newItem % modulo;

      if (newItem % monkey.test == 0) {
        monkeys[monkey.trueCase].startingItems.push(newItem);
      } else {
        monkeys[monkey.falseCase].startingItems.push(newItem);
      }
    }
    monkey.startingItems = newItems;
  }
}

console.log(
  monkeys
    .sort((a, b) => b.inspectedItems - a.inspectedItems)
    .slice(0, 2)
    .map((x) => BigInt(x.inspectedItems))
    .reduce((a, b) => a * b, 1n)
);
