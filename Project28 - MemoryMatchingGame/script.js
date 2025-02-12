// Define game variables
const gameContainer = document.getElementById('game-container');
const colors = ['#2980b9', '#2ecc71', '#9b59b6', '#f1c40f', '#e74c3c', '#34495e', '#1abc9c', '#e67e22'];
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let matchesCount = 0;

// Create cards dynamically
function createCards() {
    const cardsArray = [...colors, ...colors];
    cardsArray.sort(() => 0.5 - Math.random());                        // Shuffle cards

    cardsArray.forEach(color => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-color', color);               // Store color as an attribute

        // HTML structure of each card
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back" style="background-color:${color}"></div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);                      // Assign event listener
        gameContainer.appendChild(cardElement);
    });

    cards = document.querySelectorAll('.card');
}

// Flip card function
function flipCard(event) {
    if (lockBoard) return;

    const clickedCard = event.currentTarget;
    if (clickedCard === firstCard) return;                          // Prevent double clicking the same card

    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        lockBoard = true; 
        checkForMatch();
    }
}

// Check for matching cards
function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-color') === secondCard.getAttribute('data-color');

    if (isMatch) {
        disableCards();
        updateScore();
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip cards if they don't match
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Update the score based on matching pairs
function updateScore() {
    matchesCount++;
    document.getElementById('score-board').innerText = `Matches: ${matchesCount}`;
}

// Reset variables and unlock board
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Initialize the game
createCards();
