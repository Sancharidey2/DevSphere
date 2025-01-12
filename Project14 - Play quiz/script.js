let quizCategory = "Programming";
// fetching a random from a selected category
const getRandomQuestion = () =>{
    const categoryQuestions = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase()).questions;
    const randomQuestions = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
    return randomQuestions
}

const renderQuestion =()=>{
    const currentQuestion = getRandomQuestion();
    if (!currentQuestion) return;
    const cuurQues = document.querySelector(".question-text")
    cuurQues.innerHTML = currentQuestion.question;
}
renderQuestion()