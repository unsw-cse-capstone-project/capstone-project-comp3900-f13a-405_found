// utility functions for getting recommendations from listen notes.

const axios = require("axios");
const lodash = require("lodash");


// ====== Listen Notes keys ======
// const key = "5df881c89d644904bc39af8b922c9441"; 
// const key = "d370e5f11d0a4b14956d88517e75fd8a"; 
// const key = "49ec7884ad4a47f2be99eed90a061cf4"; < -- currently in use
// const endpoint = "https://listen-api.listennotes.com/api/v2/";
// ===============================

var ListenNotes = function() {}; 

const getShowId = async function(show) {
    try {
        const uri = encodeURI(
            `https://listen-api.listennotes.com/api/v2/search?q=${show.publisher}&type=podcast&only_in=author`
        );
        const headers = {
            'X-ListenAPI-Key': '49ec7884ad4a47f2be99eed90a061cf4'
        };
        const idResponse = await axios.get(uri, {headers});
        if (idResponse.data.total == 0) return "matchFail"; 
        const results = idResponse.data.results;
        const match = lodash.find(results, {
            'title_original': `${show.title}`,
            'publisher_original': `${show.publisher}`
        });
        if (typeof match == "undefined") return "matchFail";
        return match.id;

    } catch(err) {
        console.error(err.message);
        return;
    }
}

const getShowIds = async function(showsList) {
    const showIds = [];
    for (show of showsList) {
        let showId = await getShowId(show)
        showIds.push(showId);
    }
    return showIds;
}

const getData = function(recommendation) {
    const data = {
        title: `${recommendation.title}`,
        publisher: `${recommendation.publisher}`,
    };
    return data;
}

const getRecommendation = async function(showId) {
    try {
        if (showId == "matchFail") return;
        const uri = encodeURI(
            `https://listen-api.listennotes.com/api/v2/podcasts/${showId}/recommendations`
        );
        const headers = {
            'X-ListenAPI-Key': '49ec7884ad4a47f2be99eed90a061cf4',
        }

        const recResponse = await axios.get(uri, {headers});
        const listenNoteRecs = recResponse.data.recommendations;


        const recommendations = [];
        for (rec of listenNoteRecs) {
            const recData = getData(rec);
            recommendations.push(recData);
        }
        return recommendations;
    } catch(err) {
        console.error(err.message);
    }
    return recommendations;
}

const getRecommendations = async function(showIds) {
    const recommendations = [];
    for (showId of showIds) {
        const recommendation = await getRecommendation(showId);
        recommendations.push(recommendation);
    }
    const flattenedRecs = lodash.flatten(recommendations);
    const uniqueList = lodash.uniqWith(flattenedRecs, lodash.isEqual);
    const filteredList = lodash.compact(uniqueList);
    return filteredList;
}



ListenNotes.prototype.getListenNotesRecs = async function(showsList) {
    const showIds = await getShowIds(showsList);
    const recommendations = await getRecommendations(showIds);
    return recommendations;
}

module.exports = ListenNotes;

