function randomChoiceItems(totalItemsCount, maxNumberOfRandomItems) {
    const result = [];
    while (result.length < maxNumberOfRandomItems) {
        const randomNum = Math.floor(Math.random() * totalItemsCount);
        if (!result.includes(randomNum)) {
            result.push(randomNum);
        }
    }
    return result;
}

module.exports = { randomChoiceItems };
