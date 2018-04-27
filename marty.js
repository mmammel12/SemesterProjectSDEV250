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
  if (multDisplay.style.display === "" && (User.multCorrect >= 1 || User.multIncorrect >= 1)) {
    multDisplay.style.display = "block";
    multCorrect.innerHTML = User.multCorrect;
    multIncorrect.innerHTML = User.multIncorrect;
  } else if (multDisplay.style.display === "block") {
    multCorrect.innerHTML = User.multCorrect;
    multIncorrect.innerHTML = User.multIncorrect;
  }
  if (divDisplay.style.display === "" && (User.divCorrect >= 1 || User.divIncorrect >= 1)) {
    divDisplay.style.display = "block";
    divCorrect.innerHTML = User.divCorrect;
    divIncorrect.innerHTML = User.divIncorrect;
  } else if (divDisplay.style.display === "block") {
    divCorrect.innerHTML = User.divCorrect;
    divIncorrect.innerHTML = User.divIncorrect;
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
          addUpperLimit++;
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
        subUpperLimit++;
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
##     ## ##     ## ##       ######## #### ########  ##       ####  ######     ###    ######## ####  #######  ##    ##
###   ### ##     ## ##          ##     ##  ##     ## ##        ##  ##    ##   ## ##      ##     ##  ##     ## ###   ##
#### #### ##     ## ##          ##     ##  ##     ## ##        ##  ##        ##   ##     ##     ##  ##     ## ####  ##
## ### ## ##     ## ##          ##     ##  ########  ##        ##  ##       ##     ##    ##     ##  ##     ## ## ## ##
##     ## ##     ## ##          ##     ##  ##        ##        ##  ##       #########    ##     ##  ##     ## ##  ####
##     ## ##     ## ##          ##     ##  ##        ##        ##  ##    ## ##     ##    ##     ##  ##     ## ##   ###
##     ##  #######  ########    ##    #### ##        ######## ####  ######  ##     ##    ##    ####  #######  ##    ##
*/

function multCreateProblem(lowerLimit, upperLimit) {
  var leftNumber = document.getElementById("multProblemLeft");
  var rightNumber = document.getElementById("multProblemRight");
  leftNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  rightNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
}

function multValidateLimits() {
  var multLowerLimit = parseInt(document.getElementById("multLowerLimit").value);
  var multUpperLimit = parseInt(document.getElementById("multUpperLimit").value);
  var errorDiv = document.querySelector("#multiplication .errorMessage");
  var answerTextbox = document.getElementById("multAnswerInput");
  errorDiv.style.display = "none";
  resetAnswerInput(answerTextbox);

  try {
    if (multLowerLimit != "" && multUpperLimit != "") {
      if (multLowerLimit < multUpperLimit) {
        multUpperLimit++;
        multCreateProblem(multLowerLimit, multUpperLimit);
      } else if (multLowerLimit >= multUpperLimit) {
        throw "Lower Limit must be less than Upper Limit"
      }
    }
  }
  catch (msg) {
    errorDiv.innerHTML = msg;
    errorDiv.style.display = "block";
  }
}

function multCheckAnswer() {
  var answerTextbox = document.getElementById("multAnswerInput");
  var userAnswer = parseInt(answerTextbox.value);
  var leftNumber = parseInt(document.getElementById("multProblemLeft").innerHTML);
  var rightNumber = parseInt(document.getElementById("multProblemRight").innerHTML);
  var correctAnswer = leftNumber * rightNumber;

  validateAnswerInput(userAnswer, correctAnswer, answerTextbox, "multiplication");
}

function multDisplayAnswer() {
  var answerTextbox = document.getElementById("multAnswerInput");
  var correctAnswer = parseInt(document.getElementById("multProblemLeft").innerHTML) * parseInt(document.getElementById("multProblemRight").innerHTML);
  if (answerTextbox.style.backgroundColor != "lime" && correctAnswer >= 1) {
    if (User.name != "" && answerTextbox.value != correctAnswer) {
      User.multIncorrect++;
      checkUserStats();
    }
    answerTextbox.value = correctAnswer;
    setTextboxIncorrect(answerTextbox);
  }
}

/*
########  #### ##     ## ####  ######  ####  #######  ##    ##
##     ##  ##  ##     ##  ##  ##    ##  ##  ##     ## ###   ##
##     ##  ##  ##     ##  ##  ##        ##  ##     ## ####  ##
##     ##  ##  ##     ##  ##   ######   ##  ##     ## ## ## ##
##     ##  ##   ##   ##   ##        ##  ##  ##     ## ##  ####
##     ##  ##    ## ##    ##  ##    ##  ##  ##     ## ##   ###
########  ####    ###    ####  ######  ####  #######  ##    ##

*/

function divCreateProblem(lowerLimit, upperLimit) {
  var leftNumber = document.getElementById("divProblemLeft");
  var rightNumber = document.getElementById("divProblemRight");
  leftNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  rightNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  while (parseInt(leftNumber.innerHTML) % parseInt(rightNumber.innerHTML) != 0) {
    leftNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
    rightNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
  }
}

function divValidateLimits() {
  var divLowerLimit = parseInt(document.getElementById("divLowerLimit").value);
  var divUpperLimit = parseInt(document.getElementById("divUpperLimit").value);
  var errorDiv = document.querySelector("#division .errorMessage");
  var answerTextbox = document.getElementById("divAnswerInput");
  errorDiv.style.display = "none";
  resetAnswerInput(answerTextbox);

  try {
    if (divLowerLimit != "" && divUpperLimit != "") {
      if (divLowerLimit < divUpperLimit) {
        divUpperLimit++;
        divCreateProblem(divLowerLimit, divUpperLimit);
      } else if (divLowerLimit >= divUpperLimit) {
        throw "Lower Limit must be less than Upper Limit"
      }
    }
  }
  catch (msg) {
    errorDiv.innerHTML = msg;
    errorDiv.style.display = "block";
  }
}

function divCheckAnswer() {
  var answerTextbox = document.getElementById("divAnswerInput");
  var userAnswer = parseInt(answerTextbox.value);
  var leftNumber = parseInt(document.getElementById("divProblemLeft").innerHTML);
  var rightNumber = parseInt(document.getElementById("divProblemRight").innerHTML);
  var correctAnswer = leftNumber / rightNumber;

  validateAnswerInput(userAnswer, correctAnswer, answerTextbox, "division");
}

function divDisplayAnswer() {
  var answerTextbox = document.getElementById("divAnswerInput");
  var correctAnswer = parseInt(document.getElementById("divProblemLeft").innerHTML) / parseInt(document.getElementById("divProblemRight").innerHTML);
  if (answerTextbox.style.backgroundColor != "lime" && correctAnswer >= 1) {
    if (User.name != "" && answerTextbox.value != correctAnswer) {
      User.divIncorrect++;
      checkUserStats();
    }
    answerTextbox.value = correctAnswer;
    setTextboxIncorrect(answerTextbox);
  }
}

/*
########  ########  #### ##     ## ########
##     ## ##     ##  ##  ###   ### ##
##     ## ##     ##  ##  #### #### ##
########  ########   ##  ## ### ## ######
##        ##   ##    ##  ##     ## ##
##        ##    ##   ##  ##     ## ##
##        ##     ## #### ##     ## ########
*/

function primeChecker() {
  var primeResult = document.getElementById("primeResult");
  var primeInput = parseInt(document.getElementById("primeInput").value);
  var sqrt = Math.sqrt(primeInput);

  if (primeInput === 1) {
    primeResult.innerHTML = "1 is not a prime number";
  } else if (primeInput === 2) {
    primeResult.innerHTML = "2 is a prime number, it is the only even prime";
  } else if (primeInput % 2 === 0) {
    primeResult.innerHTML = primeInput + " is not a prime number because it is even";
  } else if (primeInput === 3) {
    primeResult.innerHTML = "3 is a prime number";
  } else if (sqrt % 1 === 0) {
    primeResult.innerHTML = primeInput + " is not a prime number because it is a square number with a square root of " + sqrt;
  } else {
    for (var i=2; i<=Math.floor(sqrt); i++) {
      if (primeInput % i === 0) {
        primeResult.innerHTML = primeInput + " is not a prime number, it's first divisor is " + i;
        break;
      } else {
        primeResult.innerHTML = primeInput + " is a prime number";
      }
    }
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
  var multCheck = document.getElementById("multCheckBtn");
  var multAnswer = document.getElementById("multAnswerBtn");
  var multNext = document.getElementById("multNextBtn");
  // division buttons
  var divCheck = document.getElementById("divCheckBtn");
  var divAnswer = document.getElementById("divAnswerBtn");
  var divNext = document.getElementById("divNextBtn");
  // prime button
  var primeCheck = document.getElementById("primeCheck");

  /// variables to store text boxes
  // addition text boxes
  var addLowerLimit = document.getElementById("addLowerLimit");
  var addUpperLimit = document.getElementById("addUpperLimit");
  // subtraction text boxes
  var subLowerLimit = document.getElementById("subLowerLimit");
  var subUpperLimit = document.getElementById("subUpperLimit");
  // multiplication text boxes
  var multLowerLimit = document.getElementById("multLowerLimit");
  var multUpperLimit = document.getElementById("multUpperLimit");
  // division text boxes
  var divLowerLimit = document.getElementById("divLowerLimit");
  var divUpperLimit = document.getElementById("divUpperLimit");

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
    // multiplication
    multCheck.addEventListener("click", multCheckAnswer, false);
    multAnswer.addEventListener("click", multDisplayAnswer, false);
    multNext.addEventListener("click", multValidateLimits, false);
    // division buttons
    divCheck.addEventListener("click", divCheckAnswer, false);
    divAnswer.addEventListener("click", divDisplayAnswer, false);
    divNext.addEventListener("click", divValidateLimits, false);
    // prime button
    primeCheck.addEventListener("click", primeChecker, false);

    /// text boxes
    // addition text boxes
    addLowerLimit.addEventListener("keyup", addValidateLimits, false);
    addUpperLimit.addEventListener("keyup", addValidateLimits, false);
    // subtraction text boxes
    subLowerLimit.addEventListener("keyup", subValidateLimits, false);
    subUpperLimit.addEventListener("keyup", subValidateLimits, false);
    // multiplication text boxes
    multLowerLimit.addEventListener("keyup", multValidateLimits, false);
    multUpperLimit.addEventListener("keyup", multValidateLimits, false);
    // division
    divLowerLimit.addEventListener("keyup", divValidateLimits, false);
    divUpperLimit.addEventListener("keyup", divValidateLimits, false);
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
    // multiplication buttons
    multCheck.attachEvent("onclick", multCheckAnswer);
    multAnswer.attachEvent("onclick", multDisplayAnswer);
    multNext.attachEvent("onclick", multValidateLimits);
    // division buttons
    divCheck.attachEvent("onclick", divCheckAnswer);
    divAnswer.attachEvent("onclick", divDisplayAnswer);
    divNext.attachEvent("onclick", divValidateLimits);
    // prime button
    primeCheck.attachEvent("onclick", primeCheck);

    /// text boxes
    // addition text boxes
    addLowerLimit.attachEvent("onkeyup", addValidateLimits);
    addUpperLimit.attachEvent("onkeyup", addValidateLimits);
    // subtraction text boxes
    subLowerLimit.attachEvent("onkeyup", subValidateLimits);
    subUpperLimit.attachEvent("onkeyup", subValidateLimits);
    // multiplication text boxes
    multLowerLimit.attachEvent("onkeyup", multValidateLimits);
    multUpperLimit.attachEvent("onkeyup", multValidateLimits);
    // division
    divLowerLimit.attachEvent("onkeyup", divValidateLimits);
    divUpperLimit.attachEvent("onkeyup", divValidateLimits);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}
