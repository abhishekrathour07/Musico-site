function TwoDigit(str) {
    let result = [];
    for (let i = 0; i < str.length; i += 2) {
        result.push(str.slice(i, i + 2));
    }
    return result;
}