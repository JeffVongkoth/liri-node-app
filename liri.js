require("dotenv").config();
// npm i --save twitter node-spotify-api request fs ./keys.js

//Packages and libraries required to run application
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var omdb = require('omdb');
var fs = require('fs');


//Api keys      
// var spotifyKeys = new Spotify(keys.spotifynode);
var client = new Twitter(keys.twitter);

var nodeArgs = process.argv;
var command = nodeArgs[2];
var musicSearch = '';
var movie = '';


function findMusic() {

    for (var i = 3; i < nodeArgs.length; i++) {

        // Build a string with the song.
        musicSearch = musicSearch + nodeArgs[i] + " ";
    };

    console.log(musicSearch);
    var spotify = new Spotify({
        id: '672a0b3753a0418eb02c9caf9bba5844',
        secret: '11868d2d86404d889b67ce8230be2c4d'
    });

    if (musicSearch == "") {
        musicSearch = 'rick astley never gonna give you up';
    }

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


function findMovie() {

    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movie = movie + "+" + nodeArgs[i];

        }
    };
    if (movie == "") {
        movie = 'Mr. Nobody';
        movies();
    };
    request('http://www.omdbapi.com/?apikey=940c1089&t=' + movie, function (error, response, body) {
        var parsed = JSON.parse(body);
        if (error) {
            console.log('error:', error);
        }
        else if (parsed.Response == 'True') {
            console.log('Title: ' + parsed.Title);
            console.log('Year: ' + parsed.Year);
            console.log('IMDB Rating: ' + parsed.imdbRating);
            if (parsed.Ratings[1]) {
                console.log('Rotten Rating: ' + parsed.Ratings[1].Value);
            }
            else {
                console.log('No Rating Found')
            }
            console.log('Countries: ' + parsed.Country);
            console.log('Languages: ' + parsed.Language);
            console.log('Plot: ' + parsed.Plot);
            console.log('Actors: ' + parsed.Actors);
        }

    });
};

function whatItDo(){
    fs.readFile('./random.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    musicSearch = data.split(',')[1];
    });
    console.log(musicSearch);
};

function liri(){ 
if (command === 'my-tweets') {
    tweetFeed();
};

if (command === 'spotify-this') {
    findMusic();
};

if (command === 'movie-this') {
    findMovie();
};
if (command === 'do-what-it-says') {
    whatItDo();
};
};

liri();