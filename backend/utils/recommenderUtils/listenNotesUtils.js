// utility functions for getting recommendations from listen notes.

const axios = require("axios");
const lodash = require("lodash");
const { BadRequest } = require("../errors");


// ====== Listen Notes keys ======
// const key = "5df881c89d644904bc39af8b922c9441"; //old key
// const key = "d370e5f11d0a4b14956d88517e75fd8a"; // Nathan's key
//const key = "49ec7884ad4a47f2be99eed90a061cf4"; // Spare key 1
//const endpoint = "https://listen-api.listennotes.com/api/v2/";
// ===============================

const getShowId = async (show, next) => {
    try {
        const uri = encodeURI(
            `https://listen-api.listennotes.com/api/v2/search${show.title}%20${show.publisher}&type=podcast&region=au`
        );
        const headers = {
            "user-agent": "node.js",
            "X-ListenAPI-Key": "49ec7884ad4a47f2be99eed90a061cf4",
        };
        const id_response = await axios.get(uri, {headers});

        if (id_response.results = []) return "matchFail";
        
        const match = lodash.find(id_response.podcast.publisher_original);
        if (match == undefined) return "matchFail";

        return match.id;
    } catch(err) {
        console.error(err.message);
        next(new BadRequest([{msg: "Recommender: Bad request for listenNotes search"}]));
    }
};

const getShowIds = async (show_list, next) => {
    try {
        // given a json array of shows with name and id, foreach show find the id - add to list and return.
        const ids = [];
        show_list.array.forEach(show => {
            const id = getShowId(show);
            if (id != "matchFail") ids.push(id);
        });
        return ids;

    } catch(err) {
        console.error(err.message);
        next (new BadRequest([{msg: "Recommender: Bad request for listenNotes search"}]));
    }
};

const getData = async (rec_response, next) => {
    try {
        const data = {
            title: `${rec_response.title}`,
            publisher: `${rec_response.publisher}`,
        };
        return data;
    } catch(err) {
        console.error(err.message);
        next(new BadRequest([{msg: "Recommender: Bad listenNotes recommender request"}]))
    }
}

const getRecommendations = async (id, next) => {
    try {
        const uri = encodeURI(
            `https://listen-api.listennotes.com/api/v2/podcasts/${id}/recommendations`
        );
        const headers = {
            "user-agent": "node.js",
            'X-ListenAPI-Key': '49ec7884ad4a47f2be99eed90a061cf4',
        }
        const rec_response = await axios.get(uri, { headers });
        const rec_list = [];
        rec_response.recommendations.forEach(recommendation => {
            const rec_data = getData(recommendation);
            rec_list.push(rec_data); 
        })
        return rec_list;
        
    } catch(err) {
        console.error(err.message);
        next(new BadRequest([{msg: "Recommender: Bad listenNotes recommender request"}]));
    }

}

const getListenNotesRecs = async (shows_list, next) => {
    try {
        const ids = getShowIds(show_list);
        const rec_list = [];
        ids.forEach(id => {
            const recommendations = getRecommendations(id);
            rec_list.push(recommendations);                    
        });
        const ListenNotesRecs = lodash.flatten(rec_list);
        return ListenNotesRecs;
    } catch(err) {

    }
};

module.exports = getListenNotesRecs;


