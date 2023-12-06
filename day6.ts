function calcResult(time: number[], distance: number[]) {
    const result = [];

    for (let timeIndex = 0; timeIndex < time.length; timeIndex++) {
        const selectedTime = time[timeIndex];
        let recordBreakerCounter = 0;
        for (let index = 0; index < selectedTime; index++) {
            let calcDistance = (1 * index) * (selectedTime - index);
            if (calcDistance > distance[timeIndex])
                recordBreakerCounter++;
        }
        result.push(recordBreakerCounter)
    }

    return result.reduce((a, b) => a * b)
}

export function day6(input: string) {
    const parsedValues = input.split("\n").map((l) => {
        const splitted = l.split(":")
        return splitted[1].trim().split(/\s+/).map(val => Number(val.trim()))
    });
    return calcResult(parsedValues[0], parsedValues[1])
}

export function day6part2(input: string) {
    const parsedValues = input.split("\n").map((l) => {
        const splitted = l.split(":")
        return Number(splitted[1].trim().split(/\s+/).reduce((a, b) => a + b, '').trim())//.map(val => Number(val.trim()))
    });
    return calcResult([parsedValues[0]], [parsedValues[1]])
}