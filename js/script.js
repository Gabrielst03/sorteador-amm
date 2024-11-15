function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const luckyNumber = getRandomNumber(0, 180);
console.log(`Your lucky number is: ${luckyNumber}`);

document.addEventListener('DOMContentLoaded', (event) => {
    const luckyNumberElement = document.getElementById('lucky-number');
    if (luckyNumberElement) {
        luckyNumberElement.textContent = `Your lucky number is: ${luckyNumber}`;
    }
});