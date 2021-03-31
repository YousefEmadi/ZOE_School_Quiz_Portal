/* ZOE Team project
    JS script file for Teacher authoring page
    Date: 01-MAR-2021
 */

////////////////            DOM Elements            ///////////////////////////
const courseNameEl = document.querySelector("#courseName");
const questionDescriptionEl = document.querySelector("#questionDescription");
const correctAnswerEl = document.querySelector("#correctAnswer");
const wrongAnswer1El = document.querySelector("#wrongAnswer1");
const wrongAnswer2El = document.querySelector("#wrongAnswer2");
const wrongAnswer3El = document.querySelector("#wrongAnswer3");

const historyDivEl = document.querySelector("#historyDiv");

const quizNameEl = document.querySelector("#quizName");
const quizTimeEl = document.querySelector("#quizTime");


let currentQuestionArray = [];
let currentAllQuizArray = [];
////////////////            Local Storage PUSH and GET      ///////////////////////////

//PUSH to Question Bank
function pushToQuestionBank() {
    localStorage.setItem('mainQuestionBank', JSON.stringify(currentQuestionArray));
}

//GET latest version of Question Bank
function getFromQuestionBank() {
    return JSON.parse(localStorage.mainQuestionBank);
}

////////////////            Genera Functions      ///////////////////////////

//to find an object inside an array of objects by key value
function findObjectByKey(array, keyString, valueString) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][keyString] === valueString) {
            return array[i];
        }
    }
    return null;
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////                  QUESTION MODULE                //////////////////////
///////////////////////////////////////////////////////////////////////////////////////

////////////////            Creating Questions       ///////////////////////////

//update operation array with the latest local storage version
currentQuestionArray = getFromQuestionBank();

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
    currentQuestionArray.push(question);
}

// just clear the input box in DOM for getting a new question
function newQuestion() {
    questionDescriptionEl.value = "";
    correctAnswerEl.value = "";
    wrongAnswer1El.value = "";
    wrongAnswer2El.value = "";
    wrongAnswer3El.value = "";
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////                  BROWSE MODULE                ////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

////////////////            Browsing the Questions       ///////////////////////////

// index for question browsing in array of questionBank
let index = -1;

function nextQuestion() {

    //fetch the latest version of questionBank from LocalStorage
    let currentQuestionArray = getFromQuestionBank();
    index++;
    if (index > currentQuestionArray.length - 1 || index < 0) index = 0;
    historyDivEl.innerHTML =
        "Course: " + currentQuestionArray[index].quizCourseName
        + "<br> Q: " + currentQuestionArray[index].questionDescription
        + "<br> ? A: " + currentQuestionArray[index].correctAnswer;
}

function previousQuestion() {

    //fetch the latest version of questionBank from LocalStorage
    let currentQuestionArray = getFromQuestionBank();
    index--;
    if (index < 0 || index > currentQuestionArray.length - 1) index = currentQuestionArray.length - 1;

    historyDivEl.innerHTML =
        "Course: " + currentQuestionArray[index].quizCourseName
        + "<br> Q: " + currentQuestionArray[index].questionDescription
        + "<br> ? A: " + currentQuestionArray[index].correctAnswer;
}


////////////////            deleting a Question       ///////////////////////////

function deleteQuestion() {

    currentQuestionArray.splice(index, 1);

    historyDivEl.innerHTML = "Question Removed";
    if (currentQuestionArray.length === 0) historyDivEl.innerHTML = "Question Repository is Empty";

    //update Question Bank
    pushToQuestionBank();
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////                  QUIZ MAKER MODULE                ////////////////////
///////////////////////////////////////////////////////////////////////////////////////

////////////////            select a Question for quiz      ///////////////////////////


//PUSH to Quiz Bank
function pushToQuizBank() {
    localStorage.setItem('mainQuizBank', JSON.stringify(currentAllQuizArray));
}

//GET latest version of Quiz Bank
function getFromQuizBank() {
    return JSON.parse(localStorage.mainQuizBank);
}

//start a new and fresh session based on local storage data
function startQuizSession() {
    currentAllQuizArray = getFromQuizBank();
    currentQuiz = [];
    quizNameEl.value = "";
    quizTimeEl.value = "";
}

let currentQuiz = [];

function selectQuestionForQuiz() {
    currentQuiz.push(currentQuestionArray[index]);
}

function saveQuiz() {
    const quiz = {
        quizCourseName: currentQuestionArray[index].courseName,
        quizName: quizNameEl.value,
        quizTime: quizTimeEl.value,
        quizQuestions: currentQuiz,
    };
    //save question into questionBank array and also localStorage
    currentAllQuizArray.push(quiz);
}


////////////////////////////////////////////////////////////////////////////////////////
////////////////                  SHOW QUIZ MODULE          ///////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

const showQuizListDivEl = document.querySelector('#showQuizListDiv');

let myQuizObject;

function showQuizList() {
    const quizNameEl = document.createElement("div");

    //update the list of all quizzes
    currentAllQuizArray = getFromQuizBank();
    for (let quizItem of currentAllQuizArray) {
        quizNameEl.innerHTML += `<button> ${quizItem.quizName}</button><br>`;
    }
    showQuizListDivEl.appendChild(quizNameEl);
}

showQuizListDivEl.addEventListener('click', myEvent => {
    let myQuizName = myEvent.target.innerText;
    let readyForQuiz = confirm(`are you ready for ${myQuizName}`);
    if (readyForQuiz) window.open("./myQuiz.html");
    localStorage.removeItem('myQuizObject');
    myQuizObject = findObjectByKey(currentAllQuizArray, "quizName", myQuizName);
    //send it to local storage for further use
    localStorage.setItem('myQuizObject', JSON.stringify(myQuizObject));

});
