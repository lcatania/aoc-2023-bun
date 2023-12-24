import { init } from 'z3-solver';


export interface Vector2 {
    x: number;
    y: number;
}

export interface Ray2 extends Vector2 {
    vx: number
    vy: number
}

// I caved and asked ChatGPT for a ray intersection function...
function findRayIntersection(ray1: Ray2, ray2: Ray2): Vector2 | null {
    const determinant = ray1.vx * ray2.vy - ray1.vy * ray2.vx

    if (determinant === 0) return null // If determinant is 0, the rays are parallel and do not intersect

    const t1 = ((ray2.x - ray1.x) * ray2.vy - (ray2.y - ray1.y) * ray2.vx) / determinant
    const t2 = ((ray2.x - ray1.x) * ray1.vy - (ray2.y - ray1.y) * ray1.vx) / determinant

    // Check if intersection point is within the rays
    if (t1 >= 0 && t2 >= 0) {
        return {
            x: ray1.x + t1 * ray1.vx,
            y: ray1.y + t1 * ray1.vy,
        }
    }

    return null // rays do not intersect
}

function getCombinations<T>(items: T[]) {
    const result: T[][] = []
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            result.push([items[i], items[j]])
        }
    }
    return result
}
export function day24(input: string) {
    let min = 200_000_000_000_000, max = 400_000_000_000_000

    const stones = input
        .trim()
        .split(/\r?\n/)
        .filter(x => x)
        .map(line => line.split("@"))
        .map(([position, velocity]) => [position.split(","), velocity.split(",")])
        .map(([positions, velocities]) => [positions.map(n => parseInt(n)), velocities.map(n => parseInt(n))])
        .map(([[x, y, z], [vx, vy, vz]]) => ({ x, y, z, vx, vy, vz }))
    const result = getCombinations(stones)
        .map(([stone1, stone2]) => findRayIntersection(stone1, stone2))
        .filter(i => !!i)
        .map(i => i as Vector2) // Tell TypeScript it's okay
        .filter(i => i.x >= min && i.x <= max && i.y >= min && i.y <= max)
        .length

    return result;
}


export async function day24part2(input: string) {
    const stones = input
        .trim()
        .split(/\r?\n/)
        .filter(x => x)
        .map(line => line.split("@"))
        .map(([position, velocity]) => [position.split(","), velocity.split(",")])
        .map(([positions, velocities]) => [positions.map(n => parseInt(n)), velocities.map(n => parseInt(n))])
        .map(([[x, y, z], [vx, vy, vz]]) => ({ x, y, z, vx, vy, vz }))

    const { Context, em } = await init();
    const { Solver, Int } = Context('main');

    const X = Int.const('X');
    const Y = Int.const('Y');
    const Z = Int.const('Z');

    const VX = Int.const('VX');
    const VY = Int.const('VY');
    const VZ = Int.const('VZ');

    const solver = new Solver();

    for (let i = 0; i < 3; i++) {
        const t = Int.const(`t${i}`);

        const x = Int.val(stones[i].x);
        const vx = Int.val(stones[i].vx);

        const y = Int.val(stones[i].y);
        const vy = Int.val(stones[i].vy);

        const z = Int.val(stones[i].z);
        const vz = Int.val(stones[i].vz);

        solver.add(
            t.gt(0),
            X.add(VX.mul(t)).eq(x.add(vx.mul(t))),
            Y.add(VY.mul(t)).eq(y.add(vy.mul(t))),
            Z.add(VZ.mul(t)).eq(z.add(vz.mul(t))),
        );
    }

    if (await solver.check() === 'sat') {
        const model = solver.model();

        const [
            x,
            y,
            z,
        ] = [
                Number(model.eval(X).toString()),
                Number(model.eval(Y).toString()),
                Number(model.eval(Z).toString()),
            ];

        em.PThread.terminateAllThreads();
        return x + y + z;
    }

    return undefined;
}