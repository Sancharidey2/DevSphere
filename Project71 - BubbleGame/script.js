var timer = 30;
var score = 0;

function increaseScore() {
  score += 10;
  document.querySelector("#scoreval").textContent = score;
}

function getnewhit() {
  var ran = Math.floor(Math.random() * 10);
  document.querySelector("#hitval").textContent = ran;
}

function makebubble() {
  var clutter = "";

  for (var i = 1; i <= 112; i++) {
    var ran = Math.floor(Math.random() * 10);
    clutter += `<div id="bubble">${ran}</div>`;
  }

  document.querySelector("#bottom").innerHTML = clutter;
}

function countdown() {
  var timerint = setInterval(function () {
    if (timer === 0) {
        document.querySelector("#game-over").style.display = "block";
        document.querySelector("#final-score").textContent = `Your final score is: ${score}`;
    }
    if (timer > 0) {
      timer--;
      document.querySelector("#time-interval").textContent = timer;
    } else {
      clearInterval(timerint);
    }
  }, 1000);
}

document.querySelector("#bottom").addEventListener("click", function (e) {
  if (e.target && e.target.id === "bubble") {
    if (
      parseInt(e.target.textContent) ===
      parseInt(document.querySelector("#hitval").textContent)
    ) {
      increaseScore();
      getnewhit();
      makebubble();
    }
  }
});

makebubble();
countdown();
getnewhit();
increaseScore();
