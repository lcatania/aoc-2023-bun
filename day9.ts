function calculateSequences(initialValues: number[], result: number[][]): number[][] {
    let nextSequence = [];
    for (let index = 0; index < initialValues.length - 1; index++) {
        const val = initialValues[index];
        nextSequence.push(initialValues[index + 1] - initialValues[index])
    }
    result.push(nextSequence)
    if (nextSequence.every(v => v === 0))
        return result;
    return calculateSequences(nextSequence, result);
}

function extrapolateValues(line: number[], reverse: boolean = false) {
    let calculatedSequences = calculateSequences(line, [line]).reverse();
    let result = 0
    for (let index = 0; index < calculatedSequences.length; index++) {
        const element = calculatedSequences[index]
        const prevElement = calculatedSequences[index - 1]
        let extrapolatedValue = 0
        if (reverse) {
            extrapolatedValue = element[0] - (prevElement ? prevElement[0] : 0)
            element.unshift(extrapolatedValue)
        }
        else {
            extrapolatedValue = element[element.length - 1] + (prevElement ? prevElement[prevElement.length - 1] : 0)
            element.push(extrapolatedValue)
        }
        result = extrapolatedValue
    }
    return result;
}

export function day9(input: string) {
    return input.split('\n').map(l => l.split(" ").map(v => Number(v.trim()))).map(l => extrapolateValues(l)).reduce((a, b) => a + b)
}

export function day9part2(input: string) {
    return input.split('\n').map(l => l.split(" ").map(v => Number(v.trim()))).map(l => extrapolateValues(l, true)).reduce((a, b) => a + b)
}
