// Utility methods for finding equivalent spotify ids given a podcast title and publisher.
const axios = require("axios");
const lodash = require("lodash");
const { BadRequest, NotFound } = require("../errors");

var SpotifyUtil = function() {};


const matchSpotifyRec = async function(listenNotesRec) {
    const uri = encodeURI(
        `https://api.spotify.com/v1/search?query="${listenNotesRec.title}"&type=show&include_external=audio&market=AU&offset=0&limit=20`

    );
    const headers = {
        "user-agent": "node.js",
        Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
    }
    const spotifyResponse = await axios.get(uri, {headers});
    console.log(spotifyResponse);
    if (spotifyResponse.data.shows.items.total == 0) return;
    const show = lodash.find(
        spotifyResponse.data.shows.items, {
            'name': `${listenNotesRec.title}`,
            'publisher': `${listenNotesRec.publisher}`
        }
    );
    if(typeof show == undefined) return;
    return show; 
    
}

const matchSpotifyRecs = async function(listenNotesRecs) {
    const spotifyRecs = [];
    for (listenNotesRec of listenNotesRecs) {
        var spotifyRec = await matchSpotifyRec(listenNotesRec);
        spotifyRecs.push(spotifyRec);
    }
    return spotifyRecs;
}

SpotifyUtil.prototype.getMatchedSpotifyRecs = async function(listenNotesRecs) {
    const spotifyRecs = matchSpotifyRecs(listenNotesRecs);
    return spotifyRecs;
}

module.exports = SpotifyUtil;