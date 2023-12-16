// const input = `.|...\....
// |.-.\.....
// .....|-...
// ........|.
// ..........
// .........\
// ..../.\\..
// .-.-/..|..
// .|....-|.\
// ..//.|....`

import { day16, day16part2 } from "./day16"


const input = await Bun.file('./input/day16.txt').text()


console.log(day16part2(input))