// const input = `LR

import { day8part2 } from "./day8";

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`

const input = await Bun.file('./input/day8.txt').text()


console.log(day8part2(input));


