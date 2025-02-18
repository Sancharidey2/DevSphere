let searchInput=document.querySelector(".search");
let searchBtn=document.querySelector(".btn");
let baseurl="https://api.github.com/users/";
let githubProfileDetails=document.querySelector(".github-profile-details");
let loader=document.querySelector(".Loading");
function showLoader(){
loader.classList.add("show");
githubProfileDetails.classList.add("hide");
}

function removeLoader(){
loader.classList.remove("show");
githubProfileDetails.classList.remove("hide");
}

async function fetchGithubProfileDetails(){
    showLoader()
    let response=await fetch(`${baseurl}${searchInput.value}`);
    let res=await response.json();
    console.log(res);
    if (res){
        removeLoader()
        displayProfileDetails(res);
        searchInput.value="";
    }
}
function displayProfileDetails(getProfileDetails){
    const {login, avatar_url, public_repos,followers,following} = getProfileDetails;
    githubProfileDetails.innerHTML=`
    <p class="username">${login}</p>
    <br>
    <img src=${avatar_url} alt=${login}>
    <br>
    <p class="repos">Repos :${public_repos}</p>
    <br>
    <p class="followers">Followers :${followers}</p>
    <br>
    <p class="following">Following :${following}</p>
    `;
}
searchBtn.addEventListener("click",fetchGithubProfileDetails)