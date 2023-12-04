export function day4(input: string) {
    return input.split("\n").map(l => l.split(":")[1]).map((line) => {
        const splittedLine = line.split("|")
        const winningNumbers = splittedLine[0].trimStart().trimEnd().split(" ").map(Number);
        const numbers = splittedLine[1].trimStart().trimEnd().split(" ").filter(n => n !== "").map(Number)
        let cardResult = 0
        numbers.forEach((n) => {
            if (winningNumbers.includes(n)) {
                if (cardResult > 0)
                    cardResult *= 2;
                else
                    cardResult += 1
            }
        })
        return cardResult
    }).reduce((a, b) => a + b)
}

export function day4part2(input: string) {
    let result: { [key: string]: number } = {};
    input.split("\n").forEach((line, i) => {
        if (!result[i])
            result[i] = 1
        else
            result[i] += 1;
        const cards = line.split('|')[0].split(":")[0]
        const winningNumbers = line.split('|')[0].split(":")[1].trimStart().trimEnd().split(" ").filter(n => n !== "").map(Number);
        const matchingNumbers = line.split('|')[1].trimStart().trimEnd().split(" ").filter(n => n !== "").map(Number);
        const value = new Set([...matchingNumbers].filter(x => new Set([...winningNumbers]).has(x))).size;
        for (let j = 0; j < value; j++) {
            result[(i + 1 + j)] = (result[(i + 1 + j)] ?? 0) + result[i]
        }
    })
    return Object.values(result).reduce((a, b) => a + b)
}