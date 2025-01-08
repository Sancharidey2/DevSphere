document.addEventListener("DOMContentLoaded", () => {
    const min = 1;
    const max = 100;
    const randomNum = 23; // Fixed correct number
    let attempts = 0;
  
    const feedbackEl = document.getElementById("feedback");
    const attemptsEl = document.getElementById("attempts");
    const guessInput = document.getElementById("guess-input");
    const submitBtn = document.getElementById("submit-btn");
    const resetBtn = document.getElementById("reset-btn");
  
    submitBtn.addEventListener("click", () => {
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
      } else if (guess < randomNum) {
        feedbackEl.textContent = "Too low! Try again.";
        feedbackEl.style.color = "#f4a261";
      } else {
        feedbackEl.textContent = "Too high! Try again.";
        feedbackEl.style.color = "#f4a261";
      }
  
      guessInput.value = "";
    });
  
    resetBtn.addEventListener("click", () => {
      location.reload();
    });
  });
  