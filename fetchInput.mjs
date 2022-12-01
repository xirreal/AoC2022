import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs";

export default async function getInput(day) {
  // Check if the input file exists
  if (!existsSync(`../inputCache`)) {
    mkdirSync(`../inputCache`);
  }
  if (existsSync(`../inputCache/day${day}.txt`)) {
    return readFileSync(`../inputCache/day${day}.txt`, "utf8");
  }
  // If not, fetch it from the server
  const input = await (
    await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
      headers: {
        cookie: `session=${process.env.AOC_SESSION}`,
      },
    })
  ).text();
  // Cache the input
  writeFileSync(`../inputCache/day${day}.txt`, input);

  return input;
}
