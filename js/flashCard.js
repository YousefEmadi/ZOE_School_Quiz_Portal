/* ZOE Team project
    JS script file for flashCard page
    Date: 01-MAR-2021
 */


// DOM elements
const questionDisplayEl = document.querySelector("#questionDisplay");
const answerDisplayEl = document.querySelector("#answerDisplay");
const questionInputEl = document.querySelector("#questionInput");
const answerInputEl = document.querySelector("#answerInput");
const listOfDecksEl = document.querySelector("#listOfDecks");

const nextQuestionButtonEl = document.querySelector("#nextQuestionButton");
const showAnswerButtonEl = document.querySelector("#showAnswerButton");

const addCardButtonEl = document.querySelector("#addCardButton");
const saveButtonEl = document.querySelector("#saveButton");

const deleteCardButtonEl = document.querySelector("#deleteCardButton");
const cancelButtonEl = document.querySelector("#cancelButton");



let fromStorage;
let backToJson;
let deckName;
let array = [];

// Hard coded flashcards to auto-populate Local Storage
let mathArray = [{
    "question": "What is the only even prime number?",
    "answer": "The number 2"
}, {
    "question": "Which number is the sum of its multiples when you add the single digits together?",
    "answer": "9"
}, {
    "question": "What is the formula for the perimeter of a circle?",
    "answer": "C = 2π r"
}, {
    "question": "An improper fraction is always greater than what number?",
    "answer": "1"
}];

let biologyArray = [{
    "question": " What is the most common element in the human body?",
    "answer": "Oxygen"
}, {
    "question": "What is the scientific term for the production of light by living organisms?",
    "answer": "Bioluminescence"
}, {
    "question": "Unlike most other fish, sharks have no ______?",
    "answer": "Kidneys"
}, {
    "question": "What living animal has the heaviest brain?",
    "answer": "Sperm Whales (20 pounds)"
}];

let englishArray = [{
    "question": "What does \"minuscule\" mean?",
    "answer": "Very small"
}, {
    "question": "From which language does the name \"coyote\" originate?",
    "answer": "Aztec"
}, {
    "question": "What literary term means a word that has a similar meaning to another word?",
    "answer": "Synonym"
}, {
    "question": "As used in English, what is the meaning of the Latin phrase \"caveat emptor\"?",
    "answer": "Buyer Beware"
}];

let historyArray = [{
    "question": "Who was the first elected president of France’s Fifth Republic?",
    "answer": "Charles De Gaulle"
}, {
    "question": "Who was France’s youngest 20th-century president?",
    "answer": "Valéry Giscard d’Estaing"
}, {
    "question": "Which famous leader was buried in the Hôtel des Invalides in Paris?",
    "answer": "Napoleon Bonaparte"
}, {
    "question": "Which medieval queen was married to both Louis VII of France and Henry II of England?",
    "answer": "Eleanor of Aquitaine"
}];

let literatureArray = [{
    "question": "What is \"Les Miserables\" often called in English-speaking countries.",
    "answer": "\"Les Miz\""
}, {
    "question": "Which character sings \"Empty Chairs At Empty Tables\"?",
    "answer": "Marius"
}, {
    "question": "Which character sings the song \"Stars\"?",
    "answer": "Javert"
}, {
    "question": "Who wrote the novel \"Les Miserables\"?",
    "answer": "Victor Hugo"
}];

let physicsArray = [{
    "question": "What are the component parts of a battery called?",
    "answer": "Electric Cells"
}, {
    "question": "Dimples on golf balls help increase speed by reducing what?",
    "answer": "Drag"
}, {
    "question": "What is a space which is entirely devoid of matter called in science terms?",
    "answer": "Vacuum"
}, {
    "question": "According to Ohm's Law, what would the resistance be in a circuit with 40 volts and 8 amps?",
    "answer": "5 Ohms"
}];

// Store flashcards in respective locations in Local Storage
let fromMathStorage = localStorage.getItem("MATH:301");
let backToMathJson = JSON.parse(fromMathStorage);

let fromBiologyStorage = localStorage.getItem("BIOL:314");
let backToBiologyJson = JSON.parse(fromBiologyStorage);

let fromEnglishStorage = localStorage.getItem("ENGL:321");
let backToEnglishJson = JSON.parse(fromEnglishStorage);

let fromHistoryStorage = localStorage.getItem("HIST:358");
let backToHistoryJson = JSON.parse(fromHistoryStorage);

let fromLiteratureStorage = localStorage.getItem("FREN:325");
let backToLiteratureJson = JSON.parse(fromLiteratureStorage);

let fromPhysicsStorage = localStorage.getItem("PHYS:331");
let backToPhysicsJson = JSON.parse(fromPhysicsStorage);

// Store flashcards in respective locations in Local Storage on page load
function populateDecksOnLoad() {

    if (backToMathJson !== null) {
        console.log("Pray for no bugs!");
    } else {
        localStorage.setItem("MATH:301", JSON.stringify(mathArray));
        location.reload();
    }

    if (backToBiologyJson !== null) {

    } else {
        localStorage.setItem("BIOL:314", JSON.stringify(biologyArray));
        location.reload();
    }

    if (backToEnglishJson !== null) {

    } else {
        localStorage.setItem("ENGL:321", JSON.stringify(englishArray));
        location.reload();
    }

    if (backToHistoryJson !== null) {

    } else {
        localStorage.setItem("HIST:358", JSON.stringify(historyArray));
        location.reload();
    }

    if (backToLiteratureJson !== null) {

    } else {
        localStorage.setItem("FREN:325", JSON.stringify(literatureArray));
        location.reload();
    }

    if (backToPhysicsJson !== null) {

    } else {
        localStorage.setItem("PHYS:331", JSON.stringify(physicsArray));
        location.reload();
    }

}

// Mouse click to recognize innerText of element and direct user to correct flashcards
listOfDecksEl.addEventListener('click', displayQuestion);

function displayQuestion(myEvent) {

    nextQuestionButtonEl.style.display = "block";
    showAnswerButtonEl.style.display = "block";
    addCardButtonEl.style.display = "block";
    deleteCardButtonEl.style.display = "block";

    deckName = myEvent.target.innerText;
    fromStorage = localStorage.getItem(deckName);
    backToJson = JSON.parse(fromStorage);

    if (backToJson == null) {
        alert("The deck is empty");
        array = [];
        questionDisplayEl.innerHTML = "";
        answerDisplayEl.innerHTML = "";
        deckName = myEvent.target.innerText;
        console.log(deckName);

        const question = questionInputEl.value;
        const answer = answerInputEl.value;

        const card = {
            question: question,
            answer: answer
        };

        if (question !== "" && answer !== "") {
            array.push(card);
        } else {
            addCardButtonEl.style.display = "block";
            deleteCardButtonEl.style.display = "block";
        }
        localStorage.setItem(deckName, JSON.stringify(array));

        questionInputEl.value = "";
        answerInputEl.value = "";
        return;
    }

    if (backToJson.length === 0) {
        alert("The deck is empty");
        questionDisplayEl.innerHTML = "";
        answerDisplayEl.innerHTML = "";
        return;
    }

    questionDisplayEl.innerHTML = "";
    answerDisplayEl.innerHTML = "";
    questionDisplayEl.innerHTML = `${backToJson[0].question}`;

    index = 1;
}

// Iterate through questions and answers
function nextQuestion() {
    questionInputEl.style.display = "none";
    answerInputEl.style.display = "none";

    nextQuestionButtonEl.style.display = "block";
    showAnswerButtonEl.style.display = "block";
    addCardButtonEl.style.display = "block";
    deleteCardButtonEl.style.display = "block";

    saveButtonEl.style.display = "none";
    cancelButtonEl.style.display = "none";

    try {
        if (index > backToJson.length - 1) {
            index = 0
        }

        questionDisplayEl.innerHTML = `${backToJson[index].question}`;
        index++;
        answerDisplayEl.innerHTML = "";
    } catch (e) {
    }
}

function showAnswer() {
    try {
        answerDisplayEl.innerHTML = backToJson[index - 1].answer;
    } catch (e) {
    }
}

// Edit flashcard functions
function addNewCard() {

    questionDisplayEl.innerText = "";
    answerDisplayEl.innerText = "";
    saveButtonEl.style.display = "block";
    cancelButtonEl.style.display = "block";
    nextQuestionButtonEl.style.display = "none";
    showAnswerButtonEl.style.display = "none";
    addCardButtonEl.style.display = "none";
    deleteCardButtonEl.style.display = "none";

    questionInputEl.style.display = "block";
    answerInputEl.style.display = "block";
}

function saveNewCard() {

    nextQuestionButtonEl.style.display = "block";
    showAnswerButtonEl.style.display = "block";
    saveButtonEl.style.display = "none";
    cancelButtonEl.style.display = "none";

    fromStorage = localStorage.getItem(deckName);
    array = JSON.parse(fromStorage);

    const question = questionInputEl.value;
    const answer = answerInputEl.value;

    const card = {
        question: question,
        answer: answer
    };

    if (question !== "" && answer !== "") {
        array.push(card);
    } else {
        alert("Both fields must be filled");
    }
    localStorage.setItem(deckName, JSON.stringify(array));

    questionInputEl.value = "";
    answerInputEl.value = "";
    reload();
}


function deleteCard() {

    fromStorage = localStorage.getItem(deckName);
    backToJson = JSON.parse(fromStorage);
    backToJson.splice((index - 1), 1);
    localStorage.setItem(deckName, JSON.stringify(backToJson));
    reload();
}

function reload() {
    addCardButtonEl.style.display = "block";
    deleteCardButtonEl.style.display = "block";
    questionInputEl.style.display = "none";
    answerInputEl.style.display = "none";

    fromStorage = localStorage.getItem(deckName);
    backToJson = JSON.parse(fromStorage);

    if (backToJson.length === 0) {
        alert("The deck is empty");
        questionDisplayEl.innerHTML = "";
        answerDisplayEl.innerHTML = "";
        return;
    }

    questionDisplayEl.innerHTML = "";
    answerDisplayEl.innerHTML = "";
    questionDisplayEl.innerHTML = `${backToJson[0].question}`;

    index = 1;
}
