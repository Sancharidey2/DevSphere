document.addEventListener("DOMContentLoaded", () => {
    const colorBox = document.getElementById("colorBox");
    const colorCode = document.getElementById("colorCode");
    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyBtn");

    function generateRandomColor() {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        colorBox.style.backgroundColor = randomColor;
        colorCode.textContent = randomColor;
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(colorCode.textContent).then(() => {
            alert("Color code copied: " + colorCode.textContent);
        });
    }

    generateBtn.addEventListener("click", generateRandomColor);
    copyBtn.addEventListener("click", copyToClipboard);

    // Generate a random color on page load
    generateRandomColor();
});
