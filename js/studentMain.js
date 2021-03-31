/*
ZOE Team project
JS script file for student myQuiz page
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
    "questionDescription": "What is the lowest 4-digit number ?",
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
}];
let hardQuizArray = [{
    quizCourseName: "Math",
    quizName: "Math / 1",
    quizQuestions: hardQuestionArray,
    quizTime: "5"
}];


///////////////////////// General Functions ///////////////////////////

//to find an object inside an array of objects by key value
function findObjectByKey(array, keyString, valueString) {
    for (let i = 0; i < array.length; i++) {
        if (array[i][keyString] === valueString) {
            return array[i];
        }
    }
    return null;
}

//////////////// Filling Accordion side list ///////////////////////////

const quizListTrayEl = document.querySelector('#quizListTray');

let quizBankArray = [];


//GET latest version of Quiz Bank
function getQuizBank() {
    try {
        quizBankArray = JSON.parse(localStorage.quizBank);
    } catch (error) {
        quizBankArray = hardQuizArray;
        localStorage.setItem('quizBank', JSON.stringify(quizBankArray));
    }
}

let selectedQuiz;

function updateQuizList() {
    getQuizBank();
    //update the list of all quizzes
    for (let quiz of quizBankArray) {

        quizListTrayEl.innerHTML += `<a href="" class="zeoLink">${quiz.quizName}</a>`;

    }
}


let myQuizObject;


    quizListTrayEl.addEventListener('click', myEvent => {
        let myQuizName = myEvent.target.innerText;
        //
        let readyForQuiz = confirm(`are you ready for Quiz number ${myQuizName}`)
        if (readyForQuiz) window.open("./studentQuiz.html");

        localStorage.removeItem('myQuizObject');
        myQuizObject = findObjectByKey(quizBankArray, "quizName", myQuizName);
        //send it to local storage for further use
        localStorage.setItem('myQuizObject', JSON.stringify(myQuizObject))
    });





