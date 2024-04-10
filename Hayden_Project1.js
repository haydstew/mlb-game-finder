// Store the value of a successful response status in a constant
const isOK = 200;

// Create a new XMLHttpRequest object and store it in a variable
var request = new XMLHttpRequest();

// A function to retrieve the JSON string from the specified URL through an AJAX asynchronous request
function getJSON(url) {
  // Anonymous function to handle the onload event
  request.onload = function () {
    // Check if the response status is successful
    if (request.status === isOK) {
      // Convert the JSON string to a JS object and store it in a variable
      var jsObject = JSON.parse(request.responseText);

      // Check if the dates array's length is greater than 0
      if (jsObject.dates.length > 0) {
        // Create a shorthand version to access the object's games array by storing its path in a variable
        var games = jsObject.dates[0].games;

        // Create a variable to track the current index of the games array and set its value to 0
        var gameIndex = 0;

        // Check if the length of the games array is greater than 0
        if (games.length > 0) {
          // Retrieve the value of the home team's name from the object and store it in a variable
          var homeTeam = games[gameIndex].teams.home.team.name;

          // Assign the value of the home team's name to the home team textbox
          document.getElementById("homeTeam").value = homeTeam;

          // Retrieve the value of the away team's name from the object and store it in a variable
          var awayTeam = games[gameIndex].teams.away.team.name;

          // Assign the value of the away team's name to the away team name textbox
          document.getElementById("awayTeam").value = awayTeam;

          // Retrieve the value of the home team's score from the object and store it in a variable
          var homeScore = games[gameIndex].teams.home.score;

          // Retrieve the value of the away team's score from the object and store it in a variable
          var awayScore = games[gameIndex].teams.away.score;

          // Determine the winning score between the two team's scores and store it in a variable
          var winningScore = Math.max(homeScore, awayScore);

          // Determine the losing score between the two team's scores and store it in a variable
          var losingScore = Math.min(homeScore, awayScore);

          // Assign the value of the winning score to the winning score textbox
          document.getElementById("winningScore").value = winningScore;

          // Assign the value of the losing score to the losing score textbox
          document.getElementById("losingScore").value = losingScore;

          // Retrieve the value of the venue from the object and store it in a variable
          var venue = games[gameIndex].venue.name;

          // Assign the value of the venue to the venue textbox
          document.getElementById("venue").value = venue;
        }
      } else {
        // Inform the user that no games could be found on the specified date
        alert(
          "Sorry, no games could be found on the specified date. Please select a different date."
        );
      }
    }

    // Create an anonymous function as an event handler for when the user clicks on the "Previous Game" button
    document.getElementById("previousGame").onclick = function () {
      // Check if the index of the games array is 0
      if (gameIndex === 0) {
        // Reassign the value of the gameIndex variable to the index of the final element in the games array
        gameIndex = games.length - 1;
      } else {
        // Decrement the value of the gameIndex variable by 1
        gameIndex--;
      }

      // Reassign the value of the home team's name based on the index of the games array and update the textbox
      homeTeam = games[gameIndex].teams.home.team.name;
      document.getElementById("homeTeam").value = homeTeam;

      // Reassign the value of the away team's name based on the index of the games array and update the textbox
      awayTeam = games[gameIndex].teams.away.team.name;
      document.getElementById("awayTeam").value = awayTeam;

      // Reassign the value of the home team's score based on the index of the games array
      homeScore = games[gameIndex].teams.home.score;

      // Reassign the value of the away team's score based on the index of the games array
      awayScore = games[gameIndex].teams.away.score;

      // Determine the winning score between the two team's scores and reassign it to the variable
      winningScore = Math.max(homeScore, awayScore);

      // Determine the losing score between the two team's scores and reassign it to the variable
      losingScore = Math.min(homeScore, awayScore);

      // Update the value of the winningScore textbox
      document.getElementById("winningScore").value = winningScore;

      // Update the value of the losingScore textbox
      document.getElementById("losingScore").value = losingScore;

      // Reassign the value of the venue based on the index of the games array and update the textbox
      venue = games[gameIndex].venue.name;
      document.getElementById("venue").value = venue;
    };

    // Create an anonymous function as an event handler for when the user clicks on the "Next Game" button
    document.getElementById("nextGame").onclick = function () {
      // Increment the value of the gameIndex variable by 1, using the modulus operator to ensure it wraps back to index 0 when the user clicks "Next Game" while at the final index of the games array
      gameIndex = (gameIndex + 1) % games.length;

      // Reassign the value of the home team's name based on the index of the games array and update the textbox
      homeTeam = games[gameIndex].teams.home.team.name;
      document.getElementById("homeTeam").value = homeTeam;

      // Reassign the value of the away team's name based on the index of the games array and update the textbox
      awayTeam = games[gameIndex].teams.away.team.name;
      document.getElementById("awayTeam").value = awayTeam;

      // Reassign the value of the home team's score based on the index of the games array
      homeScore = games[gameIndex].teams.home.score;

      // Reassign the value of the away team's score based on the index of the games array
      awayScore = games[gameIndex].teams.away.score;

      // Determine the winning score between the two team's scores and reassign it to the variable
      winningScore = Math.max(homeScore, awayScore);

      // Determine the losing score between the two team's scores and reassign it to the variable
      losingScore = Math.min(homeScore, awayScore);

      // Update the value of the winningScore textbox
      document.getElementById("winningScore").value = winningScore;

      // Update the value of the losingScore textbox
      document.getElementById("losingScore").value = losingScore;

      // Reassign the value of the venue based on the index of the games array and update the textbox
      venue = games[gameIndex].venue.name;
      document.getElementById("venue").value = venue;
    };

    // Create an anonymous function as an event handler for when the user clicks on the "Save Changes" button
    document.getElementById("saveChanges").onclick = function () {
      // Assign the value of the winningScore textbox to the winningScore variable
      winningScore = Number(document.getElementById("winningScore").value);

      // Assign the value of the losingScore textbox to the awayScore variable
      losingScore = Number(document.getElementById("losingScore").value);

      // Check if the winning score is less than the losing score
      if (winningScore <= losingScore) {
        // Inform the user that the winning score must be greater than the losing score
        alert(
          "The winning score must be greater than the losing score before your changes can be saved. Please try again."
        );
      } else {
        // Assign the value of the home team textbox to the homeTeam variable
        homeTeam = document.getElementById("homeTeam").value;

        // Update the value of the home team's name within the object
        games[gameIndex].teams.home.team.name = homeTeam;

        // Assign the value of the away team textbox to the awayTeam variable
        awayTeam = document.getElementById("awayTeam").value;

        // Update the value of the away team's name within the object
        games[gameIndex].teams.away.team.name = awayTeam;

        // Create a variable to determine if the home team won or lost the game
        var homeTeamWin = games[gameIndex].teams.home.isWinner;

        // Check if the home team won the game
        if (homeTeamWin) {
          // If the home team won, update the home team's score within the object with the winning score
          games[gameIndex].teams.home.score = winningScore;

          // Update the away team's score within the object with the losing score
          games[gameIndex].teams.away.score = losingScore;
        } else {
          // If the home team lost, update the home team's score within the object with the losing score
          games[gameIndex].teams.home.score = losingScore;

          // Update the away team's score within the object with the winning score
          games[gameIndex].teams.away.score = winningScore;
        }

        // Assign the value of the venue textbox to the venue variable
        venue = document.getElementById("venue").value;

        // Update the value of the venue within the object
        games[gameIndex].venue.name = venue;

        // Inform the user that their changes have been saved
        alert("Your changes have been saved.");
      }
    };
  };

  // Open a connection with the URL
  request.open("GET", url, true);

  // Send the "GET" request
  request.send();
}

// A function to retrieve data from the API
function retrieveData() {
  // Retrieve the value of the year dropdown and store it in a variable
  var year = document.getElementById("year").value;

  // Retrieve the value of the month dropdown and store it in a variable
  var month = document.getElementById("month").value;

  // Retrieve the value of the day dropdown and store it in a variable
  var day = document.getElementById("day").value;

  // Concatenate the value of each dropdown to the API's URL and store the user's selection in a variable
  var url =
    "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&date=" +
    month +
    "/" +
    day +
    "/" +
    year;

  // Call the getJSON function, passing the specified url variable as an argument
  getJSON(url);
}
