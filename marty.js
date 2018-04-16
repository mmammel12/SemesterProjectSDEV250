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

/*
   ###    ########  ########  #### ######## ####  #######  ##    ##
  ## ##   ##     ## ##     ##  ##     ##     ##  ##     ## ###   ##
 ##   ##  ##     ## ##     ##  ##     ##     ##  ##     ## ####  ##
##     ## ##     ## ##     ##  ##     ##     ##  ##     ## ## ## ##
######### ##     ## ##     ##  ##     ##     ##  ##     ## ##  ####
##     ## ##     ## ##     ##  ##     ##     ##  ##     ## ##   ###
##     ## ########  ########  ####    ##    ####  #######  ##    ##
*/

function addValidateLimits() {
  var addLowerLimit = document.getElementById("addLowerLimit").value;
  var addUpperLimit = document.getElementById("addUpperLimit").value;
  var leftNumber = document.getElementById("addProblemLeft");
  var rightNumber = document.getElementById("addProblemRight");document.getElementById("addProblemLeft")
  var errorDiv = document.querySelector("#addition .errorMessage");
  errorDiv.style.display = "none";

  try {
    if (addLowerLimit != "" && addUpperLimit != "") {
      if (!addLowerLimit.match(/^[0-9]+$/)) {
        throw "Lower Limit must be an integer";
      } else if (!addUpperLimit.match(/^[0-9]+$/)) {
        throw "Upper Limit must be an integer";
      } else { // numbers in both text boxes, convert to int
        var lowerLimit = parseInt(addLowerLimit);
        var upperLimit = parseInt(addUpperLimit);

        if (lowerLimit < upperLimit) {
          leftNumber.innerHTML = "";
          leftNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
          rightNumber.innerHTML = "";
          rightNumber.innerHTML = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
        } else if (lowerLimit >= upperLimit) {
          throw "Lower Limit must be less than Upper Limit"
        }
      }
    }
  }
  catch (msg) {
    errorDiv.innerHTML = msg;
    errorDiv.style.display = "block";
  }
}

function checkAddAnswer() {
  //TODO check addition answer
}

/*
######## ##     ## ######## ##    ## ######## ##       ####  ######  ######## ######## ##    ## ######## ########   ######
##       ##     ## ##       ###   ##    ##    ##        ##  ##    ##    ##    ##       ###   ## ##       ##     ## ##    ##
##       ##     ## ##       ####  ##    ##    ##        ##  ##          ##    ##       ####  ## ##       ##     ## ##
######   ##     ## ######   ## ## ##    ##    ##        ##   ######     ##    ######   ## ## ## ######   ########   ######
##        ##   ##  ##       ##  ####    ##    ##        ##        ##    ##    ##       ##  #### ##       ##   ##         ##
##         ## ##   ##       ##   ###    ##    ##        ##  ##    ##    ##    ##       ##   ### ##       ##    ##  ##    ##
########    ###    ######## ##    ##    ##    ######## ####  ######     ##    ######## ##    ## ######## ##     ##  ######
*/

function createEventListeners() {
  /// variables to store buttons
  // username buttons
  var unAccept = document.getElementById("usernameAcceptBtn");
  var unClear = document.getElementById("usernameClearBtn");
  // addition buttons
  var addCheck = document.getElementById("addCheckBtn"); //TODO
  var addAnswer = document.getElementById("addAnswerBtn"); //TODO
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

    /// text boxes
    // addition text boxes
    addLowerLimit.addEventListener("change", addValidateLimits, false);
    addUpperLimit.addEventListener("change", addValidateLimits, false);
  } else if (unAccept.attachEvent) {
    /// buttons
    // username buttons
    unAccept.attachEvent("onclick", createUser);
    unClear.attachEvent("onclick", clearUsername);
    // addition buttons
    addCheck.attachEvent("onclick", checkAddAnswer);

    /// text boxes
    // addition text boxes
    addLowerLimit.attachEvent("onchange", addValidateLimits, false);
    addUpperLimit.attachEvent("onchange", addValidateLimits, false);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}
