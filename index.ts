import { day23, day23part2 } from "./solutions/day23";

const input = await Bun.file('./input/day23.txt').text(); 


console.log(day23part2(input))