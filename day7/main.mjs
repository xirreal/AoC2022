import getInput from "../fetchInput.mjs";

const input = await getInput(7);

let filesystem = [];
let dirSizes = [];

for (let line of input.trim().split("\n")) {
  line = line.split(" ");
  if (line[0] == "$") {
    const [command, ...args] = line.slice(1);
    if (command == "cd") {
      if (args[0] == "..") {
        filesystem.push(dirSizes.pop());
      } else {
        dirSizes.push(0);
      }
    }
  } else if (line[0] != "dir") {
    dirSizes = dirSizes.map((x) => x + Number(line[0]));
  }
}

filesystem.push(...dirSizes); // The last directories are not cd ..'d out of, fuck you!!!!!

console.log(filesystem.filter((x) => x <= 100000).reduce((a, b) => a + b, 0));

console.log(
  Math.min(
    ...filesystem.filter(
      (x) => 70000000 - Math.max(...filesystem) + x >= 30000000
    )
  )
);

// Old version, didn't work and i realized i don't care about names of files/directories
// traversing Objects is hard :(

// const FS = {};

// let lastCommand = "";
// let currentDirTree = [];

// for (let line of input.trim().split("\n")) {
//   if (line.startsWith("$")) {
//     const [command, ...args] = line.split(" ").slice(1);
//     if (command == "cd") {
//       if (args[0] == "..") {
//         currentDirTree.pop();
//       } else {
//         currentDirTree.push(args[0]);
//       }
//     }
//     lastCommand = command;
//   } else if (lastCommand == "ls") {
//     const [size, name] = line.split(" ");
//     if (size != "dir") {
//       let directory = FS;
//       for (let location of currentDirTree) {
//         if (directory[location] == undefined) {
//           directory[location] = {};
//         }
//         directory = directory[location];
//       }

//       directory[name] = Number(size);
//     }
//   }
// }

// const sizes = new Map();

// function traverseDirectoryTree(parent, cdir = "/") {
//   let rootSize = 0;
//   for (let [filename, data] of Object.entries(parent)) {
//     if (typeof data == "number") {
//       rootSize += data;
//     } else {
//       rootSize += traverseDirectoryTree(data, filename);
//     }
//   }
//   sizes.set(cdir, rootSize);
//   return rootSize;
// }

// traverseDirectoryTree(FS);

// let sum = 0;
// for (let [name, size] of sizes) {
//   console.log(name, size);
//   if (size <= 100000) {
//     sum += size;
//   }
// }

// console.log(sum);
