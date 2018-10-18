require("dotenv").config();

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var Twitter = require('twitter');

var request = require("request");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];

var lookUp = process.argv;

var search = '';

for(var i = 3; i < lookUp.length; i++){
	search = search + lookUp[i] + ' ';
}

if(input == undefined){
	console.log('\nRun node liri.js and add:\n');
	console.log('my-tweets: too see some tweets from a dummy twitter account');
	console.log('spotify-this-song + song name: to look up a song in spotify');
	console.log('movie-this + movie name: to look up your movie in omdb');
	console.log('do-what-it-says: to get a random song or movie');
	console.log('\nEx. \nnode liri.js spotify-this-song spirit break out');
}if(input == 'my-tweets'){
	// console.log('working1');
	tweets();
}else if(input == 'spotify-this-song'){
	// console.log('working2');
	song();
}else if(input == 'movie-this'){
	// console.log('working3');
	movie();
}else if(input == 'do-what-it-says'){
	// console.log('working4');
	random();
}

function tweets(){
	// console.log('called')
	var params = {screen_name: 'rchrdholme'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
 		if (!error) {
 			for(var i = 0; i < 20; i++){
 				console.log(' ');
 				console.log(tweets[i].created_at);
 				console.log(tweets[i].text);
 				console.log(' ');
 				// console.log(tweets);
 			}
    
  		}
	});
}

function song(){

	if(search == ''){
		spotify.search({type: 'track', query: 'The Sign' }, function(err, data) {
    		if (err) {
    			return console.log('Error occurred: ' + err);
  			}
 	
 			console.log(' ');
 			// console.log('Artist: ' + data.tracks.items[5].artists[0].name)
			console.log('Artist: ' + data.tracks.items[5].artists[0].name); 
			console.log('Album: ' + data.tracks.items[5].album.name);
			console.log('Song: ' + data.tracks.items[5].name);

			if(data.tracks.items[0].preview_url == null){
				console.log('No preview url')
			}else{
				console.log('Preview Url: ' + data.tracks.items[5].preview_url);
			}
	

		});

	}else{

		spotify.search({type: 'track', query: search }, function(err, data) {
    		if (err) {
    			return console.log('Error occurred: ' + err + '\nCheck your spelling');
  			}
 	
 			console.log(' ');
			console.log('Artist: ' + data.tracks.items[0].artists[0].name); 
			console.log('Album: ' + data.tracks.items[0].album.name);
			console.log('Song: ' + data.tracks.items[0].name);

			if(data.tracks.items[0].preview_url == null){
				console.log('No preview url')
			}else{
				console.log('Preview Url: ' + data.tracks.items[0].preview_url);
			}
	

		});	
	}
	
}

function movie(){

	if(search == ''){
		request("http://www.omdbapi.com/?t=" + 'Mr. Nobody' + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  			if (!error && response.statusCode === 200) {
  				if(JSON.parse(body).Response == 'False'){
  					console.log(' ');
  					console.log('No movie found. Check your spelling')
  				}else{
  					// console.log(JSON.parse(body))
    				console.log(' ');
    				console.log("Title: " + JSON.parse(body).Title);
    				console.log("Came out in: " + JSON.parse(body).Year);
    				console.log("IMDB rating: " + JSON.parse(body).imdbRating);

    				if(JSON.parse(body).Ratings == null){
    					console.log('No rotten tomatoes rating')
    				}else{
    					console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
    				}

    				console.log("Country produced in: " + JSON.parse(body).Country);
    				console.log("Language: " + JSON.parse(body).Language);
    				console.log("Plot: " + JSON.parse(body).Plot);
    				console.log("Actors: " + JSON.parse(body).Actors);
  				}
  			}
		});

	}else{

		request("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

  			if (!error && response.statusCode === 200) {
  				if(JSON.parse(body).Response == 'False'){
  					console.log(' ');
  					console.log('No movie found. Check your spelling')
  				}else{
  					// console.log(JSON.parse(body))
    				console.log(' ');
    				console.log("Title: " + JSON.parse(body).Title);
    				console.log("Came out in: " + JSON.parse(body).Year);
    				console.log("IMDB rating: " + JSON.parse(body).imdbRating);

    				if(JSON.parse(body).Ratings == null){
    					console.log('No rotten tomatoes rating')
    				}else{
    					console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
    				}

    				console.log("Country produced in: " + JSON.parse(body).Country);
    				console.log("Language: " + JSON.parse(body).Language);
    				console.log("Plot: " + JSON.parse(body).Plot);
    				console.log("Actors: " + JSON.parse(body).Actors);
  				}
  			}
		});
	}
	
}

function random(){

	fs.readFile('random.txt', 'utf8', function (err, data) {
		console.log(' ');
  		var dataArr = data.split(",");
  		console.log(dataArr[0]);
  		console.log(dataArr[1]);

  		var doThis = dataArr[0];
  		search = dataArr[1];

  		if(doThis == 'my-tweets'){
			// console.log('working1');
			tweets();
		}else if(doThis == 'spotify-this-song'){
			// console.log('working2');
			song();
		}else if(doThis == 'movie-this'){
			// console.log('working3');
			movie();
		}
	});

}