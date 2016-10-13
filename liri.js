//Twitter variables
var key = require('./key.js');
var twitter = require('twitter');
var ck = key.twitterKeys.consumer_key;
var cs = key.twitterKeys.consumer_secret;
var atk = key.twitterKeys.access_token_key;
var ats = key.twitterKeys.access_token_secret;


//Twitter function

myTweets = function(){
	var client = new twitter({
		consumer_key:ck,
		consumer_secret:cs,
		access_token_key:atk,
		access_token_secret:ats,	
	});

	client.get('statuses/user_timeline',{user_id:'wiljago', count: 20}, function(error, tweets, response) {
	  if(error) throw error;

	  for(i=0; i<20; i++){
	    console.log(JSON.stringify(tweets[i].text, null, 2));   
	    console.log(JSON.stringify(tweets[i].created_at, null, 2));
	    console.log('===========================================');
	    console.log('===========================================');
	}
	      });
	
}


//Spotify variables
var spotify = require('spotify');
var song = 'The Sign';
var songArray = [];

spotifySong = function(){

	for(var i=3;i<process.argv.length;i++){
	songArray.push(process.argv[i]);
	}

	song = songArray.join(" ");
	//console.log(song);
	
	spotify.search({ type: 'track', query: song }, function(err, data) {
	    if ( err ) {
	            console.log('Error occurred: ' + err);
		            return;
			        }
				 
				 //console.log(JSON.stringify(data, null, 2));
				 var artists = data.tracks.items[0].artists[0].name;
				 var songName = data.tracks.items[0].name;
				 var previewURL = data.tracks.items[0].preview_url;
				 var album = data.tracks.items[0].album.name;

				 console.log(JSON.stringify('Artist: '+artists, null, 2));
				 console.log(JSON.stringify('Title: '+songName, null, 2));
				 console.log(JSON.stringify('Preview URL: '+previewURL, null, 2));
				 console.log(JSON.stringify('Album: '+album, null, 2));

				     });

};

//OMDB 
var movieTitle = 'space%20jam';
var request = require('request');
var searchArray = [];

movieThis = function(){

for (var i=3;i<process.argv.length;i++){
 searchArray.push(process.argv[i]);
}

movieTitle = searchArray.join(" ");
//console.log(movieTitle);

request('http://www.omdbapi.com/?t='+movieTitle+'&y=&plot&r=json&tomatoes=true', function (error, response, body) {
if (!error && response.statusCode == 200) {
	console.log(JSON.stringify(body, null, 2));
	console.log("Title: "+JSON.parse(body)["Title"]);
	console.log("Year: "+JSON.parse(body)["Year"]);
	console.log("IMDB Rating: "+JSON.parse(body)["imdbRating"]);
	console.log("Country: "+JSON.parse(body)["Country"]);
	console.log("Language: "+JSON.parse(body)["Language"]);
	console.log("Plot: "+JSON.parse(body)["Plot"]);
	console.log("Actors: "+JSON.parse(body)["Actors"]);
	console.log("Rotten Tomatoes Rating: "+JSON.parse(body)["tomatoUserRating"]);
	console.log("Rotten Tomatoes URL: "+JSON.parse(body)["tomatoURL"]);


}

});

}


//do what it says
doWhatItSays = function(){};

switch (process.argv[2]) {
	case 'my-tweets':
	myTweets();
	break;

	case 'spotify-this-song':
	spotifySong();
	break;

	case 'movie-this':
	movieThis();
	break;

	case 'do-what-it-says':
	doWhatItSays();
	break;

}

