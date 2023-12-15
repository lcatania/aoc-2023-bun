function convertColumnsToRows(input: string) {
    const inputArr = input.split('\n');
    const numRows = inputArr.length;
    const numCols = inputArr[0].length;

    let result = '';

    for (let col = 0; col < numCols; col++) {
        let newRow = '';
        for (let row = 0; row < numRows; row++) {
            newRow += inputArr[row][col];
        }
        result += newRow + '\n';
    }

    return result.trim();
}

function convertRowsToColumns(input: string) {
    const inputArr = input.split('\n');
    const numRows = inputArr.length;
    const numCols = inputArr[0].length;

    let result = '';

    for (let row = 0; row < numRows; row++) {
        let newRow = '';
        for (let col = 0; col < numCols; col++) {
            newRow += inputArr[col][row];
        }
        result += newRow + '\n';
    }

    return result.trim();
}

function tiltNorth(input: string) {
    let newInput = convertColumnsToRows(input);

    let inputArr = newInput.split('\n');
    let movedArr = [];

    for (let i = 0; i < inputArr.length; i++) {
        let element = inputArr[i];
        let elementArr = element.split('');

        for (let j = 0; j < elementArr.length; j++) {
            let currentChar = elementArr[j];
            if (currentChar === 'O') {
                let k = j - 1;
                while (k >= 0 && elementArr[k] === '.') {
                    elementArr[k] = 'O';
                    elementArr[k + 1] = '.';
                    k--;
                }
            }
            if (currentChar === '.') {
                let k = j - 1;
                while (k >= 0 && elementArr[k] === '.') {
                    elementArr[k] = '0';
                    elementArr[k] = '.';
                    k--;
                }
            }
        }
        movedArr.push(elementArr.join(''));
    }

    let finalResult = movedArr.join('\n');
    let finalfinal = convertRowsToColumns(finalResult);
    return finalfinal;
}

function calculateLoad(input: string) {
    let inputArr = input.split('\n');
    let numRows = inputArr.length;
    let numCols = inputArr[0].length;

    let totalLoad = 0;

    for (let row = 0; row < numRows; row++) {
        let element = inputArr[row];
        let elementArr = element.split('');
        let load = 0;

        for (let col = 0; col < numCols; col++) {
            let currentChar = elementArr[col];
            if (currentChar === 'O') {
                load += numRows - row;
            }
        }
        totalLoad += load;
    }
    return totalLoad;
}

function tilt(grid: string[][], row: number, col: number) {
    const numRows = grid.length;
    const numCols = grid[0].length;

    const stepRow = row !== 0 ? -row : 1;
    const stepCol = col !== 0 ? -col : 1;

    for (let rows = row === 1 ? numRows - 1 : 0; 0 <= rows && rows < numRows; rows += stepRow) { // row means row , col means col
        for (let cols = col === 1 ? numCols - 1 : 0; 0 <= cols && cols < numCols; cols += stepCol) {
            if (grid[rows][cols] === 'O') {
                tiltCell(grid, rows, cols, row, col);
            }
        }
    }

    return grid;
};

function tiltCell(grid: string[][], startRow: number, startCol: number, row: number, col: number) {
    let [x, y] = [startRow, startCol];
    while (
        0 <= x + row &&
        x + row < grid.length &&
        0 <= y + col &&
        y + col < grid[x + row].length &&
        grid[x + row][y + col] === '.'
    ) {
        x += row;
        y += col;
    }
    [grid[startRow][startCol], grid[x][y]] = ['.', 'O'];
};


function calculateResult(grid: string[][]) {
    return grid.reduce((acc, rows, rowIndex) =>
        acc + rows.reduce((rowSum, cell, colIndex) =>
            rowSum + (cell === 'O' ? grid.length - rowIndex : 0), 0), 0);
};


export function day14(input: string) {
    let movedInput = tiltNorth(input);
    let totalLoad = calculateLoad(movedInput);
    return totalLoad;
}

export function day14part2(input: string) {
    const totalCycles = 1e9;
    let grid = input.split('\n').map((line) => line.split(''));
    const previousStates = new Map();
    for (let cycles = 0; cycles < totalCycles; cycles++) {
        const gridState = grid.map((line) => line.join('')).join('\n');

        if (previousStates.has(gridState)) {
            cycles += Math.floor((totalCycles - cycles) / (cycles - previousStates.get(gridState))) *
                (cycles - previousStates.get(gridState));
        }

        previousStates.set(gridState, cycles);
        grid = tilt(tilt(tilt(tilt(grid, -1, 0), 0, -1), 1, 0), 0, 1);
    }

    const result = calculateResult(grid);
    return result;
}