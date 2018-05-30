require("dotenv").config();

//Packages and libraries required to run application
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
// console.log(process.env.SPOTIFY_ID);

//Api keys      
var spotifyKeys = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log(spotifyKeys);
// console.log(client);


var nodeArgs = process.argv;
var command = nodeArgs[2];
var song = '';
var movie = '';
function findSong() {
    for (var i = 2; i < nodeArgs.length; i++) {

        // Build a string with the song.
        song = song + " " + nodeArgs[i];
      }
    //   console.log ("i searched" + song)
var spotify = new Spotify({
    id: spotifyKeys.credentials.id,
    secret: spotifyKeys.credentials.secret
  });

  spotify.then(function(data){
      console.log(data);
  });


// spotify.search({ type: 'track', query: song }, function(err, data) {
//     if ( err ) {
//         console.log('Error occurred: ' + err);
//         return;
//     }
 
//     // Do something with 'data'
// });

};
// console.log(spotifyKeys);
// console.log(spotifyKeys.credentials.id);
// console.log(spotifyKeys.credentials.secret);
console.log(song + "ahahahah");

if(command === 'spotify-this'){
        findSong();
}


function tweetFeed() {
    var params = {screen_name: 'gerphmoonboy'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {

      }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    });
}

if (command === 'my-tweets'){
    tweetFeed();
}

