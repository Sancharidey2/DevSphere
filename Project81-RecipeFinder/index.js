const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');
const fetchRecipes = async(query) => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();
    resultsList.innerHTML = '';
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strArea}</p>
            <p>${meal.strCategory}</p>
        `
        resultsList.appendChild(recipeDiv);
    });
}
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searching=searchInput.value.trim();
    fetchRecipes(searching);  
    if(searching){
        searchInput.value='';
    }
});