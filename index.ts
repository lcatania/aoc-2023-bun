import { day3, day3part2 } from "./day3";

const input = await Bun.file('./input/day3.txt').text();

console.log(day3part2(input))