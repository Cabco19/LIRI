require("dotenv").config();
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require("fs");

// Spotify keys
var keys =  require("./keys.js");
var spotify = new Spotify(keys.spotify);

// Grab user input and set to the following global variables
var userAction = process.argv[2];
var userChoice = process.argv[3];
var userData;

runLiri(userAction, userChoice);
// Determines which process to perform.
// Based on userChoice run one of the following
function runLiri(){
switch (userAction) {
  case "spotify-this-song":
    logData("\nCommand: " + userAction);
    searchSong(userChoice);
    break;

  case "concert-this":
    logData("\nCommand: " + userAction);
    searchBand(userChoice);
    break;

  case "movie-this":      
      if (userChoice){
        searchMovie(userChoice); 
      }
      else {
        userChoice = "Mr Nobody";
        searchMovie(userChoice); 
      }
      logData("\nCommand: " + userAction);
    break;
  
  case "do-what-it-says":
    readRandom();
    break;
  
  default:
    console.log("Sorry, LIRI doesn't know how to do that. Try again!")
}
}

// Function to search for song information usinfg spotify API
function searchSong(){
  spotify.search({ type: 'track', query: userChoice }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    userData = "\n\n--------- SPOTIFY THIS SONG ----------\nArtist(s): " + data.tracks.items[0].artists[0].name + "\nSong Name: " + data.tracks.items[0].name + "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview link on Spotify: " + data.tracks.items[0].external_urls.spotify + "\n--------------------------------------\n";
    console.log(userData);
    logData(userData);
  });

}
// Function to search for Band information using axios and bands in town API.
function searchBand(){
  var queryUrl = "https://rest.bandsintown.com/artists/" + userChoice + "/events?app_id=codingbootcamp&limit=20";
axios.get(queryUrl).then(
    function(response) {
      var cityLocation;
      var heading = "\n\n------------ CONCERT THIS ------------\n" + "Upcoming Concerts for " + userChoice + "\nShowing " + response.data.length + " Venues" + "\n--------------------------------------\n";
      console.log(heading);
      logData(userChoice);               
      logData(heading);     
      for (i = 0; i < response.data.length; i++){
        // If the venue doesn't have a region run the following
        if (response.data[i].venue.region === ""){
          cityLocation = response.data[i].venue.city + ", " + response.data[i].venue.country;
          userData = "\n" + response.data[i].venue.name + "\n" + cityLocation + "\n" + "Date: " + moment(response.data[i].datetime).format('MM-DD-YYYY') + "\n--------------------------------------";
          console.log(userData);   
          logData(userData);          
        }
        // If venue has a region run the following
        else {
          cityLocation = response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country;
        userData = "\n" + response.data[i].venue.name + "\n" + cityLocation + "\n" + "Date: " + moment(response.data[i].datetime).format('MM-DD-YYYY') + "\n--------------------------------------";
        console.log(userData);   
        logData(userData);
      }
      }

    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}

// Function to search for movie information using axios and OMDB API
function searchMovie(){ 
  var queryUrl = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy";
// Run a request with axios to the OMDB API with the movie specified
axios.get(queryUrl).then(
  function(response) {
    userData = "\n\n------------ MOVIE THIS --------------\nMovie Title: " + response.data.Title + "\nThe movie came out in: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nThe movie was produced in: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nMain actors in the movie are: " + response.data.Actors + "\n--------------------------------------\n"; 
    console.log(userData);
    logData(userData);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

// Function to run when reading random.txt
function readRandom(){
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }    
    var output = data.split(",");
    userChoice = output[1];
    userAction = output[0];
    runLiri();   
  });
}

function logData(userData) {
  fs.appendFile("log.txt", userData, function(err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }

  userData = "";
  });

}
