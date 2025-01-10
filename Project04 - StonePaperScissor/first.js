// Initialize scores
let userScore = 0;
let compScore = 0;

// Get DOM elements
const user_score_text = document.querySelector("#user-score");
const comp_score_text = document.getElementById("comp-score");
const cont_msg = document.getElementById("msg");

// Generate computer choice
const genCompChoice = () => {
  const choiceList = ["stone", "paper", "scissors"];
  const num = Math.floor(Math.random() * 3);
  return choiceList[num];
}

// Reset button logic
const reset_btn = document.querySelector("#reset");
reset_btn.addEventListener("click", () => {
  // Reset the actual score variables
  userScore = 0;
  compScore = 0;
  
  // Reset the displayed scores
  user_score_text.innerText = "0";
  comp_score_text.innerText = "0";
  
  // Reset the message
  cont_msg.innerText = "Play your move";
});

// Add click event listeners to choice buttons
const divs = document.querySelectorAll(".choice");
divs.forEach(element => {
  element.addEventListener("click", () => {
    const userChoice = element.getAttribute("id");
    playGame(userChoice);
  });  
});

// Handle draw game
const drawGame = (userChoice) => {
  const compChoice = genCompChoice();
  if(compChoice == userChoice){
    console.log("It is a draw");
    console.log(`Computer choice: ${compChoice}, User choice: ${userChoice}`);
  }
}

// Main game logic
const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if(compChoice == userChoice){
    drawGame(userChoice);
  }
  else if((compChoice == "stone" && userChoice == "paper") || 
          (compChoice == "paper" && userChoice == "scissors") || 
          (compChoice == "scissors" && userChoice == "stone")){
    userScore++;
    user_score_text.innerText = userScore;
    cont_msg.innerText = "You won"
    console.log("User won");
    console.log(`Computer choice: ${compChoice}, User choice: ${userChoice}`);
  }
  else{
    compScore++;
    comp_score_text.innerText = compScore;
    cont_msg.innerText = "Computer won"
    console.log("comp won");
    console.log(`Computer choice: ${compChoice}, User choice: ${userChoice}`);
  }
}