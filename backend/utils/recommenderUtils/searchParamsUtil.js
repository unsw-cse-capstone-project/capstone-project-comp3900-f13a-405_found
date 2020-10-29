// utility functions for getting a list of Show ids from Subscriptions and lookup of episodes from user history.
// Removes duplicates and concatenates the two seperate lists above.
const axios = require("axios");
const lodash = require("lodash");
const { NotFound, BadRequest } = require("../errors");

// @return: JSON OBJECT:
//  {
//      'name': 'show name'    
//      'publisher': 'show publisher'
//  }


// method 1 to use in method 2 
// (method 1) create a list of show ids from episode ids in history using spotify API
// (method 2) create a list of names and publishers for a given show as a list using spotify API. showId as reference.  

const findShowId = async (id, next) => {
    try {
        const uri = encodeURI(
            `https://api.spotify.com/v1/episodes/${id}?market=AU`
        );
        const headers = {
            "user-agent": "node.js",
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`
        };
        const spotifyResponse = await axios.get(uri, { headers });
        const spotifyResObj = JSON.parse(spotifyResponse.data);
        return spotifyResObj.id;


    } catch (err) {
        console.error(err.message);
        next(new NotFound([{msg: "Recommender: Could not find show id for an episode"}]));
    }
};

// Given user history JSON object, returns a JSON object of all show ids for episodes removing duplicates.
const getShowIdsFromHist = async (history) => {
    // history -> JSON HistoryModel Collection.
    try {
        const histObj = JSON.parse(history);        
        const episode_ids = lodash.map(histObj, 'podcast_id');

        var showIdsFromHist = [];
        episode_ids.array.forEach(episode_id => {
            const val = findShowId(episode_id);
            showIdsFromHist.push(val);
        });

        return showIdsFromHist;

    } catch (err) {
        console.error(err.message);
        next(new NotFound([{ msg: "Recommender: User History not found." }]));
    }

}

// Concatenates Subscriptions show ids with episodes show ids.

const getShowIdsFromSubs = async (subscriptions) => {
    try {
        const subsObj = JSON.parse(subscriptions);
        const showIdsFromSubs = lodash.map(subsObj, 'showId');
        return showIdsFromSubs;

    } catch (err) {
        console.error(err.message);
        next (new NotFound([{ msg: "Recommender: Subscriptions not found"}]));
    }

};

const getShowIds = async (history, subscriptions, next) => {
    try {
        const showIdsFromHist = getShowIdsFromHist(history);
        const showIdsFromSubs = getShowIdsFromSubs(subscriptions);
        const showIds = lodash.union(showIdsFromHist, showIdsFromSubs);
        return showIds;
    } catch (err) {
        console.error(err.message) 
        next(new BadRequest([{ msg: "Recommender: Could not give showId list."}]));
    }
};

const getShowData = async (show_id, next) => {
    try {
        const uri = encodeURI(
           `https://api.spotify.com/v1/shows/${show_id}?market=AU`
        );
        const headers = {
            "user-agent": "node.js",
            Authorization: `Bearer ${SPOTIFY_ACCESS_TOKEN}`,
        };
        const spotifyResponse = await axios.get(uri, { headers });
        const spotifyResObj = JSON.parse(spotifyResponse.data);
        const data = 
        {
            title: `${spotifyResObj.name}`,
            publisher: `${spotifyResObj.publisher}`,
        };
        return data;
        

    } catch (err) {
        console.error(err.message);
        next (new NotFound([{ msg: "No show found with id: " + show_id }]));
    }
}

const getSearchParams = async (history, subscriptions, next) => {
    try {
        const showIds = getShowIds(history, subscriptions);
        const shows = []; 
        (await showIds).forEach(show_id => {
            var showData = getShowData(show_id);
            shows.push(showData);
        });
        return shows;

    } catch (err) {
        console.error(err.message);
        next(new BadRequest([{ msg: "Recommender: Could not get list of shows."}]));
    }
};

module.exports = getSearchParams(history, subscriptions);