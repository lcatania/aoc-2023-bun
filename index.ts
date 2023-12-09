// const input = `0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45`;

import { day9, day9part2 } from "./day9"

// const input = `10 13 16 21 30 45`

const input = await Bun.file('input/day9.txt').text()

console.log(day9part2(input))