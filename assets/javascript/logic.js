var config = {
    apiKey: "AIzaSyC0mIMrxcaUDfJLoFAPOgEbcylgdubRwtE",
    authDomain: "fancy-train-scheduler-3000.firebaseapp.com",
    databaseURL: "https://fancy-train-scheduler-3000.firebaseio.com",
    projectId: "fancy-train-scheduler-3000",
    storageBucket: "",
    messagingSenderId: "659816804706"
  };
  firebase.initializeApp(config);

   var database = firebase.database();

   var trainName;
   var destination;
   var trainTime;
   var frequency;
   var nextArrival;
   var minutesAway;
   var currentTime;
   var trainTimeConverted;
   var timeDifference;
   var timeApart;

// minutes away calculation: frequency-(numbers of mins between start time and current time modulus frequency
	function nextTrain() {	
    trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "days");
    console.log(trainTimeConverted);

    // gets the current time
    currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the train times
    timeDifference = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDifference);

    // Time apart (time since the last train)
    timeApart = timeDifference % frequency;

    // Minute Until Train
    minutesAway = frequency - timeApart;
    console.log("MINUTES TILL NEXT TRAIN: " + minutesAway);

    // Next Train
    nextArrival = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));
    nextArrival = moment(nextArrival).format("hh:mm");
}


$('#btn-submit').on("click",function(event){
	event.preventDefault();
	trainName = $('#train-name').val().trim();
	destination = $('#destination').val().trim();
	frequency = $('#frequency').val().trim();
	trainTime = $('#train-time').val().trim();
   nextTrain();

	

		database.ref().push({
		trainName: trainName,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
		minutesAway: minutesAway,

	});

  $("#train-name").val("");
  $("#destination").val("");
  $("#train-time").val("");
  $("#frequency").val("");

//calculates when the next train will come, and how many minutes away it is


	


});

database.ref().on("child_added", function(snapshot, prevChildKey) {

  console.log(snapshot.val());
 

    var DBtrainName = snapshot.val().trainName;
    var DBdestination = snapshot.val().destination;
    var DBfrequency = snapshot.val().frequency;
    var DBnextArrival = snapshot.val().nextArrival;
    var DBminutesAway = snapshot.val().minutesAway

      $(".table").append("<tr><td>" + DBtrainName + "</td><td>" + DBdestination + "</td><td>" + 
  DBfrequency + "</td><td>" + DBnextArrival + "</td><td>" + DBminutesAway + "</td></tr>")
});
