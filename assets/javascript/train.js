/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyBalusXzSJ6aRZ6ab91ACwiQryneceQO14",
    authDomain: "trainscheduler-f1a69.firebaseapp.com",
    databaseURL: "https://trainscheduler-f1a69.firebaseio.com",
    projectId: "trainscheduler-f1a69",
    storageBucket: "trainscheduler-f1a69.appspot.com",
    messagingSenderId: "883578258246"
  };
  firebase.initializeApp(config);

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trnName = $("#train-name-input").val().trim();
  var trnDestination = $("#destination-input").val().trim();
  var trnStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var trnRate = $("#rate-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trnName,
    destination: trnRole,
    start: trnStart,
    rate: trnRate
  };
  playBackground();
  // Uploads employee data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.rate);
  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnStart = childSnapshot.val().start;
  var trnRate = childSnapshot.val().rate;
  // Employee Info
  console.log(trnName);
  console.log(trnDestination);
  console.log(trnStart);
  console.log(trnRate);
  // Prettify the employee start
  var trnStartPretty = moment.unix(trnStart).format("MM/DD/YY");
  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trnMonths = moment().diff(moment.unix(trnStart, "X"), "months");
  console.log(trnMonths);
  // Calculate the total billed rate

  var trnBilled = trnMonths * trnRate;
  console.log(trnBilled);
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnRole + "</td><td>" +
  trnStartPretty + "</td><td>" + trnMonths + "</td><td>" + trnRate + "</td><td>" + trnBilled + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
  function playBackground() {
      var x=document.getElementById("backgroundmusic");
    x.play();
  }