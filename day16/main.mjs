import getInput from "../fetchInput.mjs";

const input = await getInput(16);

const map = new Map();

for (const line of input.trim().split("\n")) {
  const [part1, part2] = line.split("; ");
  const valveName = part1.split(" ")[1];
  const valveFlow = part1.split("=")[1];
  const tunnels = part2
    .split(" ")
    .slice(3)
    .map((t) => t.replace(",", ""))
    .slice(1);

  map.set(valveName, {
    flow: Number(valveFlow),
    tunnels: tunnels,
  });
}

const distancesAll = new Map();

function computeDistancesBSF(node) {
  const queue = [node];
  const distances = new Map();
  distances.set(node, 0);
  while (queue.length > 0) {
    const current = queue.shift();
    const currentDistance = distances.get(current);
    for (const tunnel of map.get(current).tunnels) {
      if (!distances.has(tunnel)) {
        distances.set(tunnel, currentDistance + 1);
        queue.push(tunnel);
      }
    }
  }
  return distances;
}

for (const [valve, _] of map) {
  distancesAll.set(valve, computeDistancesBSF(valve));
}

class State {
  constructor(oldState) {
    this.currentValve = oldState?.currentValve ?? "AA";
    this.totalFlow = oldState?.totalFlow ?? 0;
    this.totalSteps = oldState?.totalSteps ?? 0;
    this.currentRate = oldState?.currentRate ?? 0;
    this.openedValves = oldState?.openedValves ?? new Set().add("AA");
    this.maxSteps = oldState?.limit ?? 30;
  }
}

class SharedState {
  constructor(oldState) {
    this.currentValveElf = oldState?.currentValveElf ?? "AA";
    this.currentValveElephant = oldState?.currentValveElephant ?? "AA";
    this.totalFlowElf = oldState?.totalFlowElf ?? 0;
    this.totalFlowElephant = oldState?.totalFlowElephant ?? 0;
    this.totalStepsElf = oldState?.totalStepsElf ?? 0;
    this.totalStepsElephant = oldState?.totalStepsElephant ?? 0;
    this.currentRateElf = oldState?.currentRateElf ?? 0;
    this.currentRateElephant = oldState?.currentRateElephant ?? 0;
    this.openedValves = oldState?.openedValves ?? new Set().add("AA");
    this.maxSteps = oldState?.limit ?? 26;
  }
}

function isNodeExplorable(state, node) {
  const distance = distancesAll.get(state.currentValve).get(node);
  return (
    !state.openedValves.has(node) &&
    state.maxSteps - state.totalSteps >= distance + 1
  );
}

function nextState(state, node) {
  const [valve, data] = [node, map.get(node)];
  const distance = distancesAll.get(state.currentValve).get(valve) + 1;
  return new State({
    currentValve: valve,
    totalFlow: state.totalFlow + distance * state.currentRate,
    totalSteps: state.totalSteps + distance,
    currentRate: state.currentRate + data.flow,
    openedValves: new Set(state.openedValves).add(valve),
    maxSteps: state.maxSteps,
  });
}

function isNodeExplorableElf(state, node) {
  const distance = distancesAll.get(state.currentValveElf).get(node);
  return (
    !state.openedValves.has(node) &&
    state.maxSteps - state.totalStepsElf >= distance + 1
  );
}

function isNodeExplorableElephant(state, node) {
  const distance = distancesAll.get(state.currentValveElephant).get(node);
  return (
    !state.openedValves.has(node) &&
    state.maxSteps - state.totalStepsElephant >= distance + 1
  );
}

function nextStateElf(state, node) {
  const [valve, data] = [node, map.get(node)];
  const distance = distancesAll.get(state.currentValveElf).get(valve) + 1;
  return new SharedState({
    currentValveElf: valve,
    totalFlowElf: state.totalFlowElf + distance * state.currentRateElf,
    totalStepsElf: state.totalStepsElf + distance,
    currentRateElf: state.currentRateElf + data.flow,
    openedValves: new Set(state.openedValves).add(valve),
    maxSteps: state.maxSteps,
    currentValveElephant: state.currentValveElephant,
    totalFlowElephant: state.totalFlowElephant,
    totalStepsElephant: state.totalStepsElephant,
    currentRateElephant: state.currentRateElephant,
  });
}

function nextStateElephant(state, node) {
  const [valve, data] = [node, map.get(node)];
  const distance = distancesAll.get(state.currentValveElephant).get(valve) + 1;
  return new SharedState({
    currentValveElf: state.currentValveElf,
    totalFlowElf: state.totalFlowElf,
    totalStepsElf: state.totalStepsElf,
    currentRateElf: state.currentRateElf,
    openedValves: new Set(state.openedValves).add(valve),
    maxSteps: state.maxSteps,
    currentValveElephant: valve,
    totalFlowElephant:
      state.totalFlowElephant + distance * state.currentRateElephant,
    totalStepsElephant: state.totalStepsElephant + distance,
    currentRateElephant: state.currentRateElephant + data.flow,
  });
}

let queue = [new State()];

let maxFlow = 0;

// while (queue.length > 0) {
//   let currentState = queue.shift();
//   // skip flow = 0 for speed!!!!!
//   let possibleNextNodes = [...map.keys()].filter(
//     (x) => map.get(x).flow > 0 && isNodeExplorable(currentState, x)
//   );
//   if (possibleNextNodes.length === 0) {
//     let remainingSteps = currentState.maxSteps - currentState.totalSteps;
//     let remainingFlow = remainingSteps * currentState.currentRate;
//     let totalFlow = currentState.totalFlow + remainingFlow;
//     if (totalFlow > maxFlow) {
//       maxFlow = totalFlow;
//     }
//   } else {
//     queue = queue.concat(
//       possibleNextNodes.map((x) => nextState(currentState, x))
//     );
//   }
// }

console.log(maxFlow);

maxFlow = 0;

queue = [new SharedState()];

let maxVariation = 0;

while (queue.length > 0) {
  let currentState = queue.shift();
  // skip flow = 0 for speed!!!!!
  let possibleNextNodesElf = [...map.keys()].filter(
    (x) => map.get(x).flow > 0 && isNodeExplorableElf(currentState, x)
  );
  let possibleNextNodesElephant = [...map.keys()].filter(
    (x) => map.get(x).flow > 0 && isNodeExplorableElephant(currentState, x)
  );

  let totalFlowElf =
    currentState.totalFlowElf +
    (currentState.maxSteps - currentState.totalStepsElf) *
      currentState.currentRateElf;

  let totalFlowElephant =
    currentState.totalFlowElephant +
    (currentState.maxSteps - currentState.totalStepsElephant) *
      currentState.currentRateElephant;

  let variation =
    totalFlowElf / (currentState.totalStepsElf + 1) +
    totalFlowElephant / (currentState.totalStepsElephant + 1);

  maxVariation = Math.max(maxVariation, variation);

  if (variation < Math.floor(maxVariation / 1.5)) {
    // 1.5 is a magic number lol
    continue;
  }

  if (possibleNextNodesElf.length + possibleNextNodesElephant.length == 0) {
    let remainingStepsElf = currentState.maxSteps - currentState.totalStepsElf;
    let remainingFlowElf = remainingStepsElf * currentState.currentRateElf;
    let totalFlowElf = currentState.totalFlowElf + remainingFlowElf;

    let remainingStepsElephant =
      currentState.maxSteps - currentState.totalStepsElephant;
    let remainingFlowElephant =
      remainingStepsElephant * currentState.currentRateElephant;
    let totalFlowElephant =
      currentState.totalFlowElephant + remainingFlowElephant;

    let totalFlow = totalFlowElf + totalFlowElephant;

    if (totalFlow > maxFlow) {
      maxFlow = totalFlow;
      console.log(maxFlow);
    }
  } else {
    for (let nextNode of possibleNextNodesElf) {
      let updatedState = nextStateElf(currentState, nextNode);
      if (possibleNextNodesElephant.length == 0) {
        queue.push(updatedState);
      }
      for (let nextNodeElephant of possibleNextNodesElephant) {
        if (nextNodeElephant != nextNode) {
          queue.push(nextStateElephant(updatedState, nextNodeElephant));
        }
      }
    }
    if (possibleNextNodesElf.length == 0) {
      for (let nextNodeElephant of possibleNextNodesElephant) {
        queue.push(nextStateElephant(currentState, nextNodeElephant));
      }
    }
  }
}

console.log(maxFlow);
