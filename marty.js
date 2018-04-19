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
  var subCorrect = document.getElementById("subCorrect");
  var subIncorrect = document.getElementById("subIncorrect");
  var multDisplay = document.getElementById("multDisplay");
  var multCorrect = document.getElementById("multCorrect");
  var multIncorrect = document.getElementById("multIncorrect");
  var divDisplay = document.getElementById("divDisplay");
  var divCorrect = document.getElementById("divCorrect");
  var divIncorrect = document.getElementById("divIncorrect");

  if (addDisplay.style.display === "" && (User.addCorrect >= 1 || User.addIncorrect >= 1)) {
    addDisplay.style.display = "block";
    addCorrect.innerHTML = User.addCorrect;
    addIncorrect.innerHTML = User.addIncorrect;
  } else if (addDisplay.style.display === "block") {
    addCorrect.innerHTML = User.addCorrect;
    addIncorrect.innerHTML = User.addIncorrect;
  }
  if (subDisplay.style.display === "" && (User.subCorrect >= 1 || User.subIncorrect >= 1)) {
    subDisplay.style.display = "block";
    subCorrect.innerHTML = User.subCorrect;
    subIncorrect.innerHTML = User.subIncorrect;
  } else if (subDisplay.style.display === "block") {
    subCorrect.innerHTML = User.subCorrect;
    subIncorrect.innerHTML = User.subIncorrect;
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

function validateAnswerInput(userAnswer, correctAnswer, answerTextbox, section) {
  var userCorrect = false;

  if (answerTextbox.style.backgroundColor === "white" || answerTextbox.style.backgroundColor === "") {
    if ((correctAnswer >= 1 && userAnswer >= 0) && userAnswer === correctAnswer) {
      setTextboxCorrect(answerTextbox);
      userCorrect = true;
    } else if (correctAnswer >= 0 && userAnswer >= 0){
      setTextboxIncorrect(answerTextbox);
      userCorrect = false;
    }

    if (userCorrect && User.name != "") {
      switch (section) {
        case "addition":
          User.addCorrect++;
          break;
        case "subtraction":
          User.subCorrect++;
          break;
        case "multiplication":
          User.multCorrect++;
          break;
        case "division":
          User.divCorrect++;
          break;
        default:
          console.log("error occured in validating answer");
      }
      checkUserStats();
    } else if (User.name != ""){
      switch (section) {
        case "addition":
          User.addIncorrect++;
          break;
        case "subtraction":
          User.subIncorrect++;
          break;
        case "multiplication":
          User.multIncorrect++;
          break;
        case "division":
          User.divIncorrect++;
          break;
        default:
          console.log("error occured in validating answer");
      }
      checkUserStats();
    }
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
  resetAnswerInput(answerTextbox);

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

function addCheckAnswer() {
  var answerTextbox = document.getElementById("addAnswerInput");
  var userAnswer = parseInt(answerTextbox.value);
  var leftNumber = parseInt(document.getElementById("addProblemLeft").innerHTML);
  var rightNumber = parseInt(document.getElementById("addProblemRight").innerHTML);
  var correctAnswer = leftNumber + rightNumber;

  validateAnswerInput(userAnswer, correctAnswer, answerTextbox, "addition");
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
 ######  ##     ## ########  ######## ########     ###     ######  ######## ####  #######  ##    ##
##    ## ##     ## ##     ##    ##    ##     ##   ## ##   ##    ##    ##     ##  ##     ## ###   ##
##       ##     ## ##     ##    ##    ##     ##  ##   ##  ##          ##     ##  ##     ## ####  ##
 ######  ##     ## ########     ##    ########  ##     ## ##          ##     ##  ##     ## ## ## ##
      ## ##     ## ##     ##    ##    ##   ##   ######### ##          ##     ##  ##     ## ##  ####
##    ## ##     ## ##     ##    ##    ##    ##  ##     ## ##    ##    ##     ##  ##     ## ##   ###
 ######   #######  ########     ##    ##     ## ##     ##  ######     ##    ####  #######  ##    ##
*/

function subCreateProblem(lowerLimit, upperLimit) {
  var leftNumber = document.getElementById("subProblemLeft");
  var rightNumber = document.getElementById("subProblemRight");
  leftNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  rightNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  while (parseInt(leftNumber.innerHTML) <= parseInt(rightNumber.innerHTML)) {
    leftNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
    rightNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  }
}

function subValidateLimits() {
  var subLowerLimit = parseInt(document.getElementById("subLowerLimit").value);
  var subUpperLimit = parseInt(document.getElementById("subUpperLimit").value);
  var errorDiv = document.querySelector("#subtraction .errorMessage");
  var answerTextbox = document.getElementById("subAnswerInput");
  errorDiv.style.display = "none";
  resetAnswerInput(answerTextbox);

  try {
    if (subLowerLimit != "" && subUpperLimit != "") {
      if (subLowerLimit < subUpperLimit) {
        subCreateProblem(subLowerLimit, subUpperLimit);
      } else if (subLowerLimit >= subUpperLimit) {
        throw "Lower Limit must be less than Upper Limit"
      }
    }
  }
  catch (msg) {
    errorDiv.innerHTML = msg;
    errorDiv.style.display = "block";
  }
}

function subCheckAnswer() {
  var answerTextbox = document.getElementById("subAnswerInput");
  var userAnswer = parseInt(answerTextbox.value);
  var leftNumber = parseInt(document.getElementById("subProblemLeft").innerHTML);
  var rightNumber = parseInt(document.getElementById("subProblemRight").innerHTML);
  var correctAnswer = leftNumber - rightNumber;

  validateAnswerInput(userAnswer, correctAnswer, answerTextbox, "subtraction");
}

function subDisplayAnswer() {
  var answerTextbox = document.getElementById("subAnswerInput");
  var correctAnswer = parseInt(document.getElementById("subProblemLeft").innerHTML) - parseInt(document.getElementById("subProblemRight").innerHTML);
  if (answerTextbox.style.backgroundColor != "lime" && correctAnswer >= 1) {
    if (User.name != "" && answerTextbox.value != correctAnswer) {
      User.subIncorrect++;
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
  var addNext = document.getElementById("addNextBtn");
  // subtraction buttons
  var subCheck = document.getElementById("subCheckBtn");
  var subAnswer = document.getElementById("subAnswerBtn");
  var subNext = document.getElementById("subNextBtn");
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
    addCheck.addEventListener("click", addCheckAnswer, false);
    addAnswer.addEventListener("click", addDisplayAnswer, false);
    addNext.addEventListener("click", addValidateLimits, false);
    // subtraction buttons
    subCheck.addEventListener("click", subCheckAnswer, false);
    subAnswer.addEventListener("click", subDisplayAnswer, false);
    subNext.addEventListener("click", subValidateLimits, false);

    /// text boxes
    // addition text boxes
    addLowerLimit.addEventListener("keyup", addValidateLimits, false);
    addUpperLimit.addEventListener("keyup", addValidateLimits, false);
    // subtraction text boxes
    subLowerLimit.addEventListener("keyup", subValidateLimits, false);
    subUpperLimit.addEventListener("keyup", subValidateLimits, false);
  } else if (unAccept.attachEvent) {
    /// buttons
    // username buttons
    unAccept.attachEvent("onclick", createUser);
    unClear.attachEvent("onclick", clearUsername);
    // addition buttons
    addCheck.attachEvent("onclick", addCheckAnswer);
    addAnswer.attachEvent("onclick", addDisplayAnswer);
    addNext.addEventListener("onclick", addValidateLimits);
    // subtraction buttons
    subCheck.attachEvent("onclick", subCheckAnswer);
    subAnswer.attachEvent("onclick", subDisplayAnswer);
    subNext.attachEvent("onclick", subValidateLimits);
    /// text boxes
    // addition text boxes
    addLowerLimit.attachEvent("onkeyup", addValidateLimits, false);
    addUpperLimit.attachEvent("onkeyup", addValidateLimits, false);
    // subtraction text boxes
    subLowerLimit.attachEvent("onkeyup", subValidateLimits);
    subUpperLimit.attachEvent("onkeyup", subValidateLimits);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}
