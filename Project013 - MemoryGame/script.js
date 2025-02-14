class MemoryGame {
    constructor() {
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.gameStarted = false;
        this.timer = null;
        this.seconds = 0;
        this.hintsLeft = 3;
        this.soundEnabled = true;
        this.difficulty = 'easy';
        this.stars = 3;
        
        // Card symbols for different difficulties
        this.symbolSets = {
            easy: ['fa-heart', 'fa-star', 'fa-moon', 'fa-sun', 'fa-cloud', 'fa-tree'],
            medium: ['fa-heart', 'fa-star', 'fa-moon', 'fa-sun', 'fa-cloud', 'fa-tree', 'fa-bell', 'fa-gem'],
            hard: ['fa-heart', 'fa-star', 'fa-moon', 'fa-sun', 'fa-cloud', 'fa-tree', 'fa-bell', 'fa-gem', 
                  'fa-leaf', 'fa-music']
        };

        // Sound effects
        this.sounds = {
            flip: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3'),
            match: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'),
            victory: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3'),
            wrong: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3')
        };
        
        this.init();
    }

    init() {
        this.gameBoard = document.querySelector('.game-board');
        this.movesDisplay = document.getElementById('moves');
        this.timeDisplay = document.getElementById('time');
        this.restartBtn = document.getElementById('restart');
        this.hintBtn = document.getElementById('hint');
        this.soundBtn = document.getElementById('sound');
        this.hintsLeftDisplay = document.getElementById('hintsLeft');
        this.highScoreDisplay = document.getElementById('highScore');
        this.modal = document.getElementById('victory-modal');
        this.difficultyBtns = document.querySelectorAll('.difficulty-selector button');
        
        this.loadHighScore();
        this.addEventListeners();
        this.createCards();
    }

    loadHighScore() {
        const highScore = localStorage.getItem('memoryGameHighScore') || 0;
        this.highScoreDisplay.textContent = highScore;
    }

    saveHighScore(score) {
        const currentHigh = localStorage.getItem('memoryGameHighScore') || 0;
        if (score > currentHigh) {
            localStorage.setItem('memoryGameHighScore', score);
            this.highScoreDisplay.textContent = score;
        }
    }

    addEventListeners() {
        this.gameBoard.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            if (card && !this.isCardFlipped(card)) {
                this.flipCard(card);
            }
        });

        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.hintBtn.addEventListener('click', () => this.showHint());
        this.soundBtn.addEventListener('click', () => this.toggleSound());

        this.difficultyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setDifficulty(btn.dataset.difficulty);
                this.difficultyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        document.getElementById('play-again').addEventListener('click', () => {
            this.modal.classList.remove('show');
            this.restartGame();
        });

        document.getElementById('share-score').addEventListener('click', () => {
            this.shareScore();
        });
    }

    setDifficulty(level) {
        this.difficulty = level;
        this.restartGame();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        const icon = this.soundBtn.querySelector('i');
        icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }

    playSound(soundName) {
        if (this.soundEnabled) {
            this.sounds[soundName].currentTime = 0;
            this.sounds[soundName].play();
        }
    }

    showHint() {
        if (this.hintsLeft > 0 && !this.matchedPairs === this.getSymbolsForDifficulty().length) {
            this.hintsLeft--;
            this.hintsLeftDisplay.textContent = this.hintsLeft;

            const unmatched = Array.from(document.querySelectorAll('.card:not(.matched)'));
            const unmatchedPairs = {};

            unmatched.forEach(card => {
                const symbol = card.dataset.symbol;
                if (!unmatchedPairs[symbol]) {
                    unmatchedPairs[symbol] = [];
                }
                unmatchedPairs[symbol].push(card);
            });

            // Find first unmatched pair
            for (let symbol in unmatchedPairs) {
                if (unmatchedPairs[symbol].length === 2) {
                    unmatchedPairs[symbol].forEach(card => {
                        card.classList.add('hint');
                        setTimeout(() => card.classList.remove('hint'), 1000);
                    });
                    break;
                }
            }
        }
    }

    getSymbolsForDifficulty() {
        return this.symbolSets[this.difficulty];
    }

    createCards() {
        const symbols = this.getSymbolsForDifficulty();
        const cardPairs = [...symbols, ...symbols];
        this.shuffleArray(cardPairs);

        this.gameBoard.innerHTML = '';
        cardPairs.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.index = index;
            card.dataset.symbol = symbol;
            
            card.innerHTML = `
                <div class="card-front">
                    <i class="fas fa-question"></i>
                </div>
                <div class="card-back">
                    <i class="fas ${symbol}"></i>
                </div>
            `;
            
            this.gameBoard.appendChild(card);
        });

        // Adjust grid columns based on difficulty
        const columns = this.difficulty === 'hard' ? 5 : 4;
        this.gameBoard.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    startTimer() {
        if (!this.gameStarted) {
            this.gameStarted = true;
            this.timer = setInterval(() => {
                this.seconds++;
                const minutes = Math.floor(this.seconds / 60);
                const remainingSeconds = this.seconds % 60;
                this.timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
                this.updateStars();
            }, 1000);
        }
    }

    updateStars() {
        const stars = document.querySelectorAll('.stars-container .fa-star');
        
        // Remove all active classes first
        stars.forEach(star => star.classList.remove('active'));
        
        // Calculate stars based on moves and difficulty
        let starsCount = 3;
        const moveThresholds = {
            easy: { two: 12, one: 18 },
            medium: { two: 16, one: 22 },
            hard: { two: 20, one: 26 }
        };

        const threshold = moveThresholds[this.difficulty];
        if (this.moves > threshold.one) starsCount = 1;
        else if (this.moves > threshold.two) starsCount = 2;

        // Update star display
        for (let i = 0; i < starsCount; i++) {
            stars[i].classList.add('active');
        }

        this.stars = starsCount;
    }

    flipCard(card) {
        if (this.flippedCards.length === 2) return;
        
        this.startTimer();
        this.playSound('flip');
        card.classList.add('flipped');
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesDisplay.textContent = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.symbol === card2.dataset.symbol;

        if (match) {
            this.handleMatch(card1, card2);
        } else {
            this.handleMismatch(card1, card2);
        }
    }

    handleMatch(card1, card2) {
        this.playSound('match');
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.matchedPairs++;
        this.flippedCards = [];

        if (this.matchedPairs === this.getSymbolsForDifficulty().length) {
            this.endGame();
        }
    }

    handleMismatch(card1, card2) {
        this.playSound('wrong');
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            this.flippedCards = [];
        }, 1000);
    }

    endGame() {
        clearInterval(this.timer);
        this.playSound('victory');
        
        // Calculate score based on moves, time, and difficulty multiplier
        const difficultyMultiplier = {
            easy: 1,
            medium: 1.5,
            hard: 2
        };
        
        const score = Math.round(
            (1000 - (this.moves * 10) - (this.seconds * 2)) * 
            difficultyMultiplier[this.difficulty] * 
            (this.stars / 3)
        );

        this.saveHighScore(score);

        // Update modal content
        document.getElementById('final-time').textContent = this.timeDisplay.textContent;
        document.getElementById('final-moves').textContent = this.moves;
        document.getElementById('final-stars').textContent = '⭐'.repeat(this.stars);

        setTimeout(() => {
            this.modal.classList.add('show');
        }, 500);
    }

    shareScore() {
        const text = `🎮 Memory Game Score 🏆\n` +
                    `Time: ${this.timeDisplay.textContent}\n` +
                    `Moves: ${this.moves}\n` +
                    `Stars: ${'⭐'.repeat(this.stars)}\n` +
                    `Difficulty: ${this.difficulty}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Memory Game Score',
                text: text
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(text)
                .then(() => alert('Score copied to clipboard!'))
                .catch(console.error);
        }
    }

    restartGame() {
        clearInterval(this.timer);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.moves = 0;
        this.seconds = 0;
        this.gameStarted = false;
        this.stars = 3;
        this.hintsLeft = 3;
        this.movesDisplay.textContent = '0';
        this.timeDisplay.textContent = '00:00';
        this.hintsLeftDisplay.textContent = this.hintsLeft;
        this.updateStars();
        this.createCards();
    }

    isCardFlipped(card) {
        return card.classList.contains('flipped') || card.classList.contains('matched');
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});
