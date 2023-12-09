class Node {
    data: string;
    left: string;
    right: string;

    constructor(data: string) {
        this.data = data;
        this.left = '';
        this.right = '';
    }
}

function gcd(x?: number | number[], y?: number): number {
    return Array.isArray(x) ? x.reduce((a, n) => gcdOverTwo(a, n), 1) : gcdOverTwo(x, y);
}

function gcdOverTwo(x = 0, y = 0): number {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        const t = y;
        y = x % y
        x = t
    }
    return x;
}

function lcmOverTwo(x?: number, y?: number): number {
    return !x || !y ? 0 : Math.abs((x * y) / gcd(x, y));
}

function lcm(x?: number | number[], y?: number): number {
    return Array.isArray(x) ? x.reduce((a, n) => lcmOverTwo(a, n), 1) : lcmOverTwo(x, y);
}

function parseGraph(lineInput: string) {
    const lines = lineInput.split('\n');
    const nodes: { [key: string]: Node } = {}
    lines.forEach((line) => {
        const newNode = new Node(line.split("=")[0].trim())
        const [left, right] = line.split("=")[1].trim().slice(1).slice(0, -1).split(',')
        newNode.left = left.trim()
        newNode.right = right.trim()
        nodes[line.split("=")[0].trim()] = newNode
    })
    return nodes;
}

export function day8(input: string) {
    const [direction, lines] = input.split('\n\n');
    const walkDirection = direction.split("");
    const nodes = parseGraph(lines);
    let walkIndex = 0;
    let currentNode = nodes["AAA"];
    let counter = 0;
    while (currentNode.data !== 'ZZZ') {
        if (walkDirection[walkIndex] === 'L')
            currentNode = nodes[currentNode.left];
        else
            currentNode = nodes[currentNode.right];

        if (walkIndex === walkDirection.length - 1)
            walkIndex = 0
        else
            walkIndex += 1
        counter += 1;
    }

    return counter;
}

export function day8part2(input: string) {
    const [direction, lines] = input.split('\n\n');
    const walkDirection = direction.split("");
    const nodes = parseGraph(lines);
    const endingWithA = Object.keys(nodes).filter(k => k.endsWith('A'));
    const lcmCounter = []
    for (let index = 0; index < endingWithA.length; index++) {
        let currentNode = endingWithA[index];
        let counter = 0;
        let walkIndex = 0;

        while (!currentNode.endsWith('Z')) {
            if (walkDirection[walkIndex] === 'L')
                currentNode = nodes[nodes[currentNode].left].data;
            else
                currentNode = nodes[nodes[currentNode].right].data;
            if (walkIndex === walkDirection.length - 1)
                walkIndex = 0
            else
                walkIndex += 1
            counter += 1;
        }
        lcmCounter.push(counter)
    }
    return lcm(lcmCounter)
}
