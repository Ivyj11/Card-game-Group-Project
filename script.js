document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const cardsArray = Array.from(cards);
    shuffleArray(cardsArray);
    cardsArray.forEach(card => {
        gameContainer.appendChild(card);
    });
});

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let flippedCards = [];
let matchedCards = [];

const cards = document.querySelectorAll('.card');



cards.forEach(card => {
    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
            flipCard(card);
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    });
});

function flipCard(card) {
    const symbol = card.getAttribute('data-symbol');
    card.textContent = symbol;
    card.classList.add('flipped');
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.getAttribute('data-symbol');
    const symbol2 = card2.getAttribute('data-symbol');

    if (symbol1 === symbol2) {
        matchedCards.push(card1, card2);
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Congratulations! You won!'), 500);
            shuffleCards();
        }
    } else {
        setTimeout(() => {
            card1.textContent = '';
            card1.classList.remove('flipped');
            card2.textContent = '';
            card2.classList.remove('flipped');
            flippedCards = [];
            alert('Sorry, the symbols do not match. Try again.');
        }, 500);
    }
}
