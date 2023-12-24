import { day24, day24part2 } from "./solutions/day24"

const input = await Bun.file("./input/day24.txt").text()

console.log(await day24part2(input))