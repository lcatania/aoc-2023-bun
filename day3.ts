function isDigit(char: string) {
    return /\d/.test(char);
}

function containsSymbols(str: string) {
    return /[^0-9.]/.test(str);
}

function parseNumberFromString(str: string, start: number, end: number) {
    const numberPart = str.substring(start, end + 1);
    return parseInt(numberPart);
}


function annoyingEdgeCase(str: string) {
    const pattern = /^\d\.\d$/;
    return pattern.test(str);
}

function findNumberPositionInString(str: string) {
    if (str.length !== 3) {
        return -1;
    }

    for (let i = 0; i < str.length; i++) {
        if (/\d/.test(str[i])) {
            return i;
        }
    }

    return -1; 
}

function findNumberInStringLeft(str: string) {
    let number = '';

    for (let i = str.length - 1; i >= 0; i--) {
        if (!isDigit(str.charAt(i))) {
            break;
        }
        number = str.charAt(i) + number;
    }

    return number.length > 0 ? parseInt(number, 10) : -1;
}

function findNumberInStringRight(str: string) {
    let number = '';

    for (let i = 0; i < str.length; i++) {
        if (!isDigit(str.charAt(i))) {
            break;
        }
        number += str.charAt(i);
    }

    return number.length > 0 ? parseInt(number, 10) : -1;
}

function findNumberInStringMiddle(str: string, startPos: number) {
    let left = startPos;
    while (left > 0 && /\d/.test(str[left - 1])) {
        left--;
    }

    let right = startPos;
    while (right < str.length - 1 && /\d/.test(str[right + 1])) {
        right++;
    }

    const numberStr = str.substring(left, right + 1);
    return parseInt(numberStr, 10);
}

export function day3(input: string) {
    let result = 0
    const lines = input.split("\n");
    lines.forEach((line, lineIndex) => {
        line.split("").forEach((cell, cellIndex) => {
            if (isDigit((line.charAt(cellIndex)))) {
                let number = 0;
                let numberStart = cellIndex;
                let numberEnd = cellIndex;
                for (let j = cellIndex + 1; j < line.length; j++) {
                    if (!isDigit((line.charAt(j)))) {
                        break;
                    }
                    numberEnd = j;
                }
                number = parseNumberFromString(line, numberStart, numberEnd);
                let stringToCheck = "";
                let numberStartChecked = (numberStart === 0) ? 0 : numberStart - 1
                let numberEndChecked = (numberEnd === line.length) ? line.length : numberEnd + 1
                if (lineIndex > 0) {
                    var lineAbove = lines[lineIndex - 1];
                    stringToCheck += lineAbove.substring(numberStartChecked, numberEndChecked + 1);
                }
                // Check below number
                if (lineIndex < lines.length - 2) {
                    var lineBelow = lines[lineIndex + 1];
                    stringToCheck += lineBelow.substring(numberStartChecked, numberEndChecked + 1); // stupid JS substrings :)
                }
                // Pre and post string
                if (numberStartChecked !== 0) {
                    stringToCheck += line.charAt(numberStartChecked)
                }
                if (numberEndChecked !== line.length) {
                    stringToCheck += line.charAt(numberEndChecked)
                }
                if (containsSymbols(stringToCheck)) {
                    result += number;
                }

                // continue at end of the Number
                cellIndex = numberEnd;
            }
        })
    })
    return result;
}

export function day3part2(input: string) {
    let result = 0;
    const lines = input.split("\n");
    lines.forEach((line, lineIndex) => {
        line.split("").forEach((cell, cellIndex) => {
            // find the * !
            if (line.charAt(cellIndex) === "*") {
                let numbersFound = [];

                // check top
                if (lineIndex > 0) {
                    let lineAbove = lines[lineIndex - 1];
                    let posInLineAbove = findNumberPositionInString(lineAbove.substring(cellIndex - 1, cellIndex + 2));
                    if (annoyingEdgeCase(lineAbove.substring(cellIndex - 1, cellIndex + 2))) {
                        numbersFound.push(findNumberInStringLeft(lineAbove.substring(0, cellIndex)));
                        numbersFound.push(findNumberInStringRight(lineAbove.substring(cellIndex + 1)));
                    } else if (posInLineAbove !== -1) {
                        numbersFound.push(findNumberInStringMiddle(lineAbove, cellIndex + posInLineAbove - 1));
                    }
                }
                // check bottom
                if (lineIndex < lines.length - 1) {
                    let lineBelow = lines[lineIndex + 1];
                    let posInLineBelow = findNumberPositionInString(lineBelow.substring(cellIndex - 1, cellIndex + 2));
                    if (annoyingEdgeCase(lineBelow.substring(cellIndex - 1, cellIndex + 2))) {
                        numbersFound.push(findNumberInStringLeft(lineBelow.substring(0, cellIndex)));
                        numbersFound.push(findNumberInStringRight(lineBelow.substring(cellIndex + 1)));
                    } else if (posInLineBelow !== -1) {
                        numbersFound.push(findNumberInStringMiddle(lineBelow, cellIndex + 1 + posInLineBelow - 1));
                    }
                }

                // Check Left for Number
                if (cellIndex > 0) {
                    let numberLeft = findNumberInStringLeft(line.substring(0, cellIndex))
                    if (numberLeft !== -1) {
                        numbersFound.push(numberLeft);
                    }
                }

                // Check Right for Number
                if (cellIndex < line.length - 1) {
                    let numberRight = findNumberInStringRight(line.substring(cellIndex + 1));
                    if (numberRight !== -1) {
                        numbersFound.push(numberRight);
                    }
                }

                if (numbersFound.length === 2) {
                    result += numbersFound[0] * numbersFound[1];
                }
            }
        });
    })
    return result;
}