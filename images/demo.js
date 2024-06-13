function TwoDigit(str) {
    let result = [];
    for (let i = 0; i < str.length; i += 2) {
        result.push(str.slice(i, i + 2));
    }
    return result;
}

// ye smjh nhi aa rha kaise kiya hai chatgpt
function GreaterThan20(arr) {
    return arr.reduce((acc, numStr) => {
        let num = parseInt(numStr, 10);
        if (num > 20) {
            acc.push(...numStr.split('').map(Number));
        } else {
            acc.push(num);
        }
        return acc;
    }, []);
}

function countOccurrences(arr) {
    let occurrences = {};
    arr.forEach(element => {
        occurrences[element] = (occurrences[element] || 0) + 1;
    });
    return occurrences;
}

let inputString = "1112123333";
let twoDigitArray = TwoDigit(inputString);
let splitArray = GreaterThan20(twoDigitArray);
let occurrences = countOccurrences(splitArray);

console.log("Two-digit array:", twoDigitArray);
console.log("Split array:", splitArray);
console.log("Occurrences:", occurrences);
let occurrencesString = '';

for (const key in occurrences) {
    occurrencesString += key + occurrences[key];
}
console.log( occurrencesString );



