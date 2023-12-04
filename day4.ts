export function day4(input: string) {
    return input.split("\n").map(l => l.split(":")[1]).map((line) => {
        const splittedLine = line.split("|")
        const winningNumbers = splittedLine[0].trimStart().trimEnd().split(" ").map(Number);
        const numbers = splittedLine[1].trimStart().trimEnd().split(" ").filter(n => n !== "").map(Number)
        let cardResult = 0
        numbers.forEach((n) => {
            if (winningNumbers.includes(n)) {
                if (cardResult > 0)
                    cardResult *= 2;
                else
                    cardResult += 1
            }
        })
        return cardResult
    }).reduce((a, b) => a + b)
}

export function day4part2(input: string) {
    let result = 0;
    const allScratchpads: { [key: number]: number } = {}
    const cards = input.split("\n");
    cards.forEach((card, cardIndex) => {
        const cardNumber = Number(card.split(":")[0].replace("Card", "").trim())
        console.log(cardNumber)
        const splittedLine = card.split(":")[1].split("|")
        const winningNumbers = splittedLine[0].trimStart().trimEnd().split(" ").map(Number);
        const numbers = splittedLine[1].trimStart().trimEnd().split(" ").filter(n => n !== "").map(Number)
        let matches = 0
        let cards = 1
        if (allScratchpads[cardNumber] !== undefined) {
            cards = allScratchpads[cardNumber];
        }
        for (let index = 0; index < cards; index++) {
            let wonCards = [];
            numbers.forEach((n) => {
                if (winningNumbers.includes(n)) {
                    matches += 1
                }
            })
            if (matches !== 0) {
                for (let i = cardNumber + 1; i <= cardNumber + matches; i++) {
                    wonCards.push(i);
                }
            }

            wonCards.forEach((card) => {
                if (card in allScratchpads) {
                    allScratchpads[card] = allScratchpads[card] + 1;
                } else {
                    allScratchpads[card] = 2;
                }
            })
            if (!(cardNumber in allScratchpads)) {
                allScratchpads[cardNumber] = 1;
            }
        }
    })
    for (const [, value] of Object.entries(allScratchpads)) {
        result += value;
    }
    return result
}