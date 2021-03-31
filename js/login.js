/* ZOE Team project
    JS script file for login page
    Date: 01-MAR-2021
 */

// DOM elements
const firstNameEl = document.querySelector("#firstName");
const lastNameEl = document.querySelector("#lastName");
const userNameEl = document.querySelector("#userName");
const passwordEl = document.querySelector("#password");
const typeEl = document.querySelector("#type");
const languageEl = document.querySelector("#language");
const masterPasswordEl = document.querySelector("#masterPassword");
const studentNameEl = document.querySelector("#studentName");
const teacherNameEl = document.querySelector("#teacherName");
const adminPassword = "webDesign";

// Hard coded users to auto-populate Local Storage
let hardArray = [{
    "firstName": "Jerome",
    "lastName": "Olivier",
    "userName": "jerome.olivier@zoe.com",
    "password": "Jerome1234",
    "type": "student",
    "language": "french"
}, {
    "firstName": "Anthony",
    "lastName": "Zampino",
    "userName": "anthony.zampino@zoe.com",
    "password": "Anthony1234",
    "type": "student",
    "language": "english"
}, {
    "firstName": "Yousef",
    "lastName": "Emadi",
    "userName": "yousef.emadi@zoe.com",
    "password": "Yousef1234",
    "type": "student",
    "language": "english"
}, {
    "firstName": "Daou",
    "lastName": "Khattar",
    "userName": "daou.khattar@zoe.com",
    "password": "Daou1234",
    "type": "teacher",
    "language": "french"
}, {
    "firstName": "Aakash",
    "lastName": "Malhotra",
    "userName": "aakash.malhotra@zoe.com",
    "password": "Aakash1234",
    "type": "teacher",
    "language": "english"
}];


let firstName;
let lastName;
let userName;
let password;
let type;
let language;
let masterPassword;

let fromStorage = localStorage.getItem("login");
let backToJson = JSON.parse(fromStorage);


function populateOnLoad() {

    if (backToJson !== null) {
        console.log("Pray for no bugs!");
    } else {
        localStorage.setItem("login", JSON.stringify(hardArray));
        location.reload();
    }
}

function createAccount() {

    firstName = firstNameEl.value.trim();
    lastName = lastNameEl.value.trim();
    userName = userNameEl.value.trim();
    password = passwordEl.value.trim();
    type = typeEl.value.trim();
    language = languageEl.value.trim();
    masterPassword = masterPasswordEl.value.trim();

    // create object to push to array
    let user = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        password: password,
        type: type,
        language: language
    };

    if (firstName !== "" && lastName !== "" && userName !== "" && password !== "" && type !== "empty" && language !== "empty" && masterPassword === adminPassword) {

        // Regular expressions for username and password requirements
        const userNameRegex = /@zoe.com/;
        const userNameValidator = userNameRegex.test(userName);

        const passwordRegex = /(?=.*[A-Z])(?=.*[0-9])(.{8,})/;
        const passwordValidator = passwordRegex.test(password);

        //Check if user is already created
        if (backToJson.some(function (person) {
            return person.userName === userName;
        })) {
            alert("User already exists");
            return;
        }

        // Create user
        if (passwordValidator && userNameValidator) {
            fromStorage = localStorage.getItem("login");
            backToJson = JSON.parse(fromStorage);
            backToJson.push(user);
            localStorage.setItem("login", JSON.stringify(backToJson));
            alert("Account successfully created");
            window.location.href = "index.html";
        } else if (!passwordValidator && userNameValidator) {
            alert("Password must be at least 8 characters and must contain at least 1 uppercase letter and 1" +
                " number");
        } else if (passwordValidator && !userNameValidator) {
            alert("Username must include @zoe.com");
        } else
            alert("Username must include @zoe.com AND password must be at least 8 characters and must contain at" +
                " least 1 uppercase letter and 1" +
                " number");

    }

    // Validation
    if (firstName === "" || lastName === "" || userName === "" || password === "" || type === "empty" || language === "empty") {
        alert("All fields must be filled");
        location.reload();
    } else if (masterPassword !== adminPassword && masterPassword !== "") {
        alert("Admin password incorrect");
        location.reload();
    }
}

function logIn() {

    userName = userNameEl.value;
    password = passwordEl.value;

    let fromStorage = localStorage.getItem("login");
    let backToJson = JSON.parse(fromStorage);
    let flag = true;

    // Compare login info received with data in local storage for successful login
    // Redirect user to french or english page depending on language chosen when user was created
    if (userName !== "" && password !== "") {

        try {
            for (let i = 0; i < backToJson.length; i++) {
                if (userName === backToJson[i].userName && password === backToJson[i].password) {
                    switch (backToJson[i].type) {
                        case "teacher":
                            if (backToJson[i].language === "english") {
                                window.location.href = "teacherMain.html";
                            } else {
                                window.location.href = "fr/teacherMain_FR.html";
                            }
                            flag = false;
                            localStorage.setItem("teacherName", backToJson[i].firstName + " " + backToJson[i].lastName);
                            break;

                        case "student":
                            if (backToJson[i].language === "english") {
                                window.location.href = "studentMain.html";
                            } else {
                                window.location.href = "fr/studentMain_FR.html";
                            }
                            flag = false;
                            localStorage.setItem("studentName", backToJson[i].firstName + " " + backToJson[i].lastName);

                    }
                }
            }
            // Check for mistakes in login
        } catch (e) {
            if (userName !== "" && password !== "" && flag) {
                alert("Wrong credentials");
                userNameEl.value = "";
                passwordEl.value = "";
                return;
            }
        }
        if (userName !== "" && password !== "" && flag) {
            alert("Wrong credentials");
            userNameEl.value = "";
            passwordEl.value = "";
        }
    }
    if (userName === "" || password === "") {
        alert("Please fill in both fields");
    }
}

function displayStudentName() {
    studentNameEl.innerText = localStorage.getItem("studentName");
}

function displayTeacherName() {
    teacherNameEl.innerText = localStorage.getItem("teacherName");
}






