/*
SDEV 250 Semester Project
Marty Mammel
*/
"use strict";

/*
##     ##  ######  ######## ########  ##    ##    ###    ##     ## ########
##     ## ##    ## ##       ##     ## ###   ##   ## ##   ###   ### ##
##     ## ##       ##       ##     ## ####  ##  ##   ##  #### #### ##
##     ##  ######  ######   ########  ## ## ## ##     ## ## ### ## ######
##     ##       ## ##       ##   ##   ##  #### ######### ##     ## ##
##     ## ##    ## ##       ##    ##  ##   ### ##     ## ##     ## ##
 #######   ######  ######## ##     ## ##    ## ##     ## ##     ## ########
*/

var User = { name: "" };

function createUser() {
  var usernameInput = document.getElementById("usernameInput").value;
  if (validateUsername(usernameInput)) {
    // Create user object
    User.createdDate = new Date();
    User.name = usernameInput;
    User.addCorrect = 0;
    User.addIncorrect = 0;
    User.subCorrect = 0;
    User.subIncorrect = 0;
    User.multCorrect = 0;
    User.multIncorrect = 0;
    User.divCorrect = 0;
    User.divIncorrect = 0;

    document.getElementById("username").innerHTML = User.name;

    // Hide input, show username
    document.getElementById("inputData").style.display = "none";
    document.getElementById("displayData").style.display = "block";
    document.getElementById("username").style.display = "block";
  }
}

function validateUsername(usernameInput) {
  var validInputs = /^[0-9a-zA-Z_\s]+$/;
  var errorDiv = document.querySelector("#inputData .errorMessage");
  try {
    errorDiv.style.display = "none";
    if (usernameInput !== "" && usernameInput.match(validInputs) && usernameInput[0] !== " " && usernameInput[0] !== "_" && usernameInput.length <= 25) {
      return true;
    } else if (usernameInput === "") {
      throw "Name must be at least 1 character"
    } else if (usernameInput[0] === " " || usernameInput[0] === "_") {
      throw "Name must begin with a letter or number"
    } else if (usernameInput.length > 25) {
      throw "Name must be shorter than 25 characters"
    } else {
      throw "Name can only contain letters, numbers, and _"
    }
  }
  catch (msg) {
    errorDiv.innerHTML = msg;
    errorDiv.style.display = "block";
    return false;
  }
}

function clearUsername() {
  var errorDiv = document.querySelector("#inputData .errorMessage");
  document.getElementById("usernameInput").value = "";
  errorDiv.style.display = "none";
}

function checkUserStats() {
  var addDisplay = document.getElementById("addDisplay");
  var addCorrect = document.getElementById("addCorrect");
  var addIncorrect = document.getElementById("addIncorrect");
  var subDisplay = document.getElementById("subDisplay");
  var subCorrect = document.getElementById("addCorrect");
  var subIncorrect = document.getElementById("addIncorrect");
  var multDisplay = document.getElementById("multDisplay");
  var multCorrect = document.getElementById("addCorrect");
  var multIncorrect = document.getElementById("addIncorrect");
  var divDisplay = document.getElementById("divDisplay");
  var divCorrect = document.getElementById("addCorrect");
  var divIncorrect = document.getElementById("addIncorrect");

  if (addDisplay.style.display === "" && (User.addCorrect >= 1 || User.addIncorrect >= 1)) {
    addDisplay.style.display = "block";
    addCorrect.innerHTML = User.addCorrect;
    addIncorrect.innerHTML = User.addIncorrect;
  } else if (addDisplay.style.display === "block") {
    addCorrect.innerHTML = User.addCorrect;
    addIncorrect.innerHTML = User.addIncorrect;
  }
}

/*
##     ##    ###    ##       #### ########     ###    ######## ####  #######  ##    ##
##     ##   ## ##   ##        ##  ##     ##   ## ##      ##     ##  ##     ## ###   ##
##     ##  ##   ##  ##        ##  ##     ##  ##   ##     ##     ##  ##     ## ####  ##
##     ## ##     ## ##        ##  ##     ## ##     ##    ##     ##  ##     ## ## ## ##
 ##   ##  ######### ##        ##  ##     ## #########    ##     ##  ##     ## ##  ####
  ## ##   ##     ## ##        ##  ##     ## ##     ##    ##     ##  ##     ## ##   ###
   ###    ##     ## ######## #### ########  ##     ##    ##    ####  #######  ##    ##
*/

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function validateAnswerInput(userAnswer, correctAnswer, answerTextbox) {
  if (userAnswer === correctAnswer) {
    setTextboxCorrect(answerTextbox);
    return true;
  } else {
    setTextboxIncorrect(answerTextbox);
    return false;
  }
}

function setTextboxCorrect(answerTextbox) {
  answerTextbox.style.backgroundColor = "lime";
  answerTextbox.disabled = true;
}

function setTextboxIncorrect(answerTextbox) {
  answerTextbox.style.backgroundColor = "red";
  answerTextbox.disabled = true;
}

function resetAnswerInput(answerTextbox) {
  answerTextbox.style.backgroundColor = "white";
  answerTextbox.value = "";
  answerTextbox.disabled = false;
}

/*
   ###    ########  ########  #### ######## ####  #######  ##    ##
  ## ##   ##     ## ##     ##  ##     ##     ##  ##     ## ###   ##
 ##   ##  ##     ## ##     ##  ##     ##     ##  ##     ## ####  ##
##     ## ##     ## ##     ##  ##     ##     ##  ##     ## ## ## ##
######### ##     ## ##     ##  ##     ##     ##  ##     ## ##  ####
##     ## ##     ## ##     ##  ##     ##     ##  ##     ## ##   ###
##     ## ########  ########  ####    ##    ####  #######  ##    ##
*/

function addCreateProblem(lowerLimit, upperLimit) {
  var leftNumber = document.getElementById("addProblemLeft");
  var rightNumber = document.getElementById("addProblemRight");
  leftNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  rightNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
}

function addValidateLimits() {
  var addLowerLimit = parseInt(document.getElementById("addLowerLimit").value);
  var addUpperLimit = parseInt(document.getElementById("addUpperLimit").value);
  var errorDiv = document.querySelector("#addition .errorMessage");
  var answerTextbox = document.getElementById("addAnswerInput");
  errorDiv.style.display = "none";
  resetAnswerInput(document.getElementById("addAnswerInput"));

  try {
    if (addLowerLimit != "" && addUpperLimit != "") {
        if (addLowerLimit < addUpperLimit) {
          addCreateProblem(addLowerLimit, addUpperLimit);
        } else if (addLowerLimit >= addUpperLimit) {
          throw "Lower Limit must be less than Upper Limit"
        }
      }
    }
  catch (msg) {
    errorDiv.innerHTML = msg;
    errorDiv.style.display = "block";
  }
}

function checkAddAnswer() {
  var answerTextbox = document.getElementById("addAnswerInput");
  var userAnswer = parseInt(answerTextbox.value);
  var leftNumber = parseInt(document.getElementById("addProblemLeft").innerHTML);
  var rightNumber = parseInt(document.getElementById("addProblemRight").innerHTML);
  var correctAnswer = leftNumber + rightNumber;

  if (userAnswer && correctAnswer && (answerTextbox.style.backgroundColor === "white" || answerTextbox.style.backgroundColor === "")) {
    if (validateAnswerInput(userAnswer, correctAnswer, answerTextbox) && User.name != "") {
      User.addCorrect++
    } else if (User.name != ""){
      User.addIncorrect++
    }
  }

  if (User.name != "") {
    checkUserStats();
  }
}

function addDisplayAnswer() {
  var answerTextbox = document.getElementById("addAnswerInput");
  var correctAnswer = parseInt(document.getElementById("addProblemLeft").innerHTML) + parseInt(document.getElementById("addProblemRight").innerHTML);
  if (answerTextbox.style.backgroundColor != "lime" && correctAnswer >= 2) {
    if (User.name != "" && answerTextbox.value != correctAnswer) {
      User.addIncorrect++;
      checkUserStats();
    }
    answerTextbox.value = correctAnswer;
    setTextboxIncorrect(answerTextbox);
  }
}

/*
######## ##     ## ######## ##    ## ########
##       ##     ## ##       ###   ##    ##
##       ##     ## ##       ####  ##    ##
######   ##     ## ######   ## ## ##    ##
##        ##   ##  ##       ##  ####    ##
##         ## ##   ##       ##   ###    ##
########    ###    ######## ##    ##    ##

##       ####  ######  ######## ######## ##    ## ######## ########   ######
##        ##  ##    ##    ##    ##       ###   ## ##       ##     ## ##    ##
##        ##  ##          ##    ##       ####  ## ##       ##     ## ##
##        ##   ######     ##    ######   ## ## ## ######   ########   ######
##        ##        ##    ##    ##       ##  #### ##       ##   ##         ##
##        ##  ##    ##    ##    ##       ##   ### ##       ##    ##  ##    ##
######## ####  ######     ##    ######## ##    ## ######## ##     ##  ######
*/

function createEventListeners() {
  /// variables to store buttons
  // username buttons
  var unAccept = document.getElementById("usernameAcceptBtn");
  var unClear = document.getElementById("usernameClearBtn");
  // addition buttons
  var addCheck = document.getElementById("addCheckBtn");
  var addAnswer = document.getElementById("addAnswerBtn");
  var addNext = document.getElementById("addNextBtn"); //TODO
  // subtraction buttons
  var subCheck = document.getElementById("subCheckBtn"); //TODO
  var subAnswer = document.getElementById("subAnswerBtn"); //TODO
  var subNext = document.getElementById("subNextBtn"); //TODO
  // multiplication buttons
  var multCheck = document.getElementById("multCheckBtn"); //TODO
  var multAnswer = document.getElementById("multAnswerBtn"); //TODO
  var multNext = document.getElementById("multNextBtn"); //TODO
  // division buttons
  var divCheck = document.getElementById("divCheckBtn"); //TODO
  var divAnswer = document.getElementById("divAnswerBtn"); //TODO
  var divNext = document.getElementById("divNextBtn"); //TODO
  // collatz button
  var collatzCheck = document.getElementById("collatzCheck"); //TODO

  /// variables to store text boxes
  // addition text boxes
  var addLowerLimit = document.getElementById("addLowerLimit");
  var addUpperLimit = document.getElementById("addUpperLimit");
  // subtraction text boxes
  var subLowerLimit = document.getElementById("subLowerLimit"); //TODO
  var subUpperLimit = document.getElementById("subUpperLimit"); //TODO
  // multiplication text boxes
  var multLowerLimit = document.getElementById("multLowerLimit"); //TODO
  var multUpperLimit = document.getElementById("multUpperLimit"); //TODO
  // division text boxes
  var divLowerLimit = document.getElementById("divLowerLimit"); //TODO
  var divUpperLimit = document.getElementById("divUpperLimit"); //TODO

  if (unAccept.addEventListener) {
    /// buttons
    // username buttons
    unAccept.addEventListener("click", createUser, false);
    unClear.addEventListener("click", clearUsername, false);
    // addition buttons
    addCheck.addEventListener("click", checkAddAnswer, false);
    addAnswer.addEventListener("click", addDisplayAnswer, false);
    addNext.addEventListener("click", addValidateLimits, false);

    /// text boxes
    // addition text boxes
    addLowerLimit.addEventListener("keyup", addValidateLimits, false);
    addUpperLimit.addEventListener("keyup", addValidateLimits, false);
  } else if (unAccept.attachEvent) {
    /// buttons
    // username buttons
    unAccept.attachEvent("onclick", createUser);
    unClear.attachEvent("onclick", clearUsername);
    // addition buttons
    addCheck.attachEvent("onclick", checkAddAnswer);
    addAnswer.attachEvent("onclick", addDisplayAnswer);
    addNext.addEventListener("onclick", addValidateLimits);

    /// text boxes
    // addition text boxes
    addLowerLimit.attachEvent("onkeyup", addValidateLimits, false);
    addUpperLimit.attachEvent("onkeyup", addValidateLimits, false);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}
