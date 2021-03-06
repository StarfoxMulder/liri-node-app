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

		if(process.argv[3] == undefined) {
			var songName = 'The+Sign';
		};

		for(var i = 0; i < songInput.length; i++){
			var sWord = songInput[i];
			if(i == 0) {
				songName += sWord;
			} else {
				space = "+";
				songName += space+sWord;
			};
		};//Making an appropriate string to pass into spotify

		spotify.search({ type: 'track', query: songName }, function(err, data) {
			if (err) {
		        console.log('Error: ' + err);
		        return;
		    } else {
		    	console.log("\n || Here Are the Top Five Results for Your song Request || ")
		    	for(var g = 0; g < 5; g++) {
		    		counter1 = g+1;
		    		console.log("\n . . . . Song Result "+counter1+" . . . . ")
			    	console.log("Artist: "+util.inspect(data.tracks.items[g].artists[0].name, {showHidden: false, depth: null})); 
			    	console.log("Song: "+util.inspect(data.tracks.items[g].name, {showHidden: false, depth: null}));
			    	console.log("Link: "+util.inspect(data.tracks.items[g].preview_url, {showHidden: false, depth: null}));
			    	console.log("Album: "+util.inspect(data.tracks.items[g].album.name, {showHidden: false, depth: null}));
		    		console.log("\n");
			    }
			};
		});
		break;

	case "movie-this":
		if(process.argv[3] == undefined) {
			var movieInput = "Mr. Nobody";
		} else {
			var movieInput = process.argv.slice(3);
		}

			var request = require('request');
			var queryUrl = 'http://www.omdbapi.com/?t=' + movieInput +'&y=&plot=short&tomatoes=true&r=json';

			request(queryUrl, function (error, response, body) {
				var parser = JSON.parse(body);
				if (!error && response.statusCode == 200){
					console.log("\n || Here Are the Results for Your Movie Request || ");
					console.log("\nMovie title: " + parser["Title"]);
					console.log("Release Year: " + parser["Year"]);
					console.log("IMDB rating: " + parser["imdbRating"]);
					console.log("Country: " + parser["Country"]);
					console.log("Language: " + parser["Language"]);
					console.log("Plot: " + parser["Plot"]);
					console.log("Actors: " + parser["Actors"]);
					console.log("Rotten Tomatoes Rating: " + parser["tomatoRating"]);
					console.log("Rotten Tomatoes URL: " + parser["tomatoURL"]);
					console.log("\n      ||  ----  End Movie Results  ----  || ");
				};
			});
	
		break;

	case "do-what-it-says":
		fs.readFile('random.txt','utf8',function(err,data) {
			if(err) {
				console.log(err);
			} else {
				var randArray = data.split(',');
				var randAction = randArray[0];
				var randInput = randArray[1];
				var RIasString = randInput.split(' ');			
				var songName = RIasString.join('+');

				//need to reformat randInput as an array for this to work
				// for(var i = 0; i < RIasString.length; i++){
				// 	var sWord = randInput[i];
				// 	if(i == 0) {
				// 		songName += sWord;
				// 	} else {
				// 		space = "+";
				// 		songName += space+sWord;
				// 	};
				// };

				switch(randAction) {
					case "my-tweets":
						break;
					case "spotify-this-song":
						console.log(songName);

						spotify.search({ type: 'track', query: songName }, function(err, data) {
							if (err) {
						        console.log('Error: ' + err);
						        return;
						    } else {
						    	console.log("\n || Here Are the Top Five Results for Your song Request || ")
						    	for(var g = 0; g < 5; g++) {
						    		counter1 = g+1;
						    		console.log("\n . . . . Song Result "+counter1+" . . . . ")
							    	console.log("Artist: "+util.inspect(data.tracks.items[g].artists[0].name, {showHidden: false, depth: null})); 
							    	console.log("Song: "+util.inspect(data.tracks.items[g].name, {showHidden: false, depth: null}));
							    	console.log("Link: "+util.inspect(data.tracks.items[g].preview_url, {showHidden: false, depth: null}));
							    	console.log("Album: "+util.inspect(data.tracks.items[g].album.name, {showHidden: false, depth: null}));
						    		console.log("\n");
							    };
							};
						});
						break;
					case "movie-this":
						break;
				}
			}
		});

		break;
};

