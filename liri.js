require("dotenv").config();

//Packages and libraries required to run application
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var omdb = require('omdb');
var fs = require('fs');

// npm i --save twitter node-spotify-api request fs ./keys.js

//Api keys      
// var spotifyKeys = new Spotify(keys.spotifynode);
var client = new Twitter(keys.twitter);

// console.log(spotifyKeys);
// console.log(client);


var nodeArgs = process.argv;
var command = nodeArgs[2];
var musicSearch = '';
var movie = '';


for (var i = 3; i < nodeArgs.length; i++) {

    // Build a string with the song.
    musicSearch = musicSearch + nodeArgs[i] + " ";
}


function findMusic() {
    console.log(musicSearch);
    var spotify = new Spotify({
        id: '672a0b3753a0418eb02c9caf9bba5844',
        secret: '11868d2d86404d889b67ce8230be2c4d'
    });

    spotify.search({ type: 'track', query: musicSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else if (data.tracks.items.length > 1) {
            for (let i = 0; i < data.tracks.items.length; i++) {
                var artists = [];
                for (var counter = 0; counter < data.tracks.items[i].artists.length; counter++) {
                    artists.push(data.tracks.items[i].artists[counter].name)
                }
                console.log('Artists: ' + artists.join(', ') + "; ")
                console.log('Song: ' + data.tracks.items[i].name);
                console.log('Spotify Link: ' + data.tracks.items[i].preview_url);
                console.log('Album: ' + data.tracks.items[i].album.name);
                console.log('');
            }
        }
        else {
            musicSearch = 'rick astley never gonna give you up';
            findMusic();
        }
    });

};



function tweetFeed() {
    var params = { screen_name: 'gerphmoonboy' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    });
};

if (command === 'my-tweets') {
    tweetFeed();
};

if (command === 'spotify-this') {
    findMusic();
};
