const signUpBtn = document.querySelector('.sign-up-btn');
const signInBtn = document.querySelector('.sign-in-btn');
const wrapper = document.querySelector('.wrapper');

signUpBtn.addEventListener('click',() => 
{
  wrapper.classList.add('active');
  });

signInBtn.addEventListener('click',() => 
  {
    wrapper.classList.remove('active');
    
  });
  