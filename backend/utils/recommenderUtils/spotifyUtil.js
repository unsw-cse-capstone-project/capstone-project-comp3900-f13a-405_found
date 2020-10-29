// Utility methods for finding equivalent spotify ids given a podcast title and publisher.
const axios = require("axios");
const lodash = require("lodash");
const { BadRequest, NotFound } = require("../errors");

const getSpotifyRec = async (recommendation, next) => {
    try {
        const uri = encodeURI(
            `https://api.spotify.com/v1/search?q=name:"${recommendation.title}"%20artist:"${recommendation.publisher}"&type=show&market=AU`
        );
        const headers = {
            "user-agent": "node.js",
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
        } 
        const spotifyResponse = await axios.get(uri, { headers });
        const spotifyResObj = JSON.parse(spotifyResponse.data);
        // spotifyResObj = object containing array of show objects.
        const show = lodash.find(
            spotifyResObj.shows.items, 
            {'name' : `${recommendation.title}`, 'publisher' : `${recommendation.publisher}`}
        );
        if (typeof show == "undefined") return;
        return show;
        
    } catch(err) {
        console.error(err.message);
        next (new NotFound(
            [{msg: "Could not find spotify id for podcast" + `${recommendation.title}`}]
        ));
    }
}

const getMatchedSpotifyRecs = async (listenNotesRecs, next) => {
    try{
        const spotifyRecs = [];
        listenNotesRecs.array.forEach(recommendation => {
            var spotifyRec = getSpotifyRec(recommendation);
            spotifyRecs.push(spotifyRec);
        });

        const recommendations = JSON.stringify(spotifyRecs);
        return recommendations;
    } catch(err) {
        console.error(err.message);
        next(new BadRequest([{msg: "Recommender: Bad request for spotify Id finder"}]));
    }
}

module.exports = getMatchedSpotifyRecs(listenNotesRecs);