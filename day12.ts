
function getNumber(partstr: string): number {
    const matches = partstr.match(/\-?\d+/g);
    return matches && matches[0] ? parseInt(matches[0]) : 0;
}

function countGroups(input: string, target: string): number[] {
    const counts: number[] = [];
    let curCount = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] == target) {
            curCount++;
        } else {
            if (curCount > 0) {
                counts.push(curCount);
                curCount = 0;
            }
        }
    }

    // Need to add last run
    if (curCount > 0) {
        counts.push(curCount);
    }

    return counts;
}

function replacePattern(input: string, num: number, count: number): string {
    const binNum = num.toString(2).padStart(count, '0');
    let binaryIdx = 0;
    let result = '';

    for (let i = 0; i < input.length; i++) {
        if (input[i] == '?') {
            if (binaryIdx < binNum.length) {
                result += binNum[binaryIdx] == '1' ? '#' : '.';
                binaryIdx++;
            } else {
                // Only get here is bits do not match pattern
                result += '.';
            }
        } else {
            // Other char
            result += input[i];
        }
    }

    return result;
}

function checkGroups(candidate: number[], control: number[]): boolean {
    if (candidate.length != control.length) {
        return false;
    }
    for (let i = 0; i < candidate.length; i++) {
        if (candidate[i] != control[i]) {
            return false;
        }
    }
    return true;
}


function day12(input: string) {
    const lines: string[] = input.split('\n');
    let sum: number = 0;

    for (let line of lines) {
        const [pattern, combo] = line.split(' ');
        const combinations: number[] = combo.split(',').map(num => parseInt(num.trim()));
        const places: number = pattern.split('?').length - 1;

        let combos: number = 0;
        const bits: number = 2 ** places;
        for (let i = 0; i < bits; i++) {
            let candidate: string = replacePattern(pattern, i, places);
            let candidateGroups: number[] = countGroups(candidate, '#');
            if (checkGroups(candidateGroups, combinations)) {
                combos++;
            }
        }
        console.log(pattern, '--', combinations, '--', combos);
        sum += combos;
    }
    return sum;
}

type Row = {
    springs: string
    damaged: number[]
}



export function day12part2(input: string) {
    const lines = input.split("\n")

    const rows = lines.map((line) => {
        const [springs, groups] = line.split(' ')
        return { springs, damaged: groups.split(',').map(Number) }
    })
    const cache: Record<string, number> = {}
    return rows.map(row => findArrangements(row, cache)).reduce((a, b) => a + b)
}

function findArrangements(row: Row, cache: Record<string, number>): number {
    return find(Array(5).fill(row.springs).join('?') + '.', Array(5).fill(row.damaged).flat(), 0, cache)
}

function find(springs: string, damaged: number[], groupCount: number, cache: Record<string, number>): number {
    if (springs.length === 0) {
        return damaged.length === 0 && groupCount === 0 ? 1 : 0
    }
    const key = [springs, damaged.join(','), groupCount].join(',')
    if (cache[key] !== undefined) return cache[key]

    let n = 0
    if ('#?'.includes(springs[0])) {
        n += find(springs.slice(1), damaged, groupCount + 1, cache)
    }
    if ('.?'.includes(springs[0]) && (damaged[0] === groupCount || groupCount === 0)) {
        n += find(springs.slice(1), groupCount > 0 ? damaged.slice(1) : damaged, 0, cache)
    }
    cache[key] = n
    return n
}

