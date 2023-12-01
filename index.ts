import { day1Part2 } from "./day1";

// const dayOnePart2input = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`

// const dayOneinput = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`

const input = await Bun.file('./input/day1.txt').text();

console.log(day1Part2(input))