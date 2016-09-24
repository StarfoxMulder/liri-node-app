var fs = require('fs');
var util = require("util");
var keys = require("./keys.js");
var command = process.argv[2].toLowerCase();
var Twitter = require('twitter');
var spotify = require('spotify');
var moment = require('moment');

switch(command) {
	case "my-tweets":
	/* ASK ABOUT HOW to format the date -- couldn't get it to work.... */
		var params = {screen_name: 'judeicialreview'};
		keys.twitterKeys.get('https://api.twitter.com/1.1/statuses/user_timeline.json?', params, function(error, tweets, response) {
			if(error) {
				console.log(error);
			} else {
				for(var i =0; i < 20; i++) {
					counter=i+1;
					console.log(counter+") "+util.inspect(tweets[i].created_at, {showHidden: false, depth: null})+
						" | "+util.inspect(tweets[i].text, {showHidden: false, depth: null}));
				}
			}
		});
		break;

	case "spotify-this-song":
		//var queryUrl = "https://api.spotify.com/v1/search?q="+songName+"&type="
		var songInput = process.argv.slice(3);
		songName = "";

		for(var i = 0; i < songInput.length; i++){
			var sWord = songInput[i];
			if(i == 0) {
				songName += sWord;
			} else {
				space = "%20";
				songName += space+sWord;
			};
		};//Making an appropriate string to pass into spotify

		spotify.search({ type: 'track', query: songName }, function(err, data) {
	//	spotify.get(''+songName+'', function(err, data) {
			if (err) {
		        console.log('Error: ' + err);
		        return;
		    } else {
		    	console.log(util.inspect(data.tracks[0], {showHidden: false, depth: null}));
		    	console.log("Artist: "+util.inspect(data.artists, {showHidden: false, depth: null})); 
		    	console.log("Song: "+util.inspect(data.name, {showHidden: false, depth: null}));
		    	console.log("Link: "+util.inspect(data.preview_url, {showHidden: false, depth: null}));
		    	console.log("Album: "+util.inspect(data.album, {showHidden: false, depth: null}));
		    }
		});
	
		break;

	case "movie-this":
	
		break;

	case "do-what-it-says":
	
		break;
}