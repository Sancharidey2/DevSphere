const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click',()=>
    container.classList.add('right-panel-active')
);
signInButton.addEventListener('click',()=>
    container.classList.remove('right-panel-active')
);



const dots = [];
      const cursor = {
        x: 0,
        y: 0,
      };

      for (let i = 0; i < 40; i++) {
        const dot = document.createElement("div");
        dot.className = "dot";
        document.body.appendChild(dot);
        dots.push(dot);
      }

      document.addEventListener("mousemove", (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      });

      function draw() {
        let x = cursor.x;
        let y = cursor.y;

        dots.forEach((dot, index) => {
          const nextDot = dots[index + 1] || dots[0];

          dot.style.left = x + "px";
          dot.style.top = y + "px";

          x += (nextDot.offsetLeft - dot.offsetLeft) * 0.5;
          y += (nextDot.offsetTop - dot.offsetTop) * 0.5;
        });
      }

      setInterval(draw, 5);