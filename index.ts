import { day12part2 } from "./day12"

const input = await Bun.file('./input/day12.txt').text()

console.log(day12part2(input))