const wordText = document.querySelector(".word")
const hintWord = document.querySelector(".hint span")
const inputWord = document.querySelector("input")
const refreshBtn = document.querySelector(".refresh-word")
const checkBtn = document.querySelector(".check-word")
const timeText = document.querySelector(".time b")

let correctWord, timer;

const initTimer = maxTime =>{
    clearInterval(timer)
    timer = setInterval(()=>{
        if(maxTime>0){
            maxTime--;
            return timeText.innerHTML = maxTime;
        }
        clearInterval(timer);
        alert(`Time out! ${correctWord.toUpperCase()} was the correct word`);
        initGame()
    }, 1000)
}

const initGame = ()=>{
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for(let i = wordArray.length-1; i>0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = wordArray[i];
        wordArray[i] = wordArray[j];
        wordArray[j] = temp;
    }

    // console.log(refreshBtn)
    hintWord.innerHTML = randomObj.hint;
    wordText.innerHTML = wordArray.join("");
    correctWord = randomObj.word;
    console.log(wordArray, randomObj.word);
    // console.log(wordArray)
}
initGame()

const checkWord = ()=>{
    let userWord = inputWord.value.toLocaleLowerCase();
    console.log(userWord)
    if(!userWord) return alert("Please enter a word")
    if(userWord !== correctWord){
        return alert(`Oops ${userWord} is not the correct word`);
    }
    return alert(`Congrats! ${userWord.toUpperCase()} is the correct word`)
}


refreshBtn.addEventListener("click", initGame)
checkBtn.addEventListener("click", checkWord)