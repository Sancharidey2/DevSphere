document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".color-box");
    const rgbColor = document.getElementById("rgbColor");
    const resetButton = document.getElementById("reset");
    let colors = [];
    let pickedColor;

    function generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function generateColors(num) {
        const arr = [];
        for (let i = 0; i < num; i++) {
            arr.push(generateRandomColor());
        }
        return arr;
    }

    function pickColor() {
        const random = Math.floor(Math.random() * colors.length);
        return colors[random];
    }

    function resetGame() {
        colors = generateColors(6);
        pickedColor = pickColor();
        rgbColor.textContent = pickedColor;
        boxes.forEach((box, index) => {
            box.style.backgroundColor = colors[index];
            box.addEventListener("click", function () {
                if (this.style.backgroundColor === pickedColor) {
                    alert("Correct!");
                } else {
                    this.style.backgroundColor = "#232323";
                }
            });
        });
    }

    resetButton.addEventListener("click", resetGame);

    resetGame();
});
