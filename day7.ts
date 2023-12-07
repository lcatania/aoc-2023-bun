enum HandType {
    FiveOfKind = 6,
    FourOfKind = 5,
    FullHouse = 4,
    ThreeOfKind = 3,
    TwoPair = 2,
    OnePair = 1,
    HighestCard = 0
}

const cardMapping: { [key: string]: number } = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2
}

const cardMappingPart2: { [key: string]: number } = {
    "A": 13,
    "K": 12,
    "Q": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "J": 1

}

function getHandType(hand: string, part2: boolean = false): HandType {
    const countedChars = hand.split("").reduce((prev: { [key: string]: number }, curr: string) => {
        if (prev[curr])
            prev[curr] = prev[curr] + 1;
        else
            prev[curr] = 1
        return prev
    }, {});
    let jokerAmount = 0
    if (part2) {
        jokerAmount = countedChars["J"] ?? 0;
        countedChars["J"] = 0;
    }
    let handCountedValues = Object.values(countedChars).sort((a, b) => b - a);
    handCountedValues[0] += jokerAmount;
    if (handCountedValues.some(h => h === 5))
        return HandType.FiveOfKind
    else if (handCountedValues.some(h => h === 4))
        return HandType.FourOfKind
    else if (handCountedValues.includes(2) && handCountedValues.includes(3))
        return HandType.FullHouse
    else if (handCountedValues.some(h => h === 3))
        return HandType.ThreeOfKind
    else if (handCountedValues.filter(h => h === 2).length === 2)
        return HandType.TwoPair;
    else if (handCountedValues.filter(h => h === 2).length === 1)
        return HandType.OnePair;
    else
        return HandType.HighestCard;
}

export function day7(input: string) {
    return input.split("\n").map((l) => {
        const [cards, bid] = l.trim().split(" ");
        return { hand: cards, bid: bid, type: getHandType(cards) }
    }).toSorted((handA, handB) => {
        if (handA.type > handB.type) return 1;
        if (handB.type > handA.type) return -1;

        for (let index = 0; index < handA.hand.length; index++) {
            if (cardMapping[handA.hand.charAt(index)] > cardMapping[handB.hand.charAt(index)]) return 1;
            if (cardMapping[handB.hand.charAt(index)] > cardMapping[handA.hand.charAt(index)]) return -1;
        }
        return 0
    }).reduce((a, b, i) => a + (Number(b.bid) * (i + 1)), 0);
}

export function day7part2(input: string) {
    return input.split("\n").map((l) => {
        const [cards, bid] = l.trim().split(" ");
        return { hand: cards, bid: bid, type: getHandType(cards, true) }
    }).toSorted((handA, handB) => {
        if (handA.type > handB.type) return 1;
        if (handB.type > handA.type) return -1;

        for (let index = 0; index < handA.hand.length; index++) {
            if (cardMappingPart2[handA.hand.charAt(index)] > cardMappingPart2[handB.hand.charAt(index)]) return 1;
            if (cardMappingPart2[handB.hand.charAt(index)] > cardMappingPart2[handA.hand.charAt(index)]) return -1;
        }
        return 0
    }).reduce((a, b, i) => a + (Number(b.bid) * (i + 1)), 0);
}