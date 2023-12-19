import { PriorityQueue } from 'js-sdsl';

type Item = {
    consecutive: number;
    dx: number;
    dy: number;
    totalHeatLoss: number;
    x: number;
    y: number;
}

function getMoves(props: { consecutive: number, dy: number, dx: number }) {
    const moves = [
        { newConsecutive: 1, newDx: props.dy, newDy: props.dx },
        { newConsecutive: 1, newDx: -props.dy, newDy: -props.dx },
    ];
    if (props.consecutive < 3) {
        moves.push({ newConsecutive: props.consecutive + 1, newDx: props.dx, newDy: props.dy });
    }
    return moves;
}

function getMovesPart2(props: { consecutive: number, dy: number, dx: number }) {
    const moves = [];
    if (props.consecutive >= 4) {
      moves.push(
        { newConsecutive: 1, newDx: props.dy, newDy: props.dx },
        { newConsecutive: 1, newDx: -props.dy, newDy: -props.dx }
      );
    }
    if (props.consecutive < 10) {
      moves.push({ newConsecutive: props.consecutive + 1, newDx: props.dx, newDy: props.dy });
    }
    return moves;
  }

export function day17(input: string) {
    const grid = input.split('\n').map((row) => Array.from(row, Number));

    const yTarget = grid.length - 1;
    const xTarget = grid[yTarget].length - 1;

    const q = new PriorityQueue(
        [
            {
                consecutive: 0,
                dx: 1,
                dy: 0,
                totalHeatLoss: 0,
                x: 0,
                y: 0,
            },
            {
                consecutive: 0,
                dx: 0,
                dy: 1,
                totalHeatLoss: 0,
                x: 0,
                y: 0,
            },
        ],
        (a, b) => a.totalHeatLoss - b.totalHeatLoss
    );

    const minHeatLoss = new Map();

    while (q.length > 0) {
        const { consecutive, dx, dy, totalHeatLoss, x, y } = q.pop() as Item;

        const key = `${x},${y}:${dx},${dy}:${consecutive}`;
        const min = minHeatLoss.get(key) ?? Infinity;
        if (totalHeatLoss >= min) {
            continue;
        }
        minHeatLoss.set(key, totalHeatLoss);

        if (x === xTarget && y === yTarget) {
            return totalHeatLoss;
        }

        const moves = getMoves({ consecutive, dx, dy });
        for (const { newDx, newDy, newConsecutive } of moves) {
            const newX = x + newDx;
            const newY = y + newDy;
            const heatLoss = grid[newY]?.[newX];
            if (heatLoss) {
                q.push({
                    consecutive: newConsecutive,
                    dx: newDx,
                    dy: newDy,
                    totalHeatLoss: totalHeatLoss + heatLoss,
                    x: newX,
                    y: newY,
                });
            }
        }
    }
}

export function day17part2(input:string){
    const grid = input.split('\n').map((row) => Array.from(row, Number));
    
    
    
    const yTarget = grid.length - 1;
    const xTarget = grid[yTarget].length - 1;
    
    const q = new PriorityQueue(
      [
        {
          consecutive: 0,
          dx: 1,
          dy: 0,
          totalHeatLoss: 0,
          x: 0,
          y: 0,
        },
        {
          consecutive: 0,
          dx: 0,
          dy: 1,
          totalHeatLoss: 0,
          x: 0,
          y: 0,
        },
      ],
      (a, b) => a.totalHeatLoss - b.totalHeatLoss
    );
    
    const minHeatLoss = new Map();
    
    while (q.length > 0) {
      const { consecutive, dx, dy, totalHeatLoss, x, y } = q.pop() as Item;
    
      const key = `${x},${y}:${dx},${dy}:${consecutive}`;
      const min = minHeatLoss.get(key) ?? Infinity;
      if (totalHeatLoss >= min) {
        continue;
      }
      minHeatLoss.set(key, totalHeatLoss);
    
      if (x === xTarget && y === yTarget && consecutive >= 4) {
        return totalHeatLoss;
      }
    
      const moves = getMovesPart2({ consecutive, dx, dy });
      for (const { newDx, newDy, newConsecutive } of moves) {
        const newX = x + newDx;
        const newY = y + newDy;
        const heatLoss = grid[newY]?.[newX];
        if (heatLoss) {
          q.push({
            consecutive: newConsecutive,
            dx: newDx,
            dy: newDy,
            totalHeatLoss: totalHeatLoss + heatLoss,
            x: newX,
            y: newY,
          });
        }
      }
    }
}