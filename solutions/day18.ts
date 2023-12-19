const DIR: { [key: string]: number[] } = {
    U: [-1, 0],
    D: [1, 0],
    L: [0, -1],
    R: [0, 1]
}

export function day18(input: string) {
    let r = 0;
    let c = 0;
    let area = 0;
    let perimeter = 0;
    for (const line of input.split('\n')) {
        let splittedLine = line.split(/[ ()]+/g) as [string, number, string];
        let direction = splittedLine[0];
        let distance = Number(splittedLine[1])
        let color = splittedLine[2];

        const [dr, dc] = DIR[direction];
        const r0 = r;
        const c0 = c;
        r += dr * distance;
        c += dc * distance;
        area += (r * c0 - r0 * c) / 2;
        perimeter += distance;
    }
    return area + perimeter / 2 + 1
}

export function day18part2(input: string) {
    let r = 0;
    let c = 0;
    let area = 0;
    let perimeter = 0;
    for (const line of input.split('\n')) {
        let splittedLine = line.split(/[ ()]+/g) as [string, number, string];
        let color = splittedLine[2];
        let direction: string = "";
        let distance: number = 0;
        const colorNumber = Number(color.at(-1))
        if (colorNumber !== undefined) {
            direction = ['R', 'D', 'L', 'U'][colorNumber];
            distance = parseInt(color.slice(1, -1), 16);
        }
        const [dr, dc] = DIR[direction];
        const r0 = r;
        const c0 = c;
        r += dr * distance;
        c += dc * distance;
        area += (r * c0 - r0 * c) / 2;
        perimeter += distance;
    }
    return area + perimeter / 2 + 1
}