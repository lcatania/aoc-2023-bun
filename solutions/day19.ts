type Part = { [key: string]: number };

type WorkflowRule = {
    input?: string;
    compareTo?: number;
    comparer?: "lesser" | "greater";
    action: "R" | "A" | string

}

type Workflow = {
    [key: string]: WorkflowRule[]
}


function parseInput(input: string) {
    const [workflows, data] = input.split("\n\n");
    const parsedWorkflows = workflows.split("\n").reduce((prev, rawWorkflow) => {
        const [name, rules] = rawWorkflow.split("{");
        prev[name] = rules.split(",").map(rule => {
            if (/(>|<)/.test(rule)) {
                const splittedRules = rule.split(/(>|<)/);
                const [compareTo, target] = splittedRules[2].split(":")
                return {
                    input: splittedRules[0],
                    compareTo: +compareTo,
                    comparer: splittedRules[1] === ">" ? 'greater' : 'lesser',
                    action: target
                }
            }
            return { action: rule.slice(0, -1) }
        })
        return prev
    }, {} as Workflow)
    const parsedData = data.split("\n").map((l) => {
        return l.slice(1, -1).split(",").reduce((prev, prop) => {
            const [name, value] = prop.split("=")
            prev[name] = +value
            return prev;
        }, { x: 0, m: 0, a: 0, s: 0 } as Part);
    })
    return { data: parsedData, workflows: parsedWorkflows }
}

function evaluteWorkflow(data: Part, rules: WorkflowRule[]): string {
    for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        if (!rule.comparer)
            return rule.action;
        if (rule.input && rule.compareTo) {
            switch (rule.comparer) {
                case "greater":
                    if (data[rule.input] > rule.compareTo)
                        return rule.action;
                    break;
                case "lesser":
                    if (data[rule.input] < rule.compareTo)
                        return rule.action;
                    break;
            }
        }
    }
    return "R"
}

export function day19(input: string) {
    const parsedInput = parseInput(input);
    return parsedInput.data.filter((data) => {
        let result = "in"
        while (result !== "A" && result !== "R") {
            result = evaluteWorkflow(data, parsedInput.workflows[result])
        }
        return result === 'A';
    }).map((accepted) => Object.values(accepted).reduce((a, b) => a + b)).reduce((a, b) => a + b)
}

class RangePart2 {
    min;
    max;

    constructor(min?: number, max?: number) {
        this.min = min || 1;
        this.max = max || 4000;
    }

    newMin(val: number) {
        if (val > this.min) {
            this.min = val;
        }
    }

    newMax(val: number) {
        if (val < this.max) {
            this.max = val;
        }
    }

    getCount() {
        if (this.max < this.min) {
            return 0;
        }
        return this.max - this.min + 1;
    }
}

class PossibilitiesPart2 {
    xRange;
    mRange;
    aRange;
    sRange;

    constructor(xRange?: RangePart2, mRange?: RangePart2, aRange?: RangePart2, sRange?: RangePart2) {
        this.xRange = xRange || new RangePart2();
        this.mRange = mRange || new RangePart2();
        this.aRange = aRange || new RangePart2();
        this.sRange = sRange || new RangePart2();
    }

    getComboCount() {
        const xCount = this.xRange.getCount();
        const aCount = this.aRange.getCount();
        const mCount = this.mRange.getCount();
        const sCount = this.sRange.getCount();

        return xCount * mCount * aCount * sCount;
    }

    copy() {
        const newXRange = new RangePart2(this.xRange.min, this.xRange.max);
        const newMRange = new RangePart2(this.mRange.min, this.mRange.max);
        const newARange = new RangePart2(this.aRange.min, this.aRange.max);
        const newSRange = new RangePart2(this.sRange.min, this.sRange.max);
        return new PossibilitiesPart2(newXRange, newMRange, newARange, newSRange);
    }
}

class WorkflowPart2 {
    label;
    sequence;

    constructor(workflowString: string) {
        this.label = workflowString.split("{")[0];
        const parsed = workflowString
            .replace(this.label, "")
            .replace("{", "")
            .replace("}", "");
        this.sequence = parsed.split(",").map(rule => {
            if (/(>|<)/.test(rule)) {
                const splittedRules = rule.split(/(>|<)/);
                const [compareTo, target] = splittedRules[2].split(":")
                return {
                    input: splittedRules[0],
                    compareTo: +compareTo,
                    comparer: splittedRules[1] === ">" ? 'greater' : 'lesser',
                    action: target
                }
            }
            return { action: rule }
        });
    }

    getTargets(possibilities: PossibilitiesPart2) {
        const newTargets = [];
        const seqPossibilities = possibilities.copy();
        for (let seq = 0; seq < this.sequence.length; seq++) {
            const currentPossibilities = seqPossibilities.copy();

            const rule = this.sequence[seq]

            if (!rule.comparer) {
                newTargets.push({
                    label: rule.action,
                    possibilities: currentPossibilities,
                });
                continue;
            }

            if (rule.comparer === "greater") {
                switch (rule.input) {
                    case "x":
                        currentPossibilities.xRange.newMin(rule.compareTo + 1);
                        seqPossibilities.xRange.newMax(rule.compareTo);
                        break;
                    case "m":
                        currentPossibilities.mRange.newMin(rule.compareTo + 1);
                        seqPossibilities.mRange.newMax(rule.compareTo);
                        break;

                    case "a":
                        currentPossibilities.aRange.newMin(rule.compareTo + 1);
                        seqPossibilities.aRange.newMax(rule.compareTo);
                        break;

                    case "s":
                        currentPossibilities.sRange.newMin(rule.compareTo + 1);
                        seqPossibilities.sRange.newMax(rule.compareTo);
                        break;
                }
            }
            if (rule.comparer === "lesser") {
                switch (rule.input) {
                    case "x":
                        currentPossibilities.xRange.newMax(rule.compareTo - 1);
                        seqPossibilities.xRange.newMin(rule.compareTo);
                        break;

                    case "m":
                        currentPossibilities.mRange.newMax(rule.compareTo - 1);
                        seqPossibilities.mRange.newMin(rule.compareTo);
                        break;

                    case "a":
                        currentPossibilities.aRange.newMax(rule.compareTo - 1);
                        seqPossibilities.aRange.newMin(rule.compareTo);
                        break;

                    case "s":
                        currentPossibilities.sRange.newMax(rule.compareTo - 1);
                        seqPossibilities.sRange.newMin(rule.compareTo);
                        break;
                }
            }
            newTargets.push({
                label: rule.action,
                possibilities: currentPossibilities,
            });
        }

        return newTargets;
    }
}

export function day19part2(input: string) {
    const [rawWorkflows, data] = input.split("\n\n");
    const workflows: { [key: string]: WorkflowPart2 } = {};
    rawWorkflows.split("\n").forEach((line: string) => {
        const newWorkflow = new WorkflowPart2(line);
        workflows[newWorkflow.label] = newWorkflow;
    });

    const accepted = [];

    const queue = [{ label: "in", possibilities: new PossibilitiesPart2() }];
    while (queue.length) {
        const currentTarget = queue.shift();
        if (currentTarget) {
            if (currentTarget.label === "A") {
                accepted.push(currentTarget.possibilities);
                continue;
            }
            if (currentTarget.label === "R") {
                continue;
            }
            const newTargets = workflows[currentTarget.label].getTargets(
                currentTarget.possibilities
            );
            queue.push(...newTargets);
        }
    }

    let sum = 0;
    accepted.forEach((possibilities) => {
        sum += possibilities.getComboCount();
    });
    return sum;
}