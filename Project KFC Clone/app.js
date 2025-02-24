
let openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("LeftBtn").innerHTML=""
}
let closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("LeftBtn").innerHTML =
  ` <button  class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
</button> `;
}



  
var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
      0: {
          slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
    },
      750: {
          slidesPerView: 2,
      },
      // 628:{
      //   slidesPerView: 3,
      // },
      740:{
        slidesPerView: 2,
      },
      950: {
          slidesPerView:3,
      },
  },
});

let year = document.getElementById("year");
let getYear = new Date().getFullYear();
year.innerHTML = `
${getYear} KFC. All rights reserved
`
let prinCardAndRemove = document.getElementById("mainCon");

let logInBtnHead = document.getElementById("logInBtnHead");
let printLog = document.getElementById("printLogin")
logInBtnHead.addEventListener("click",()=>{
  prinCardAndRemove.remove()
  printLog.innerHTML = `
   <div class="logCard">
  <div>
<i id="arroeBack" class="fa-solid arrowLeft fa-arrow-left fa-sm" style="color: #df3434;"></i>
  
<img class="logImage img-fluid" src="images/login-animation.857cb4f842a7a27eed63.gif" alt="">
</div>
<div class="logInput">
  <div>
  <p class="wellCome">Wellcome</p>
  <input class="logInp" type="email" placeholder="Enter Email"><br>
  <input class="logInp" type="password" placeholder="Enter Password"><br>
  <center>
    <button class="loginBtn mt-bott">Login</button>
  </center>
  </div>
</div>
  `
  let arrowBack = document.getElementById("arroeBack")
 arrowBack.addEventListener("click",()=>{
  alert()

 })
})

console.log(logInBtnHead)