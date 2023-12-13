import { day13 } from "./day13";

const input = await Bun.file('./input/day13.txt').text();

console.log(day13(input))