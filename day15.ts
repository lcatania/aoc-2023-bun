function hash(s: string) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        result += s.charCodeAt(i);
        result *= 17;
        result %= 256;
    }
    return result;
}


export function day15(input: string) {
    let steps = input.split(',');
    let result = 0;
    result = steps.reduce((acc, step) => {
        return acc + hash(step);
    }, 0);

    return result;
}

export function day15part2(input: string) {
    let boxes: string[][] = Array(256).fill(0).map(() => []);
    let focal_lengths: { [key: string]: number } = {};

    for (let instruction of input.split(',')) {
        if (instruction.includes('-')) {
            let label = instruction.slice(0, -1);
            let index = hash(label);
            if (boxes[index].includes(label)) {
                boxes[index].splice(boxes[index].indexOf(label), 1);
            }
        } else {
            let instructionSplit = instruction.split('=');
            let length: number = +instructionSplit[1];
            let label = instructionSplit[0];
            let index = hash(label);
            if (!boxes[index].includes(label)) {
                boxes[index].push(label);
            }
            focal_lengths[label] = length;
        }
    }

    let total = 0;

    for (let box_number = 1; box_number <= 256; box_number++) {
        for (let lens_slot = 1; lens_slot <= boxes[box_number - 1].length; lens_slot++) {
            total += box_number * lens_slot * focal_lengths[boxes[box_number - 1][lens_slot - 1]];
        }
    }

    return total
}