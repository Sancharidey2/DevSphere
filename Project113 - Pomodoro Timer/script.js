const start = document.getElementById('start');
const stopbutton = document.getElementById('stop');
const reset = document.getElementById('reset');
const timer = document.getElementById('timer');
let interval;
let timeLeft = 1500;

function updateTimer(){
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2,"0")} : ${seconds.toString().padStart(2,"0")}`;
    timer.innerHTML = formattedTime;
}

function startTimer(){
    interval = setInterval(() =>{
        timeLeft--;
        updateTimer();
        if(timeLeft == 0){
            clearInterval(interval);
            alert("time's up!");
            timeLeft = 1500;
            updateTimer();
        }
    }, 1000)
}

function stopTimer(){
    clearInterval(interval);
    
}

function resetTimer(){
    clearInterval(interval);
    timeLeft = 1500;
    updateTimer();
}

start.addEventListener("click", startTimer)

stopbutton.addEventListener("click", stopTimer)

reset.addEventListener("click", resetTimer)