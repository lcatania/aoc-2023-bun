import { day24 } from "./solutions/day24";

const input = await Bun.file('./input/day24.txt').text();
console.log(day24(input, 200000000000000, 400000000000000))