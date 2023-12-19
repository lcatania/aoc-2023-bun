
function rotate(map: string[][]) {
    return map[0].map((_, j) => map.map((_, i) => map[i][j]));
}

function getErrors(a: string[], b: string[]) {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        count += +(a[i] !== b[i]);
    }
    return count;
}

function getReflection(map: string[][], maxErrors: number) {
    outer: for (let i = 0; i < map.length - 1; i++) {
        let nErrors = getErrors(map[i], map[i + 1]);
        if (nErrors <= maxErrors) {
            for (let j = i - 1; j >= 0; j--) {
                const delta = i - j;
                if (!map[j] || !map[i + 1 + delta]) {
                    break;
                }
                nErrors += getErrors(map[j], map[i + 1 + delta]);
                if (nErrors > maxErrors) {
                    continue outer;
                }
            }
            if (nErrors === maxErrors) {
                return i + 1;
            }
        }
    }
    return 0;
}

export function day13(input: string) {
    let sum = 0;
    for (let map of input.split('\n\n')) {
        const parsedMap = map.split('\n').map((row) => row.split(''));
        const rot = rotate(parsedMap);

        const hReflect = getReflection(parsedMap, 0);
        const vReflect = getReflection(rot, 0);
        sum += hReflect * 100;
        sum += vReflect;
    }
    return sum;
}

export function day13part2(input: string) {
    let sum = 0;
    for (let map of input.split('\n\n')) {
        const parsedMap = map.split('\n').map((row) => row.split(''));
        const rot = rotate(parsedMap);

        const hReflect = getReflection(parsedMap, 1);
        const vReflect = getReflection(rot, 1);
        sum += hReflect * 100;
        sum += vReflect;
    }
    return sum;
}