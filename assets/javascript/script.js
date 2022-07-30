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
var startQuizBtn = document.querySelector("#start-quiz-Btn");
var result = document.querySelector("#result");
var timer = document.querySelector("#timer");
var recordScores = document.querySelector("#recordScores-form");
var initials = document.querySelector("#initials");
var scoreSpan = document.querySelector("#score");
var highscoresList = document.querySelector("#highscoresList");
var viewHighscores = document.querySelector("#viewHighscores");
var goBackBtn = document.querySelector("#goBack");
var clearHighScoresBtn = document.querySelector("#clearHighScores");

var maximumTime = 90;
var questionNum;
var timeOut;
var score;
var highscoreRecords;
var isLast;

// list all results from LocalStorage and show highscores section
function showHighscoreBoard() {
    highscoresList.innerHTML = "";

    highscoreRecords = [];
    var temp = JSON.parse(localStorage.getItem("highscoreRecords"));
    if (temp != null) highscoreRecords = temp;

    if (highscoreRecords.length == 0) {
        var li = document.createElement("li");
        li.textContent = "";
        highscoresList.appendChild(li);   
    } else {
        for (var i=0; i < highscoreRecords.length; i++) {
            var li = document.createElement("li");
            li.textContent = highscoreRecords[i].initials+" - "+highscoreRecords[i].score+" corrects - "+highscoreRecords[i].seconds+" sec";
            highscoresList.appendChild(li);       
        }
    }
    
    showSection("highscores");
}

// listen to click event of viewHighScores in navigation
viewHighscores.addEventListener("click", function(event) {
    event.preventDefault();
    showHighscoreBoard();
});

// listen to click event of go-back button
goBackBtn.addEventListener("click", function(event) {
    init();
});

// listen to click event of clear-HighScores button to clear results in LocalStorage
clearHighScoresBtn.addEventListener("click", function(event) {
    localStorage.clear();
    showHighscoreBoard();
});

// to store results to localStorage
function toRecordResult(event) {
    event.preventDefault();

    var nameIni = initials.value;
    var record = { 
        initials: nameIni,
        score: score,
        seconds: maximumTime-timeOut
    }

    highscoreRecords = [];
    var temp = JSON.parse(localStorage.getItem("highscoreRecords"));
    if (temp != null) highscoreRecords = temp;
    highscoreRecords.push(record);
    localStorage.setItem("highscoreRecords",JSON.stringify(highscoreRecords));

    initials.value = "";

}
// listen to the submit event of recordScores-form
recordScores.addEventListener("submit", function(event){
    toRecordResult(event);
    showHighscoreBoard();
});

// to show Record section
function showRecord() {
    scoreSpan.textContent = "Your final score is "+score+" in "+(maximumTime-timeOut+1)+" seconds.";
    showSection("records");
    isLast = true;
}

// move to next question in question List
function moveToNextQuestion() {
    if (questionNum > questionList.length) return;
    // if it is last question, switch to records section
    if (questionNum == questionList.length) {
        showRecord();
        return;
    }

    question.textContent = questionList[questionNum].question;
    for (var i=1; i <= choices.length; i++) {
        choices[i-1].textContent = i+". "+questionList[questionNum].answers[i-1];
    }
}

// set timer clock
function setTimerClock() {
    var timerInterval = setInterval(function() {
        timeOut--;
        timer.textContent = "TIME: " + timeOut;

        if (isLast) {
            clearInterval(timerInterval);
        }

        if(timeOut <= 0) {
            timeOut = 0;
            timer.textContent = "TIME: " + timeOut;
            clearInterval(timerInterval);
            showRecord();
        }
    }, 1000);
}

// when start quiz button is clicked, set timer move to questions and start the first question
startQuizBtn.addEventListener("click", function () {  

    // Start with question number 1 (index=0)
    // maximumTime is 120 seconds
    // score is 0 from beginning
    questionNum = 0;
    timeOut = maximumTime;
    timer.textContent = "TIME: " + timeOut;
    score = 0;

    // variable to check if it is the last question
    isLast = false;

    setTimerClock();
    showSection("questions");
    moveToNextQuestion();
});

// check if the selected answer is correct or not
function checkAnswer(answerSelected) {
    if (questionNum >= questionList.length) return;

    if (answerSelected != questionList[questionNum].correct) {
        result.textContent = "Wrong!";
        timeOut -= 5;
    } else {
        result.textContent = "Correct!";
        score++;
    }
    showResult();

    questionNum++;
    moveToNextQuestion();
}

// to show Result of the Question within a second
function showResult() {
    var onesecond = 5;
    var timerInterval = setInterval(function() {
        onesecond--;
        setVisibility("correction", "visible");
        if(onesecond === 0) {
            clearInterval(timerInterval);
            setVisibility("correction", "hidden");
        }
    }, 300);
}

// set visibility attribute to a class section
function setVisibility(className, visibleOrHidden) {
    var tmp = document.querySelector("."+className);
    tmp.setAttribute("style", "visibility: "+visibleOrHidden);
}

// switch to the right section
function showSection(sectionName) {
    setVisibility("introduction", "hidden");
    setVisibility("questions", "hidden");
    setVisibility("highscores", "hidden");
    setVisibility("records", "hidden");
    setVisibility("correction", "hidden");

    if (sectionName == "introduction") setVisibility("introduction", "visible");
    if (sectionName == "questions") setVisibility("questions", "visible");
    if (sectionName == "highscores") setVisibility("highscores", "visible");
    if (sectionName == "records") setVisibility("records", "visible");
}

function init() {
    // to start, only section "introduction" showing
    showSection("introduction");
}

init();