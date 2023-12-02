type Game = {
    id: number;
    sets: {
        blue: number;
        red: number;
        green: number;
    }[]
}

function parseInput(input: string): Game[] {
    const result: Game[] = [];
    const rawGames = input.split('\n');
    rawGames.forEach(rw => {
        const gameIdPart = rw.split(":");
        const newGame: Game = {
            id: Number(gameIdPart[0].slice(-2)),
            sets: []
        };
        gameIdPart[1].split(';').forEach((sets) => {
            const newSet = { blue: 0, green: 0, red: 0 };
            const values = sets.split(',')
            values.forEach(val => {
                if (val.includes('blue')) {
                    newSet.blue = Number(val.replace(/\D/g, ""));
                }
                else if (val.includes('red')) {
                    newSet.red = Number(val.replace(/\D/g, ""));
                }
                else {
                    newSet.green = Number(val.replace(/\D/g, ""));
                }
            })
            newGame.sets.push(newSet);
        })
        result.push(newGame)
    })
    return result;
}

function day2(input: string) {
    return parseInput(input).filter((g) => {
        return g.sets.every((a) => a.red <= 12 && a.blue <= 14 && a.green <= 13);
    }).map(g => g.id).reduce((a, b) => a + b);

}

function day2part2(input: string) {
    return parseInput(input)
        .map(g => {
            const maxBlue = Math.max(...g.sets.map(s => s.blue))
            const maxRed = Math.max(...g.sets.map(s => s.red))
            const maxGreen = Math.max(...g.sets.map(s => s.green))
            return maxBlue * maxGreen * maxRed
        }).reduce((a, b) => a + b)
}