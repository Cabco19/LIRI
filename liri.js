require("dotenv").config();
// var axios = require("axios");
var Spotify = require('node-spotify-api');


// USE this code before deploying to github!!!
var keys =  require("./keys.js");
var spotify = new Spotify(keys.spotify);


var songName = process.argv[2];
console.log(songName);
spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items[0]); 
  console.log("Album name is: " + data.tracks.items[0].album.name); 
  console.log("Artist(s) Name: " + data.tracks.items[0].artists[0].name); 
  console.log("Song Name: " + data.tracks.items[0].name); 
  console.log("Here's preview link to the song: " + data.tracks.items[0].external_urls.spotify); 
  });


// var artist = process.argv[2];
// var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&limit=20";
// axios.get(queryUrl).then(
//     function(response) {
//       console.log(artist);
//       for (i = 0; i < response.data.length; i++){
//         console.log(response.data[i].venue.name);
//       console.log(response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country);
//       console.log(response.data[i].datetime);
//       console.log("---------------------------------");
//       }
//     })
//     .catch(function(error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log("---------------Data---------------");
//         console.log(error.response.data);
//         console.log("---------------Status---------------");
//         console.log(error.response.status);
//         console.log("---------------Status---------------");
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         // `error.request` is an object that comes back with details pertaining to the error that occurred.
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log("Error", error.message);
//       }
//       console.log(error.config);
//     });


// var querySongUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// var movieName = process.argv[2];
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// console.log(movieName);

// // Run a request with axios to the OMDB API with the movie specified
// axios.get(queryUrl).then(
//   function(response) {
//     console.log("The movie's title is: " + response.data.Title);
//     console.log("The movie came out in: " + response.data.Year);
//     console.log("The IMDB Rating: " + response.data.imdbRating);
//     console.log("The Rotten Tomatoes Rating is: " + response.data.Ratings[1].Value);
//     console.log("The movie was produced in: " + response.data.Country);
//     console.log("The movie's language is: " + response.data.Language);
//     console.log("The movie's plot is: " + response.data.Plot);
//     console.log("The actors in the movie are: " + response.data.Actors);
//   })
//   .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//       console.log("---------------Status---------------");
//       console.log(error.response.status);
//       console.log("---------------Status---------------");
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });