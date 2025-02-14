const textDisplay = document.getElementById("text-display");
const inputBox = document.getElementById("input-box");
const startButton = document.getElementById("start-button");
const timeDisplay = document.getElementById("time");
const wordCountDisplay = document.getElementById("word-count");
const wpmDisplay = document.getElementById("wpm");

let timeLeft = 60; // Time in seconds
let totalTime = 60; // Store the total time for WPM calculation
let timer;
let isTyping = false;

function startTest() {
    if (isTyping) return; // Prevent restarting during a test
    isTyping = true;
    timeLeft = 60;
    totalTime = 60;
    inputBox.value = "";
    wordCountDisplay.textContent = "0";
    wpmDisplay.textContent = "0";

    inputBox.disabled = false;
    inputBox.focus();

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            endTest();
        }
    }, 1000);
}

function endTest() {
    isTyping = false;
    inputBox.disabled = true;

    // Calculate words typed
    const wordsTyped = inputBox.value.trim().split(/\s+/).filter(word => word.length > 0).length;

    // Calculate WPM (total time in minutes = totalTime / 60)
    const wpm = Math.round((wordsTyped / totalTime) * 60);

    wordCountDisplay.textContent = wordsTyped;
    wpmDisplay.textContent = wpm;
}

startButton.addEventListener("click", startTest);

inputBox.addEventListener("input", () => {
    if (!isTyping) return;

    // Update live word count
    const wordsTyped = inputBox.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    wordCountDisplay.textContent = wordsTyped;

    // Update WPM live during the test
    const timeElapsed = totalTime - timeLeft;
    if (timeElapsed > 0) {
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        wpmDisplay.textContent = wpm;
    }
});
