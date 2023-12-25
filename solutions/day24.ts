type Point3D = {
    x: number;
    y: number;
    z: number;
};

type Vector3D = {
    x: number;
    y: number;
    z: number;
};

type PointAndVector3D = {
    point: Point3D;
    vector: Vector3D;
};

type Point = {
    x: number;
    y: number;
};

type Vector = {
    x: number;
    y: number;
};

type PointAndVector = {
    point: Point;
    vector: Vector;
};

type IntersectionResult =
    | {
        type: 'colinear' | 'parallel' | 'non-intersecting';
    }
    | { type: 'intersecting'; point: Point };

function parseInputPart1(input: string): PointAndVector3D[] {
    return input.split("\n").map((line) => {
        // 12, 31, 28 @ -1, -2, -1
        const regex = /(\d+),\s+(\d+),\s+(\d+)\s+@\s+(-?\d+),\s+(-?\d+),\s+(-?\d+)/;
        const match = line.match(regex);
        if (!match) throw 'Could not parse line: ' + line;

        // For part 1 we are only using x + y
        return {
            point: {
                x: parseInt(match[1]),
                y: parseInt(match[2]),
                z: parseInt(match[3]),
            },
            vector: {
                x: parseInt(match[4]),
                y: parseInt(match[5]),
                z: parseInt(match[6]),
            },
        };
    });
};

function intersect<T>(one: T[], two: T[]) { return one.filter((x) => two.includes(x)) }

function crossProduct(v: Point, w: Point): number {
    return v.x * w.y - v.y * w.x;

}

function subtractPoints(v: Point, w: Point): Point {
    return ({
        x: v.x - w.x,
        y: v.y - w.y,
    });
}

function addPoints(v: Point, w: Point): Point {
    return ({
        x: v.x + w.x,
        y: v.y + w.y,
    })
};

// https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect/565282#565282
function findIntersection(
    p: PointAndVector,
    q: PointAndVector,
): IntersectionResult {

    const rs = crossProduct(p.vector, q.vector);
    const qpr = crossProduct(subtractPoints(q.point, p.point), p.vector);

    if (rs === 0 && qpr === 0) {
        return { type: 'colinear' };
    }
    if (rs === 0 && qpr !== 0) {
        return { type: 'parallel' };
    }
    if (rs !== 0) {
        const t =
            crossProduct(subtractPoints(q.point, p.point), q.vector) /
            crossProduct(p.vector, q.vector);
        const u =
            crossProduct(subtractPoints(q.point, p.point), p.vector) /
            crossProduct(p.vector, q.vector);

        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            const tr = { x: p.vector.x * t, y: p.vector.y * t };

            return { type: 'intersecting', point: addPoints(p.point, tr) };
        }
    }
    return { type: 'non-intersecting' };
};

function findRockVelocity(
    hailstones: PointAndVector3D[],
): { vx: number; vy: number; vz: number } {
    let xVelocities = undefined;
    let yVelocities = undefined;
    let zVelocities = undefined;

    // Determine rock velocity by finding pairs of hailstones that have the same velocity
    // along a given axis. The relative velocity of the rock to the hailstone in this axis
    // must be a divisor of the point difference of those hailstones. This will give us several
    // possible values, but if we apply this to all the pairs we can hopefully narrow down to
    // a single value.
    // This only works because the input set has these duplicates in!
    for (let h1Index = 0; h1Index < hailstones.length; h1Index++) {
        const h1 = hailstones[h1Index];
        for (let h2Index = h1Index + 1; h2Index < hailstones.length; h2Index++) {
            const h2 = hailstones[h2Index];

            if (h1.vector.x === h2.vector.x) {
                const velocityCandidates = new Set<number>();
                for (let vTest = -500; vTest < 500; vTest++) {
                    if (Math.abs(h2.point.x - h1.point.x) % (vTest - h1.vector.x) == 0) {
                        velocityCandidates.add(vTest);
                    }
                }
                xVelocities =
                    xVelocities !== undefined
                        ? new Set<number>(
                            intersect([...xVelocities], [...velocityCandidates]),
                        )
                        : new Set<number>(velocityCandidates);
            }

            if (h1.vector.y === h2.vector.y) {
                const velocityCandidates = new Set<number>();
                for (let vTest = -500; vTest < 500; vTest++) {
                    if (Math.abs(h2.point.y - h1.point.y) % (vTest - h1.vector.y) == 0) {
                        velocityCandidates.add(vTest);
                    }
                }
                yVelocities =
                    yVelocities !== undefined
                        ? new Set<number>(
                            intersect([...yVelocities], [...velocityCandidates]),
                        )
                        : new Set<number>(velocityCandidates);
            }

            if (h1.vector.z === h2.vector.z) {
                const velocityCandidates = new Set<number>();
                for (let vTest = -500; vTest < 500; vTest++) {
                    if (Math.abs(h2.point.z - h1.point.z) % (vTest - h1.vector.z) == 0) {
                        velocityCandidates.add(vTest);
                    }
                }
                zVelocities =
                    zVelocities !== undefined
                        ? new Set<number>(
                            intersect([...zVelocities], [...velocityCandidates]),
                        )
                        : new Set<number>(velocityCandidates);
            }
        }
    }

    if (xVelocities!.size > 1 || yVelocities!.size > 1 || zVelocities!.size > 1)
        throw 'Could not determine velocities';

    return {
        vx: [...xVelocities!.values()][0],
        vy: [...yVelocities!.values()][0],
        vz: [...zVelocities!.values()][0],
    };
};

export function day24part2(input: string, boundMin: number, boundMax: number) {
    const hailstones = parseInputPart1(input);

    const { vx, vy, vz } = findRockVelocity(hailstones);

    const scale = 100000000000000;
    const h1 = hailstones[0];

    h1.vector.x = (h1.vector.x - vx) * scale;
    h1.vector.y = (h1.vector.y - vy) * scale;
    h1.vector.z = (h1.vector.z - vz) * scale;

    const h2 = hailstones[1];

    // Adjust velocity so it is relative to the rock
    h2.vector.x = (h2.vector.x - vx) * scale;
    h2.vector.y = (h2.vector.y - vy) * scale;
    h2.vector.z = (h2.vector.z - vz) * scale;

    // Find an intersection of these two new "lines"
    let result = findIntersection(h1, h2);

    if (result.type !== 'intersecting') throw 'Could not find interesecting line';

    const x = Math.round(result.point!.x);
    const y = Math.round(result.point!.y);
    h1.vector.x = h1.vector.z;
    h1.point.x = h1.point.z;
    h2.vector.x = h2.vector.z;
    h2.point.x = h2.point.z;

    result = findIntersection(h1, h2);

    if (result.type !== 'intersecting') throw 'Could not find interesecting line';

    const z = Math.round(result.point!.x);

    return x + y + z;
};

export function day24(input: string, boundMin: number, boundMax: number) {
    const hailstones = parseInputPart1(input);

    const t = 1000000000000000;
    for (const hailstone of hailstones) {
        hailstone.vector.x *= t;
        hailstone.vector.y *= t;
    }

    let intersecting = 0;

    for (let h1 = 0; h1 < hailstones.length; h1++) {
        for (let h2 = h1 + 1; h2 < hailstones.length; h2++) {
            const hailstone1 = hailstones[h1];
            const hailstone2 = hailstones[h2];

            const result = findIntersection(hailstone1, hailstone2);
            if (
                result.type === 'intersecting' &&
                result.point!.x >= boundMin &&
                result.point!.x <= boundMax &&
                result.point!.y >= boundMin &&
                result.point!.y <= boundMax
            ) {
                intersecting++;
            }
        }
    }

    return intersecting
}