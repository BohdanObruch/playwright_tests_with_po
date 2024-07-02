async function randomChoiceItems(length) {
    const result = [];
    while (result.length < 3) {
        const randomNum = Math.floor(Math.random() * length);
        if (!result.includes(randomNum)) {
            result.push(randomNum);
        }
    }
    return result;
}
module.exports = { randomChoiceItems };
