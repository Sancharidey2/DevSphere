document.addEventListener('DOMContentLoaded', () => {
    let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    let currentIndex = 0;
    let cardsReviewed = new Set();

    // DOM Elements
    const form = document.getElementById('flashcard-form');
    const cardContainer = document.querySelector('.card-inner');
    const questionDisplay = document.querySelector('.question');
    const answerDisplay = document.querySelector('.answer');
    const categoryTag = document.querySelector('.category-tag');
    const flipBtn = document.getElementById('flip-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const deleteBtn = document.getElementById('delete-btn');
    const cardCount = document.getElementById('card-count');
    const filterCategory = document.getElementById('filter-category');
    const progressFill = document.querySelector('.progress-fill');
    const cardsReviewedElement = document.getElementById('cards-reviewed');
    const totalCardsElement = document.getElementById('total-cards');

    // Add new flashcard
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const category = document.getElementById('category').value.trim();
        const question = document.getElementById('question').value.trim();
        const answer = document.getElementById('answer').value.trim();

        if (!question || !answer) {
            showNotification('Question and answer cannot be empty!');
            return;
        }

        const newCard = { 
            id: Date.now(), 
            category, 
            question, 
            answer, 
            tags: [], 
            difficulty: 0 
        };

        flashcards.push(newCard);
        saveToLocalStorage();
        updateUI();
        form.reset();
        showNotification('Card added successfully!');
    });

    // Navigation handlers
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateUI();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < flashcards.length - 1) {
            currentIndex++;
            if (!cardsReviewed.has(currentIndex)) {
                cardsReviewed.add(currentIndex);
                updateProgress();
            }
            updateUI();
        }
    });

    // Flip card
    flipBtn.addEventListener('click', () => {
        cardContainer.classList.toggle('flipped');
    });

    // Delete card
    deleteBtn.addEventListener('click', () => {
        if (flashcards.length > 0) {
            flashcards.splice(currentIndex, 1);
            currentIndex = Math.max(0, flashcards.length - 1);
            saveToLocalStorage();
            updateUI();
            showNotification('Card deleted!');
        }
    });

    // Update UI
    function updateUI() {
        if (flashcards.length === 0) {
            questionDisplay.textContent = 'No cards available';
            answerDisplay.textContent = 'Add some cards to begin';
            categoryTag.textContent = 'Empty';
            cardCount.textContent = '0/0';
            progressFill.style.width = '0%';
            return;
        }

        const currentCard = flashcards[currentIndex];
        questionDisplay.textContent = currentCard.question;
        answerDisplay.textContent = currentCard.answer;
        categoryTag.textContent = currentCard.category;
        cardCount.textContent = `${currentIndex + 1}/${flashcards.length}`;

        totalCardsElement.textContent = flashcards.length;

        updateTags();
        updateStarRating(currentCard.difficulty);
    }

    // Update progress
    function updateProgress() {
        cardsReviewedElement.textContent = cardsReviewed.size;
        const progress = (cardsReviewed.size / flashcards.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    // Save to localStorage
    function saveToLocalStorage() {
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Star rating
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            if (flashcards.length === 0) return;
            const rating = parseInt(star.dataset.rating);
            flashcards[currentIndex].difficulty = rating;
            updateStarRating(rating);
            saveToLocalStorage();
        });
    });

    function updateStarRating(rating) {
        document.querySelectorAll('.star').forEach(star => {
            const starRating = parseInt(star.dataset.rating);
            star.classList.toggle('active', starRating <= rating);
        });
    }

    // Tags management
    document.getElementById('tags').addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && flashcards.length > 0) {
            const tags = e.target.value.split(',').map(tag => tag.trim());
            flashcards[currentIndex].tags = tags;
            updateTags();
            saveToLocalStorage();
            e.target.value = '';
        }
    });

    function updateTags() {
        const tagsContainer = document.getElementById('cardTags');
        if (flashcards.length === 0) {
            tagsContainer.innerHTML = '';
            return;
        }
        const tags = flashcards[currentIndex].tags || [];
        tagsContainer.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    }

    // Export/Import functionality
    document.getElementById('exportBtn').addEventListener('click', () => {
        const data = JSON.stringify(flashcards);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'flashcards.json';
        a.click();
    });

    document.getElementById('importBtn').addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    flashcards = JSON.parse(event.target.result);
                    saveToLocalStorage();
                    updateUI();
                };
                reader.readAsText(file);
            }
        });
        input.click();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === '?') {
            document.querySelector('.shortcuts-help').classList.toggle('visible');
        } else if (e.key >= '1' && e.key <= '3') {
            if (flashcards.length > 0) {
                flashcards[currentIndex].difficulty = parseInt(e.key);
                updateStarRating(parseInt(e.key));
                saveToLocalStorage();
            }
        }
    });

    // Initialize
    updateUI();
});

