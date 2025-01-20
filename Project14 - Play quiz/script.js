const configContainer = document.querySelector(".config-container");
const answerOptions = document.querySelector(".answer-options");
const nextQuestion = document.querySelector(".next-question-btn");
const questionStatus = document.querySelector(".question-status");
const timerDisplay = document.querySelector(".time-duration");
const resultContainer = document.querySelector(".result-container");
const quizContainer = document.querySelector(".quiz-container");

const QUIZ_TIME_LIMIT = 15;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let numberOfQuestions = 5;
let quizCategory = "Programming";
let currentQuestion = null;
const questionIndexHistory = [];
let correctAnswerCount = 0;

// Display quiz result
const showQuizResult = () => {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    const resultText = `You answered <b>${correctAnswerCount}</b> out of <b>${numberOfQuestions}</b> questions correctly!`;
    document.querySelector(".result-message").innerHTML = resultText;
};

// Reset timer
const resetTimer = () => {
    clearInterval(timer);
    currentTime = QUIZ_TIME_LIMIT;
    timerDisplay.innerHTML = `${currentTime}s`;
};

// Start the timer
const startTimer = () => {
    timer = setInterval(() => {
        currentTime--;
        timerDisplay.innerHTML = `${currentTime}s`;

        if (currentTime <= 0) {
            clearInterval(timer);
            highlighCorrectAnswer();
            nextQuestion.style.visibility = "visible";

            // Disable further option clicks
            answerOptions.querySelectorAll(".answer-option").forEach((option) => {
                option.style.pointerEvents = "none";
            });
        }
    }, 1000);
};

// Fetch a random question from the selected category
const getRandomQuestion = () => {
    const categoryData = questions.find(cat => cat.category.toLowerCase() === quizCategory.toLowerCase());
    if (!categoryData || !categoryData.questions) {
        console.error("Error: No questions available for selected category");
        return null;
    }

    const categoryQuestions = categoryData.questions;

    // Check if we've reached the question limit or exhausted available questions
    if (questionIndexHistory.length >= Math.min(categoryQuestions.length, numberOfQuestions)) {
        showQuizResult();
        return null;
    }

    const availableQuestions = categoryQuestions.filter((_, index) => !questionIndexHistory.includes(index));
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];

    questionIndexHistory.push(categoryQuestions.indexOf(randomQuestion));
    return randomQuestion;
};

// Highlight correct answer
const highlighCorrectAnswer = () => {
    const correctOption = answerOptions.querySelectorAll(".answer-option")[currentQuestion.correctAnswer];
    correctOption.classList.add("correct");
};

// Handle answer selection
const handleAnswer = (option, answerIndex) => {
    clearInterval(timer);

    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? "correct" : "incorrect");
    if (!isCorrect) highlighCorrectAnswer();
    else correctAnswerCount++;

    nextQuestion.style.visibility = "visible";
};

// Render question
const renderQuestion = () => {
    currentQuestion = getRandomQuestion();
    if (!currentQuestion) return;

    resetTimer();
    startTimer();

    const questionTextElement = document.querySelector(".question-text");
    questionTextElement.innerHTML = currentQuestion.question;

    questionStatus.innerHTML = `<b>${questionIndexHistory.length}</b> out of <b>${numberOfQuestions}</b> questions.`;

    // Generate answer options
    answerOptions.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("answer-option");
        li.textContent = option;
        answerOptions.appendChild(li);
        li.addEventListener("click", () => handleAnswer(li, index));
    });

    nextQuestion.style.visibility = "hidden";
};

// Start the quiz
const startQuiz = () => {
    configContainer.style.display = "none";
    quizContainer.style.display = "block";

    // Get category and number of questions
    quizCategory = configContainer.querySelector(".category-option.active")?.textContent || "Programming";
    numberOfQuestions = parseInt(configContainer.querySelector(".Questions-option.active")?.textContent) || 5;

    if (!quizCategory || isNaN(numberOfQuestions)) {
        console.error("Error: Invalid category or number of questions selected.");
        configContainer.style.display = "block";
        quizContainer.style.display = "none";
        return;
    }

    renderQuestion();
};

// Reset the quiz
const resetQuiz = () => {
    resetTimer();
    correctAnswerCount = 0;
    questionIndexHistory.length = 0;

    configContainer.style.display = "block";
    resultContainer.style.display = "none";
};

// Add event listeners
nextQuestion.addEventListener("click", renderQuestion);
document.querySelector(".try-again-btn").addEventListener("click", resetQuiz);

document.querySelector(".start-quiz-btn").addEventListener("click", startQuiz);

document.querySelectorAll(".category-option").forEach(option => {
    option.addEventListener("click", () => {
        option.parentNode.querySelector(".active")?.classList.remove("active");
        option.classList.add("active");
    });
});

document.querySelectorAll(".Questions-option").forEach(option => {
    option.addEventListener("click", () => {
        option.parentNode.querySelector(".active")?.classList.remove("active");
        option.classList.add("active");
    });
});
