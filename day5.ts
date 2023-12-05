
function buildMap(mapping: number[][]) {
    let newMap: Record<number, number> = {}
    mapping.forEach((mappingPart, mapIndex) => {
        for (let index = 0; index < mappingPart[2]; index++) {
            newMap[(mappingPart[1] + index)] = mappingPart[0] + index
        }
    })
    return newMap
}

function getLocationFromSeed(seed: number, maps: Array<Record<string, number>>) {
    let result = seed;
    maps.forEach(m => {
        if (!m[result])
            return;
        result = m[result];
    })
    return result;
}

// Only works on smol datasets because it builds a map and iiiiiiiiiiiis sloooooooooooow and tooo bulky
export function slowInputDay5(input: string) {
    const lines = input.split("\n")
    const seeds = lines[0].split(":")[1].trimStart().split(" ").map(Number)
    const mappings = input.split("\n\n").slice(1).map((mapBlock) => mapBlock.split("\n")).map(b => b.slice(1).map(mapping => mapping.split(" ").map(Number)));
    let maps: Array<Record<string, number>> = mappings.map(buildMap)

    return Math.min(...seeds.map(s => getLocationFromSeed(s, maps)))
}

export function day5(input: string) {
    const lines = input.split("\n")
    const seeds = lines[0].split(":")[1].trimStart().split(" ").map(Number)
    const mappings = input.split("\n\n").slice(1).map((mapBlock) => mapBlock.split("\n")).map(b => b.slice(1).map(mapping => mapping.split(" ").map(Number)))
    for (let map of mappings) {
        for (let i = 0; i < seeds.length; i++) {
            const seed = seeds[i];
            for (const [dest, source, len] of map) {
                if (seed >= source && seed < source + len) {
                    seeds[i] = seeds[i] - source + dest;
                    break;
                }
            }
        }
    }
    return Math.min(...seeds)
}

export function day5part2(input: string) {
    const lines = input.split("\n")
    let baseSeeds: number[] = lines[0].split(":")[1].trimStart().split(" ").map(Number)
    let seeds: number[][] = [];
    for (let i = 0; i < baseSeeds.length; i += 2) {
        seeds.push([baseSeeds[i], baseSeeds[i] + baseSeeds[i + 1] - 1]);

    }
    const maps = input.split("\n\n").slice(1).map((mapBlock) => mapBlock.split("\n")).map(b => b.slice(1).map(mapping => mapping.split(" ").map(Number)))
    for (let lines of maps) {
        const movedSeeds = [];
        for (const [dest, source, len] of lines as any) {
            const unmovedSeeds = [];
            while (seeds.length) {
                const [start, end]: number[] = seeds.shift() as number[];
                if (start >= source && start < source + len) {
                    if (end < source + len) {
                        movedSeeds.push([start - source + dest, end - source + dest]);
                    } else {
                        movedSeeds.push([start - source + dest, len - 1 + dest]);
                        unmovedSeeds.push([source + len, end]);
                    }
                } else if (end >= source && end < source + len) {
                    movedSeeds.push([dest, end - source + dest]);
                    unmovedSeeds.push([start, source - 1]);
                } else {
                    unmovedSeeds.push([start, end]);
                }
            }
            seeds = unmovedSeeds;
        }
        seeds.push(...movedSeeds);
    }
    return Math.min(...seeds.flat());
}