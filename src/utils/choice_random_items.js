function randomChoiceItems(maxNumberOfRandomItems) {
    const result = [];
    for (let i = 0; result.length < 2; i++) {
        const randomNum = Math.floor(Math.random() * maxNumberOfRandomItems);
        if (!result.includes(randomNum)) {
            result.push(randomNum);
        }
    }
    return result;
}
module.exports = { randomChoiceItems };
