/*
    ZOE Team project
    JS script file for Teacher authoring page
    Date: 01-MAR-2021
 */

//////////////// Hard code data to send to local database ///////////////////////////

let hardQuestionArray = [{
    "courseName": "Math104",
    "questionDescription": "Which number is the only even and prime number?",
    "correctAnswer": "2",
    "wrongAnswer1": "1",
    "wrongAnswer2": "11",
    "wrongAnswer3": "3"
}, {
    "courseName": "Math104",
    "questionDescription": "If x = y and y = z then we have?",
    "correctAnswer": "x = z",
    "wrongAnswer1": "z",
    "wrongAnswer2": "x = yz",
    "wrongAnswer3": "y = xz"
}, {
    "courseName": "Math104",
    "questionDescription": "The lowest 4-digit number is ... ?",
    "correctAnswer": "1000",
    "wrongAnswer1": "999",
    "wrongAnswer2": "1111",
    "wrongAnswer3": "4000"
}, {
    "courseName": "Math104",
    "questionDescription": "Which is the formula to calculate the area of a square?",
    "correctAnswer": "side * side",
    "wrongAnswer1": "side * 2",
    "wrongAnswer2": "(side * side ) / 2",
    "wrongAnswer3": "side * 4"
}, {
    "courseName": "Math104",
    "questionDescription": "which one is equal 1.5 : 2.5",
    "correctAnswer": "3 : 5",
    "wrongAnswer1": "1 : 2",
    "wrongAnswer2": "15 : 5",
    "wrongAnswer3": "5.1 : 5.2"
}
];
let hardQuizArray = [{
    quizCourseName: "Math104",
    quizName: "Math / 1",
    quizQuestions: hardQuestionArray,
    quizTime: "25"
}];


//////////////// DOM Elements from HTML file ///////////////////////////
const courseNameEl = document.querySelector("#courseName");
const quizNameEl = document.querySelector("#quizName");

const questionNumberEl = document.querySelector("#questionNumber");
const questionDescriptionEl = document.querySelector("#questionDescription");
const correctAnswerEl = document.querySelector("#correctAnswer");
const wrongAnswer1El = document.querySelector("#wrongAnswer1");
const wrongAnswer2El = document.querySelector("#wrongAnswer2");
const wrongAnswer3El = document.querySelector("#wrongAnswer3");

const questionDivEl = document.querySelector("#questionDiv");

const quizDivEl = document.querySelector("#quizDiv");


// arrays to keep current session active on the RAM
let questionBankArray = [];
let currentQuiz = [];
let quizBankArray = [];


//////////////// General Functions ///////////////////////////

function goToTeacherQuizMainPage() {
    location.reload();
}

// hide question making items from the DOM
function questionDivOff() {
    questionDivEl.style.display = "none";
}

// display question making items from the DOM
function questionDivOn() {
    questionDivEl.style.display = "block";
}

// hide quiz view  from the DOM
function quizDivOff() {
    quizDivEl.style.display = "none";
}

// display quiz view  from the DOM
function quizDivOn() {
    quizDivEl.style.display = "block";
}


//GET the latest version of Question Bank
function getQuestionBank() {
    try {
        questionBankArray = JSON.parse(localStorage.questionBank);
    } catch (error) {
        questionBankArray = hardQuestionArray;
        localStorage.setItem('questionBank', JSON.stringify(questionBankArray));
    }
}

//PUSH to Question Bank
function pushToQuestionBank() {
    localStorage.setItem('questionBank', JSON.stringify(questionBankArray));
}

//GET latest version of Quiz Bank
function getQuizBank() {
    try {
        quizBankArray = JSON.parse(localStorage.quizBank);
    } catch (error) {
        quizBankArray = hardQuizArray;
        localStorage.setItem('quizBank', JSON.stringify(quizBankArray));
    }
}

//PUSH to Quiz Bank
function pushToQuizBank() {
    localStorage.setItem('quizBank', JSON.stringify(quizBankArray));
}


//to find an object inside an array of objects by key value
function findObjectByKey(array, keyString, valueString) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][keyString] === valueString) {
            return array[i];
        }
    }
    return null;
}

let myObj;

//////////////////////////  VALIDATION  ///////////////////
function valid() {
    myObj = document.getElementsByClassName('must');
    for (let i of myObj) {
        if (i.value === "") {
            window.alert("Incomplete items to create question or quiz");
            i.focus();
            return false;
        }
    }
    return true;

}

/////////////////////////////////////////////////////////////////////////////
//////////             QUIZ MAKING MODULE                ///////////////////
///////////////////////////////////////////////////////////////////////////

//counter and number assigner for each question of the current quiz
let questionNumber = 1;

//set-up the page for new quiz data entries
function newQuiz() {
    if (courseNameEl.value !== "") {
        quizDivOff();
        questionDivOn();
        questionNumber = 1;
        currentQuiz = [];
        newQuestion();
    } else
        alert("Select a Class");

}


function saveQuestion() {
    const question = {
        courseName: courseNameEl.value,
        questionDescription: questionDescriptionEl.value,
        correctAnswer: correctAnswerEl.value,
        wrongAnswer1: wrongAnswer1El.value,
        wrongAnswer2: wrongAnswer2El.value,
        wrongAnswer3: wrongAnswer3El.value,
    };
    //save question into questionBank array and also localStorage
    if (valid()) {
        questionBankArray.push(question);
        currentQuiz.push(question);
        questionNumberEl.innerHTML = `${questionNumber}`;
        questionNumber++;
    }

}

// just clear the input box in DOM for getting a new question
function newQuestion() {
    questionDescriptionEl.value = "";
    questionDescriptionEl.focus();
    correctAnswerEl.value = "";
    wrongAnswer1El.value = "";
    wrongAnswer2El.value = "";
    wrongAnswer3El.value = "";
    questionNumberEl.innerHTML = `${questionNumber}`;
}

function saveQuiz() {
    const quiz = {
        quizCourseName: courseNameEl.value,
        quizName: courseNameEl.value + " / " + (quizBankArray.length + 1).toString(),
        quizQuestions: currentQuiz,
        quizTime: ""
    };
    quiz.quizTime = prompt("Enter quiz time in minutes:");
    quizBankArray.push(quiz);
}


///////////////////////////////////////////////////////////////////////////////////
/////////////                SHOW QUIZ MODULE          ///////////////////////////
/////////////////////////////////////////////////////////////////////////////////


function updateQuizList() {
    //update the list of all quizzes
    for (let quiz of quizBankArray) {
        quizNameEl.innerHTML += `<option value="${quiz.quizName}">${quiz.quizName}</option><br>`;
    }
}


function showQuiz() {
    currentQuiz = findObjectByKey(quizBankArray, "quizName", quizNameEl.value);

    quizDivEl.innerHTML = `<h5>Class: ${currentQuiz.quizCourseName} <br> Quiz: ${quizNameEl.value} </h5><br/>`;


    let qCounter = 1;   //counter for trace the questions and IDs
    for (let question of currentQuiz.quizQuestions) {
        const newQuestionEl = document.createElement('div');
        quizDivEl.appendChild(newQuestionEl);

        newQuestionEl.innerHTML = `<h4>Question <span class="questionNumber">${qCounter}</span></h4>
        <input type="text" class="questionDescription u-full-width must"
               placeholder="&#x1F914; enter question" value="${question.questionDescription}">
        <input type="text" class="correctAnswer u-full-width must"
               placeholder="&#128522; correct answer" value="${question.correctAnswer}">
        <input type="text" class="wrongAnswer u-full-width must"
               placeholder="&#x1F61E; 1st wrong answer" value="${question.wrongAnswer1}">
        <input type="text" class="wrongAnswer u-full-width must"
               placeholder="&#x1F61E; 2nd wrong answer" value="${question.wrongAnswer2}">
        <input type="text" class="wrongAnswer u-full-width must"
               placeholder="&#x1F61E; 3rd wrong answer" value="${question.wrongAnswer3}"><hr>`;
        qCounter++;
    }

    quizDivEl.innerHTML += `
        <div class="buttonTopMargin centerAlign">
            <button class="button">Save</button>
            <button class="button" onclick="goToTeacherQuizMainPage()">Close</button>
            <button class="pushToQuestionBank button-primary"
                    onclick="pushToQuestionBank();pushToQuizBank();goToTeacherQuizMainPage()">Submit
            </button>
        </div>`;
}
