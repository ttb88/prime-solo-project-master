const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();


// match spotify account id to id on 'spotify user' database table and return to client side
router.get('/user', async (req, res) => {
    try {
        let token = await getToken();
        let spotifyUserInfo = await getUserInfo(token);
        console.log('spotifyID', spotifyUserInfo);
        const client = await pool.connect();
        const result = await client.query(`SELECT "id" AS "spotify_id" FROM "spotify_user" WHERE "spotify_id"=$1;`, [spotifyUserInfo.id])
        let spotifyUserID = result.rows[0];
        res.send(spotifyUserID);
    } catch (error) {
        console.log('error getting user info in get request from Saga', error);
    }
});


router.put('/playlist', async (req, res) => {
    try {
        let selections = req.body;
        console.log('selections', selections);
        let selectionID = await getSelectionID(selections);
        let access_token = await getToken();
        let spotifyUserInfo = await getUserInfo(access_token);
        console.log('spotifyUserInfo', spotifyUserInfo.id);
        let genreName = await getGenreName(selections.genre_id);
        console.log('genre-name', genreName);
        let playlistTracks = await getPlaylistTracks(access_token, genreName, selections, spotifyUserInfo);
        console.log('playlistTracks', playlistTracks);
        let playlistInfo = await createPlaylist(access_token, spotifyUserInfo, selections, selectionID);
        console.log('playlistURL', playlistInfo);
        let tracksAddedResponse = await addTracksToPlaylist(access_token, playlistInfo.tracks.href, playlistTracks);
        // console.log('tracksAddedResponse', tracksAddedResponse);
        res.send(playlistInfo)
    }
    catch (error) {
        console.log('error completing Spotify playlist creation', error);
    }
})


// get Spotify account info for logged in user
getUserInfo = async (access_token) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token, }
        })
        const spotifyUserInfo = response.data
        return spotifyUserInfo
    } catch (error) {
        console.log('error getting Spotify user info from API', error);
    }
}

// get current access_token
getToken = async () => {
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT "access_token" FROM "spotify_token"`)
        const access_token = result.rows[0].access_token;
        return access_token;
    } catch (error) {
        console.log('error getting current access token from database', error);
    }
}

getSelectionID = async (selections) => {
    try {
        const client = await pool.connect();
        console.log('in get Selection ID', selections);

        let results = await client.query(`INSERT INTO "selection" (image_id, genre_id, spotify_id) VALUES ($1,$2,$3) RETURNING "id";`,
            [selections.image_id, selections.genre_id, selections.spotify_id]);
        let selectionID = results.rows[0].id;
        return selectionID
    } catch (error) {
        console.log('error getting posting selections to database and returning selection id', error);
    }
}

getGenreName = async (genreID) => {
    try {
        console.log('in getGenreName', genreID);

        const client = await pool.connect();
        const result = await client.query(`SELECT "genre_name" FROM "genre" WHERE "id"=$1;`, [genreID])
        console.log('genre result', result.rows);

        const genreName = result.rows[0].genre_name;
        return genreName;
    } catch (error) {
        console.log('error getting genre name from database', error);
    }
}


getPlaylistTracks = async (access_token, genreName, selections, spotifyUserInfo) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_genres=${genreName}&max_energy=.6&target_energy=.3&max_valence=.6&target_valence=.4`,
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        })
        const playlistTracks = response.data.tracks.map(track => track.uri);
        return playlistTracks;
    } catch (error) {
        console.log('error getting playlist tracks from Spotify API', error);
    }
}

createPlaylist = async (access_token, spotifyUserInfo, selections, selectionID) => {
    try {
        console.log('in create playlist,spotifyUserInfo ', spotifyUserInfo);
        let jsonData = {
            name: selections.playlist_title,
            description: selections.playlist_description,
            public: false,
        }
        const response = await axios({
            method: 'POST',
            url: `https://api.spotify.com/v1/users/${spotifyUserInfo.id}/playlists`,
            data: jsonData,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
        const playlistInfo = await response.data;
        const client = await pool.connect();
        await client.query(`INSERT INTO "playlist" (title, description, playlist_id, snapshot_id, href, selection_id, spotify_id, date_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
            [playlistInfo.name, playlistInfo.description, playlistInfo.id, playlistInfo.snapshot_id, playlistInfo.tracks.href, selectionID, selections.spotify_id, Date.now()]);

        return playlistInfo
    } catch (error) {
        console.log('error creating playlist on Spotify API and returning playlist URLs', error);
    }
}

addTracksToPlaylist = async (access_token, newPlaylistURL, playlistTracks) => {
    try {
        const response = await axios({
            method: 'POST',
            url: newPlaylistURL,
            data: playlistTracks,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
        const tracksAddedResponse = response;
        return tracksAddedResponse
    } catch (error) {
        console.log('error adding tracks to playlist on Spotify API', error);
    }
}





module.exports = router;