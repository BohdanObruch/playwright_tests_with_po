function randomChoiceItems(length) {
    const result = [];
    for (let i = 0; result.length < 2; i++) {
        const randomNum = Math.floor(Math.random() * length);
        if (!result.includes(randomNum)) {
            result.push(randomNum);
        }
    }
    return result;
}
module.exports = { randomChoiceItems };
