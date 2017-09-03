var config = {
  apiKey: "AIzaSyBalusXzSJ6aRZ6ab91ACwiQryneceQO14",
  authDomain: "trainscheduler-f1a69.firebaseapp.com",
  databaseURL: "https://trainscheduler-f1a69.firebaseio.com",
  projectId: "trainscheduler-f1a69",
  storageBucket: "trainscheduler-f1a69.appspot.com",
  messagingSenderId: "883578258246"
};
firebase.initializeApp(config);

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  console.log("buttoned clicked");
  
  var trnName = $("#train-name-input").val().trim();
  var trnDestination = $("#destination-input").val().trim();
  var trnFrequency = $("#frequency-input").val().trim();
  var trnFirstTime = $("#firsttime-input").val().trim();
  var newTrain = {
    name: trnName,
    destination: trnDestination,
    frequency: trnFrequency,
    firsttime: trnFirstTime,
 
  };

  firebase.database().ref().push(newTrain);

  alert("Train successfully added");
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
});

firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey) {

  var trnName = childSnapshot.val().name;
  var trnDestination = childSnapshot.val().destination;
  var trnFrequency = childSnapshot.val().frequency;
  var trnFirstTime = childSnapshot.val().firsttime;
 
  var ftConv = moment(trnFirstTime, "HH:mm").subtract(1, "years");
  var curTime = moment();
  var diffTime = moment().diff(moment(ftConv), "minutes");
  var remain = diffTime % trnFrequency;
  var minutesTil = trnFrequency - remain;
  var nextArrival = moment().add(minutesTil, "minutes");
 
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
  trnFrequency + "</td><td>" + nextArrival.format("HH:mm") + "</td><td>" + minutesTil + "</td></tr>");
});
