const input = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`


type Instruction = {
    direction: string;
    distance: number;
    color: string;
}

const instructions = input.split("\n").map((l) => {
    const [direction, distance, color] = l.split(" ");
    const instruction: Instruction = {
        color: color.replace("(", "").replace(")", ""),
        direction: direction,
        distance: +distance
    }
    return instruction
})

const width = Math.max(...instructions.map(i => i.distance))
for (let index = 0; index < instructions.length; index++) {
    const instruction = instructions[index];
    switch (instruction.direction) {
        case "L":
            console.log("#".repeat(instruction.distance))
            break;
        case "R":
            console.log("#".repeat(instruction.distance))
            break;
        case "U":

            break;
        case "D":

            break;
        default:
            break;
    }
}