function parseSpelledNumber(strArray: string[]) {
    const spelledNumbers: { [key: string]: number } = {
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
    };
    return strArray.map(str => {
        const result = [];
        if (!isNaN(Number(str))) {
            return Number(str)
        }

        for (let index = 0; index < str.length; index++) {
            const partial = str.slice(index, index + 5)
            const parsed = Object.keys(spelledNumbers).find(sn =>
                partial.includes(sn)
            );
            if (!parsed)
                continue;

            result.push(spelledNumbers[parsed]);
        }
        return result;
    }).flat(1)
}

export function day1(input: string) {
    return input
        .split("\n")
        .map((i) => i.replace(/\D/g, ''))
        .map((i) => `${i.charAt(0)}${i.slice(-1)}`)
        .map(Number)
        .reduce((a, b) => a + b)
}

export function day1Part2(input: string) {
    return input
        .split("\n")
        .map((i) => i.match(/\d+|[a-z]+/gi)?.map(i => isNaN(Number(i)) ? i : i.split("")).flat(1))
        .map((i) => parseSpelledNumber(i ?? []))
        .map((i) => `${i[0]}${i.slice(-1)}`)
        .map(Number)
        .reduce((a, b) => a + b)
}