/*
SDEV 250 Semester Project
Marty Mammel
*/
"use strict";

// TODO validate username
function validateUsername(usernameInput) {
  var usernameInput = document.getElementById("usernameInput").value;
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
  // collatz button
  var collatzCheck = document.getElementById("collatzCheck");
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
    // TODO change validateUsername call to something else
    // validateUsername should be called from something that
    // wants boolean return
    unAccept.addEventListener("click", validateUsername, false);
    unClear.addEventListener("click", clearUsername, false);
  } else if (unAccept.attachEvent) {
    unAccept.attachEvent("onclick", validateUsername);
    unClear.attachEvent("onclick", clearUsername);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}
