document.addEventListener("DOMContentLoaded", () => {
    const min = 1;
    const max = 100;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min; 
    let attempts = 0;

    const feedbackEl = document.getElementById("feedback");
    const attemptsEl = document.getElementById("attempts");
    const guessInput = document.getElementById("guess-input");
    const submitBtn = document.getElementById("submit-btn");
    const resetBtn = document.getElementById("reset-btn");

    function checkGuess() {
        const guess = parseInt(guessInput.value, 10);

        if (isNaN(guess) || guess < min || guess > max) {
            feedbackEl.textContent = `Please enter a valid number between ${min} and ${max}.`;
            feedbackEl.style.color = "#e63946";
            return;
        }

        attempts++;
        attemptsEl.textContent = attempts;

        if (guess === randomNum) {
            feedbackEl.textContent = `🎉 Correct! The number was ${randomNum}. It took you ${attempts} attempts.`;
            feedbackEl.style.color = "#2a9d8f";
            submitBtn.disabled = true;
            guessInput.disabled = true;
        } else {
            feedbackEl.textContent = guess < randomNum ? "Too low! Try again." : "Too high! Try again.";
            feedbackEl.style.color = "#f4a261";
        }

        guessInput.value = "";
    }

    submitBtn.addEventListener("click", checkGuess);


    guessInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

    resetBtn.addEventListener("click", () => {
        attempts = 0;
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min; 
        attemptsEl.textContent = attempts;
        feedbackEl.textContent = "New game started! Make a guess.";
        feedbackEl.style.color = "#000";
        submitBtn.disabled = false;
        guessInput.disabled = false;
        guessInput.value = "";
    });
});


