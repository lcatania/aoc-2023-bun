interface Coordinate {
    x: number,
    y: number,
    z: number,
}

interface Brick {
    start: Coordinate,
    end: Coordinate,
    supported_by: number[],
    supporting: number[]
}

export function day22(input: string): number {
    return [parseCoordinates(input)].map(fallIntoPlace).map(determineDisintegratableBlocks)[0]
}

export function day22part2(input: string): number {
    return [parseCoordinates(input)].map(fallIntoPlace).map(determineMostFalling)[0]
}

function determineMostFalling(bricks: Brick[]) {
    let total = 0
    for (let brick of bricks) {
        total += getBricksFalling(bricks, brick)
    }
    return total
}

function getBricksFalling(bricks: Brick[], brick: Brick) {
    const queue = brick.supporting.filter(s => bricks[s]!.supported_by.length === 1)
    let counter = 0
    const fallen = new Set<number>()
    while (queue.length) {
        const i = queue.shift()!
        const b = bricks[i]
        if (!b) throw new Error("Invalid bricks")
        fallen.add(i)
        const new_bricks = b.supporting.filter(s => bricks[s]!.supported_by.filter(n => !fallen.has(n)).length === 0)
        for (let nb of new_bricks) {
            if (!queue.includes(nb)) queue.push(nb)
        }
        counter++
    }
    return counter
}

function determineDisintegratableBlocks(bricks: Brick[]) {
    let counter = 0
    const canbedestroyed = new Set<number>()
    const cannotbedestroyed = new Set<number>()
    for (let brick of bricks) {
        if (brick.supporting.length) {
            const doesntfullysupport = brick.supporting.every(s => bricks[s]!.supported_by.length >= 2)
            if (doesntfullysupport) canbedestroyed.add(bricks.indexOf(brick))
            else cannotbedestroyed.add(bricks.indexOf(brick))
        } else {
            canbedestroyed.add(bricks.indexOf(brick))
        }
    }
    for (let b of canbedestroyed.values()) {
        if (!cannotbedestroyed.has(b)) counter += 1
    }
    return counter
}

function parseCoordinates(input: string): Brick[] {
    return input.split("\n").map(l => l.split("~")).map(b => {
        const [x1, y1, z1] = b[0].split(",").map(Number)
        const [x2, y2, z2] = b[1].split(",").map(Number)

        return {
            start: { x: x1, y: y1, z: z1 },
            end: { x: x2, y: y2, z: z2 },
            supported_by: [],
            supporting: []
        }
    })
}

function fallIntoPlace(bricks: Brick[]) {
    let fallen = true
    let register_supporting = false
    while (fallen) {
        fallen = false
        for (let brick of bricks) {
            if (brick.start.z === 1) continue;
            const supported_by = bricks.filter(b => checkIfDirectlyAbove(brick, b))
            if (!supported_by.length) {
                brick.start.z -= 1
                brick.end.z -= 1
                fallen = true
            }
            if (register_supporting) {
                brick.supported_by = supported_by.map(b => {
                    b.supporting.push(bricks.indexOf(brick))
                    return bricks.indexOf(b)
                })
            }
        }

        if (!fallen && !register_supporting) {
            fallen = true
            register_supporting = true
        } else if (register_supporting) {
            fallen = false
        }
    }

    return bricks
}

function checkIfDirectlyAbove(above: Brick, below: Brick) {
    return (above.start.z - 1 === below.end.z) &&
        ((above.start.x <= below.end.x && below.end.x <= above.end.x) || (above.end.x >= below.start.x && above.end.x <= below.end.x)) &&
        ((above.start.y <= below.end.y && below.end.y <= above.end.y) || (above.end.y >= below.start.y && above.end.y <= below.end.y))
}
