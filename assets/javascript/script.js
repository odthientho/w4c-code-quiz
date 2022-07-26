var questionList = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["strings","booleans","alert","numbers"],
        correct: 3
    },
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["quotes","curly brackets","parentheses","square brackets"],
        correct: 3
    },
    {
        question: "Arrays in JavaScript can be used to store_______.",
        answers: ["numbers and strings","other arrays","booleans","all of the above"],
        correct: 4
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["commas","curly brackets","quotes","parentheses"],
        correct: 3
    },
    {
        question: "A very useful tool used during development and debugging for printing contet to the debugger is:",
        answers: ["JavaScript","terminal / bash","for loops","console log"],
        correct: 4
    },
    {
        question: "What tag can be used to insert a line break or blank line in an HTML document?",
        answers: ["<br>","<li>","<ul>","<div>"],
        correct: 1
    },
    {
        question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
        answers: ["Declaration","Function","Variable","String"],
        correct: 2
    },
    {
        question: "What is the element used – and hidden – in code that explains things and makes the content more readable?",
        answers: ["Comparisons","Notes","Quotations","Comments"],
        correct: 4
    },
    {
        question: "External stylesheets are stored in what type of files?",
        answers: ["html","css","php","js"],
        correct: 2
    },
    {
        question: "What is the format called that is used for converting an object to string and vice versa.",
        answers: ["array","json","boolean","integer"],
        correct: 2
    }
];

var choices = document.querySelectorAll(".choiceBtn");
var question = document.querySelector("#question");
var startBtn = document.querySelector("#start-Btn");
var result = document.querySelector("#result");
var timer = document.querySelector("#timer");

var questionNum;
var timeOut;

function nextQuestion() {
    if (questionNum > questionList.length) return;
    if (questionNum == questionList.length) {
        
    }

    question.textContent = questionList[questionNum].question;
    for (var i=1; i <= choices.length; i++) {
        choices[i-1].textContent = i+". "+questionList[questionNum].answers[i-1];
    }
}

function visibilitySwitch(className, isVisible) {
    var tmp = document.querySelector("."+className);
    tmp.setAttribute("style", "visibility: "+isVisible);
}

startBtn.addEventListener("click", function () {
    nextQuestion();
    visibilitySwitch("introduction", "hidden");
    visibilitySwitch("questions", "visible");

    timer.textContent = "TIME: " + timeOut;
    var timerInterval = setInterval(function() {
        timeOut--;
        timer.textContent = "TIME: " + timeOut;
        if(timeOut === 0) {
            clearInterval(timerInterval);
        }
    }, 1000);
});

function checkAnswer(answerPicked) {
    if (questionNum >= questionList.length) return;

    if (answerPicked != questionList[questionNum].correct) result.textContent = "Wrong!";
    else result.textContent = "Correct!";

    var onesecond = 5;
    var timerInterval = setInterval(function() {
        onesecond--;
        visibilitySwitch("correction", "visible");
        if(onesecond === 0) {
            clearInterval(timerInterval);
            visibilitySwitch("correction", "hidden");
        }
    }, 300);

    questionNum++;
    nextQuestion()
}

function init() {
    questionNum = 0;
    timeOut = 60;
}

init();