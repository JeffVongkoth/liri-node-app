require("dotenv").config();

//Packages and libraries required to run application
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
// console.log(process.env.SPOTIFY_ID);
// npm i --save twitter node-spotify-api request fs ./keys.js
//Api keys      
var spotifyKeys = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// console.log(spotifyKeys);
// console.log(client);


var nodeArgs = process.argv;
var command = nodeArgs[2];
var song = '';
var movie = '';

    
for (var i = 2; i < nodeArgs.length; i++) {

    // Build a string with the song.
    song = song + nodeArgs[i] + " " ;
}
console.log(song);
function findSong() {
spotifyKeys.then({ type: 'track', query:song }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    console.log(data[0]); 
    console.log(spotifyKeys);
});

};
// console.log(spotifyKeys);
// console.log(spotifyKeys.credentials.id);
// console.log(spotifyKeys.credentials.secret);




function tweetFeed() {
    var params = {screen_name: 'gerphmoonboy'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {

      }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    });
};

if (command === 'my-tweets'){
    tweetFeed();
};

if(command === 'spotify-this'){
    findSong();
};


