// const input = `O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....`

import { day15, day15part2 } from "./day15"

// import { day14, day14part2 } from "./day14"
const input = await Bun.file('./input/day15.txt').text()

console.log(day15part2(input))