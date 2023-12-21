// const input = `...........
// .....###.#.
// .###.##..#.
// ..#.#...#..
// ....#.#....
// .##..S####.
// .##..#...#.
// .......##..
// .##.#.####.
// .##..##.##.
// ...........`

import { day21, day21part2 } from "./solutions/day21";

const input = await Bun.file('./input/day21.txt').text()

console.log(day21part2(input));