// Function to play sound and animate the key
function playSound(e) {
    const keyCode = e.type === "keydown" ? e.keyCode : e.target.dataset.key;
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    if (!audio) return; // Stop if no audio for the key
    audio.currentTime = 0; // Rewind audio to the start
    audio.play();
    key.classList.add("playing");
}

// Remove animation class after it ends
function removeTransition(e) {
    if (e.propertyName !== "transform") return; // Skip irrelevant transitions
    this.classList.remove("playing");
}

// Add event listeners for both mouse and keyboard
const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("click", playSound));
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
