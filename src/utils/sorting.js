async function isSortedAlphabetically(array, isDescending = false) {
    const sortedArray = [...array].sort((a, b) => (isDescending ? b - a : a - b));
    return array.every((value, index) => value === sortedArray[index]);
}

async function isSortedByPrice(array, isDescending = false) {
    const sortedArray = [...array].sort((a, b) => (isDescending ? b - a : a - b));
    return array.every((value, index) => value === sortedArray[index]);
}

module.exports = { isSortedAlphabetically, isSortedByPrice };
