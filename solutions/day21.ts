const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

function safeMod(a: number, b: number) {
    return a < 0 ? (b - (-a % b)) % b : a % b;
}


export function day21(input: string) {
    let positions = new Set<string>();
    const map = input.split('\n').map((line, i) =>
        line.split('').map((char, j) => {
            if (char === 'S') {
                positions.add([i, j].join());
            }
            return +(char !== '#');
        })
    );
    for (let i = 0; i < 64; i++) {
        const nextPositions = new Set<string>();
        for (const p of positions) {
            const [r, c] = p.split(',').map(Number);
            for (const [dr, dc] of dirs) {
                if (map[r + dr]?.[c + dc]) {
                    nextPositions.add([r + dr, c + dc].join());
                }
            }
        }
        positions = nextPositions;
    }
    return positions.size
}

export function day21part2(input: string) {
    let positions = new Set<string>();
    const map = input.split('\n').map((line, i) =>
        line.split('').map((char, j) => {
            if (char === 'S') {
                positions.add([i, j].join());
            }
            return +(char !== '#');
        })
    );
    const size = map.length;

    const target = 26501365;
    const counts: number[] = [];
    for (let i = 0; i < 16 * size + (target % size); i++) {
        const nextPositions = new Set<string>();
        for (const p of positions) {
            const [r, c] = p.split(',').map(Number);
            for (const [dr, dc] of dirs) {
                const r2 = r + dr;
                const c2 = c + dc;
                if (map[safeMod(r2, size)][safeMod(c2, size)]) {
                    nextPositions.add([r2, c2].join());
                }
            }
        }

        positions = nextPositions;
        if ((i + 1) % size === target % size) {
            if (
                counts.length >= 3 &&
                positions.size - 2 * (counts.at(-1) ?? 0) + (counts.at(-2) ?? 0) ===
                (counts.at(-1) ?? 0) - 2 * (counts.at(-2) ?? 0) + (counts.at(-3) ?? 0)
            ) {
                // converged
                break;
            }
            counts.push(positions.size);
        }
    }

    const d2 = (counts.at(-1) ?? 0) - 2 * (counts.at(-2) ?? 0) + (counts.at(-3) ?? 0);

    for (let i = counts.length * size + (target % size); i <= target; i += size) {
        counts.push(d2 + 2 * (counts.at(-1) ?? 0) - (counts.at(-2) ?? 0));
    }
    return counts.at(-1);
}