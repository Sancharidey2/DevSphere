// Global Variable used to store the quotes 
// fetched from the API
var data;
let front = true;

// Getting the front and the back author boxes
const authors = document.querySelectorAll(".author");

// Getting the front and the back texts
const texts = document.querySelectorAll(".text");

// Getting the body
const body = document.getElementById("body");

// Getting the buttons
const button = document.querySelectorAll(".new-quote");

const blockFront = document.querySelector(".block__front");
const blockBack = document.querySelector(".block__back");

const authorFront = authors[0];
const authorBack = authors[1];

const textFront = texts[0];
const textBack = texts[1];

const buttonFront = button[0];
const buttonBack = button[1];

// Predefined motivational quotes
const motivationalQuotes = [
    { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.", author: "Winston Churchill" },
    { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success. Don’t let it stop you. Failure builds character.", author: "Ruchika Kengal" },
    { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" }
];

// An arrow function used to get a quote randomly
const displayQuote = () => {
    let allQuotes = data ? [...data, ...motivationalQuotes] : motivationalQuotes;
    let index = Math.floor(Math.random() * allQuotes.length);
    let quote = allQuotes[index].text;
    let author = allQuotes[index].author || "Anonymous";

    if (front) {
        textFront.innerHTML = quote;
        authorFront.innerHTML = author;
    } else {
        textBack.innerHTML = quote;
        authorBack.innerHTML = author;
    }
    front = !front;
};

// Fetching the quotes from the type.fit API using promises
fetch("https://type.fit/api/quotes")
    .then(response => response.json())
    .then(fetchedData => {
        data = fetchedData;
        displayQuote();
    })
    .catch(() => {
        data = motivationalQuotes;
        displayQuote();
    });

// Adding an onclick listener for the button
function newQuote() {
    blockBack.classList.toggle('rotateB');
    blockFront.classList.toggle('rotateF');
    displayQuote();
}
