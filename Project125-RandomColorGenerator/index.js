let container=document.querySelector(".container");
let hexcode="0123456789ABCDEF";
for(let i=0;i<30;i++){
    let box=document.createElement("div");
    box.classList.add("color-card");
    let color="#";
    for(let j=0;j<6;j++){
        color+=hexcode[getRandom()];
    }
    console.log(color);
    box.textContent=color;
    box.style.backgroundColor=color;
    // Create a new button for each color card
    let button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = "Copy";
    // Add event listener to copy color to clipboard
    button.addEventListener("click", () => {
        navigator.clipboard.writeText(color);
    });
    box.appendChild(button);
    container.appendChild(box);
}
function getRandom(){
    return Math.floor(Math.random() * 16);
}
console.log(getRandom());