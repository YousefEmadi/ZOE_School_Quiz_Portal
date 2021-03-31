/* ZOE Team project
    JS script file for student myQuiz page
    Date: 01-MAR-2021
 */


////////////////////////////////////////////////////////////////////////////////////////
////////////////                  General Functions                       //////////////
///////////////////////////////////////////////////////////////////////////////////////

//array shuffler function
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

//general function for creating an array of random multiple choices of a question
function ArrayOfMultipleChoices(question){
    let multipleChoices = [];
    multipleChoices.push(question.correctAnswer);
    multipleChoices.push(question.wrongAnswer1);
    multipleChoices.push(question.wrongAnswer2);
    multipleChoices.push(question.wrongAnswer3);

    shuffle(multipleChoices)
    return multipleChoices;
}

// general function to generate a random number btw 0 and max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


////////////////            DOM Elements            ///////////////////////////

const quizPageEl = document.querySelector('#quizPage')
const myQuizTitleEl = document.querySelector('#myQuizTitle')
const myQuizCourseNameEl = document.querySelector('#myQuizCourseName')
const myQuizTimeEl = document.querySelector('#myQuizTime')
const numberOfQuestionsEl = document.querySelector('#numberOfQuestions')
const quizBodyEl = document.querySelector('#quizBody')

//fetch the selected quiz
let myQuizObject = JSON.parse(localStorage.myQuizObject)



////////////////////////////////////////////////////////////////////////////////////////
////////////////                  Building the Quiz DOM and Content      ///////////////
///////////////////////////////////////////////////////////////////////////////////////

myQuizTitleEl.innerHTML = "Quiz : " + myQuizObject.quizName
    + "<br>" + myQuizObject.quizQuestions.length
    + " questions, " + myQuizObject.quizTime + " minutes";

// loop part to list questions description and choices
qCounter = 1   //counter for trace the questions and IDs
for (let question of myQuizObject.quizQuestions) {
    const newQuestionEl = document.createElement('fieldset');
    quizBodyEl.appendChild(newQuestionEl);
    newQuestionEl.setAttribute('class', 'quiz')

    //random choices
    const choices = ArrayOfMultipleChoices(question)



    newQuestionEl.innerHTML =
        `<div id="question1"></div>
                        <p>${qCounter} ) <span id="question${qCounter}">${question.questionDescription}</span></p>
                        <div>
                            <input type="radio" class="radioBuffer selected" id="choice1"
                                   name="choice${qCounter}" value="${choices[0]}">
                            <label for="choice1" class="inline">${choices[0]}</label>
                        </div>
                       <div>
                            <input type="radio" class="radioBuffer selected" id="choice2"
                                   name="choice${qCounter}" value="${choices[1]}">
                            <label for="choice2" class="inline">${choices[1]}</label>
                        </div>
                        <div>
                            <input type="radio" class="radioBuffer selected" id="choice3"
                                   name="choice${qCounter}" value="${choices[2]}">
                            <label for="choice3" class="inline">${choices[2]}</label>
                        </div>
                        <div>
                            <input type="radio" class="radioBuffer selected" id="choice4"
                                   name="choice${qCounter}" value="${choices[3]}">
                            <label for="choice4" class="inline">${choices[3]}</label>
                        </div>`;


    qCounter++
}




////////////////////////////////////////////////////////////////////////////////////////
////////////////                  Quiz Grading Module                //////////////////
///////////////////////////////////////////////////////////////////////////////////////


//create the key of the quiz
let quizKey = [];
for (let question of myQuizObject.quizQuestions){
    quizKey.push(question.correctAnswer);
}

//creat the student answer sheet
let answerSheet = []
function answerSheetUpdate(){
    answerSheet=[];
    const resultObj = document.getElementsByClassName('selected');
    for (i of resultObj) if (i.checked) answerSheet.push(i.defaultValue)
}

//function to tally the marks via comparing key and answer sheet
function quizMarkCalculator(){
    let mark = 0;
    for (let i = 0; i< quizKey.length; i++)
        if (quizKey[i] === answerSheet[i]) mark++
    return mark
}

//main function to show the result
function submitQuiz(){
    answerSheetUpdate();
    if (confirm("are u sure?") && (answerSheet.length === quizKey.length)){
        alert(`submitted successfully and your mark is ${quizMarkCalculator()} of ${quizKey.length}`);
        window.close();
        window.open("./studentMain.html");
    }
    else
        alert ('Answer all questions and the submit again');
}

