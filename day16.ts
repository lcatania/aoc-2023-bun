
const D = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}

const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
]

function addVect(a: number[], b: number[]) {
    return a.map((v, c) => v + b[c]);
}
function key(v: { pos: number[], dir: number }) {
    return [...v.pos, v.dir].join('_');
}

function getMoves(dir: number, v: string) {
    switch (v) {
        case '.': return [dir];
        case '-': return [D.LEFT, D.RIGHT].includes(dir) ? [dir] : [D.LEFT, D.RIGHT];
        case '|': return [D.LEFT, D.RIGHT].includes(dir) ? [D.UP, D.DOWN] : [dir];
        case '/': switch (dir) {
            case D.RIGHT: return [D.UP];
            case D.LEFT: return [D.DOWN];
            case D.UP: return [D.RIGHT];
            case D.DOWN: return [D.LEFT];
        }
        case '\\': switch (dir) {
            case D.RIGHT: return [D.DOWN];
            case D.LEFT: return [D.UP];
            case D.UP: return [D.LEFT];
            case D.DOWN: return [D.RIGHT];
        }
    }
}



function run(map: string[][], startPos: number[], startDir: number) {
    let stack = [{ pos: startPos, dir: startDir }];
    let energized: { [key: string]: number } = {}
    let seen: { [key: string]: number } = {};
    let cur: { pos: number[], dir: number } | undefined;
    while (cur = stack.pop()) {

        let k = key(cur);

        if (seen[k] !== undefined) continue;

        if (!map[cur.pos[1]] || !map[cur.pos[1]][cur.pos[0]]) continue; // out of map

        seen[k] = 1;
        energized[cur.pos.join()] = 1;
        getMoves(cur.dir, map[cur.pos[1]][cur.pos[0]])?.forEach(dir => {
            if (cur)
                stack.push({
                    dir: dir,
                    pos: addVect(cur.pos, dirs[dir]),
                })
        })


    }

    return Object.keys(energized).length;
}

export function day16(input: string) {
    let map = input.split("\n").map(line => line.split(''));
    return run(map, [0, 0], D.RIGHT);
}

export function day16part2(input: string) {
    let map = input.split("\n").map(line => line.split(''));
    let max = 0;
    for (let i = 0; i < map.length; i++) {
        max = Math.max(max,
            run(map, [i, 0], D.DOWN),
            run(map, [i, map.length - 1], D.UP),
            run(map, [0, i], D.RIGHT),
            run(map, [map.length - 1, i], D.LEFT),
        )
    }
    return max;
}