
// const input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`

import { day7part2 } from "./day7";

const input = await Bun.file('./input/day7.txt').text();


console.log(day7part2(input))



