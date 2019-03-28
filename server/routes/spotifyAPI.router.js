const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();


// match spotify account id to id on 'spotify user' database table and return to client side
router.get('/user', async (req, res) => {
    const client = await pool.connect();
    try {
        // let token = await getToken();
        // let spotifyUserInfo = await getUserInfo(token);
        // console.log('spotifyID', spotifyUserInfo);
        
        const result = await client.query(`SELECT "current_user" AS "spotify_id" FROM "spotify_token" WHERE "id"=$1;`, [1])
        let spotifyID = result.rows[0].spotify_id;
        const resultsTwo = await client.query(`SELECT "id" AS "spotify_id" FROM "spotify_user" WHERE "spotify_id"=$1;`, [spotifyID])
        let spotifyUserID = resultsTwo.rows[0];
        res.send(spotifyUserID);
    } catch (error) {
        console.log('error getting user info in get request from Saga', error);
    } finally {
        client.release()
    }
});


router.put('/playlist', async (req, res) => {
    try {
        let selections = req.body;
        console.log('selections', selections);
        let selectionID = await getSelectionID(selections);
        console.log('selectionID', selectionID);
        let access_token = await getToken();
        // let spotifyUserInfo = await getUserInfo(access_token);
        let spotifyUserInfo = await getUserInfo();
        console.log('spotifyUserInfo', spotifyUserInfo.spotify_id);
        let genreName = await getGenreName(selections.genre_id);
        console.log('genre-name', genreName);
        let playlistTracks = await getPlaylistTracks(access_token, genreName, selections, spotifyUserInfo);
        console.log('playlistTracks', playlistTracks);
        let playlistInfo = await createPlaylist(access_token, spotifyUserInfo, selections, selectionID);
        console.log('playlistURL', playlistInfo);
        await addTracksToPlaylist(access_token, playlistInfo.tracks.href, playlistTracks);
        // console.log('tracksAddedResponse', tracksAddedResponse);
        await res.send(playlistInfo)
    }
    catch (error) {
        console.log('error completing Spotify playlist creation', error);
    }
})

// get all genres from 'genre' table on database
router.get('/current-playlist', async (req, res) => {
    let client = await pool.connect();
    try {
        console.log('inside player page get playlist');
        let spotifyUserInfo = await getUserInfo();
        console.log('got user info');
        
        // await client.query('BEGIN')
        let result = await client.query(`SELECT  
            "playlist"."id", 
            "title", 
            "description", 
            "playlist_id",
            "snapshot_id", 
            "playlist"."href", 
            "spotify_user"."spotify_id", 
            "display_name",
            "genre_name",
            "image_path",
            "date_created"
            FROM "playlist"
            JOIN "selection" ON "selection_id"="selection"."id"
            JOIN "genre" ON "genre_id" = "genre"."id"
            JOIN "image" ON "selection"."image_id"="image"."id"
            JOIN "spotify_user" ON "playlist"."spotify_id"="spotify_user"."id"
            WHERE "spotify_user"."spotify_id"=$1
            ORDER BY "date_created" DESC;
            `, [spotifyUserInfo.spotify_id]);
        let userPlaylists = await result.rows;
        console.log('userPlaylists have been created on server');
        // await client.query('COMMIT')
        await res.send(userPlaylists);
    } catch (error) {
        console.log('error getting playlist of current user');
    } finally {
        client.release()
    }
});


// get Spotify account info for logged in user
getUserInfo = async () => {
    let client = await pool.connect();
    try {
        console.log('inside get user info');
        
        
        console.log('pool client', client);
        // await client.query('BEGIN')
        let result = await client.query(`SELECT "current_user" AS "spotify_id" FROM "spotify_token" WHERE "id"=$1;`, [1])
        // not getting to this point in testing
        let spotifyID = result.rows[0].spotify_id;
        let resultsTwo = await client.query(`SELECT * FROM "spotify_user" WHERE "spotify_id"=$1;`, [spotifyID])
        let spotifyUserInfo = await resultsTwo.rows[0];
        console.log('spotifyUserInfo', spotifyUserInfo);
        // await client.query('COMMIT')
        return spotifyUserInfo
    } catch (error) {
        console.log('error getting Spotify user info from API', error);
    } finally {
        client.release()
    }
}

// get current access_token
getToken = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query(`SELECT "access_token" FROM "spotify_token"`)
        const access_token = await result.rows[0].access_token;
        return access_token;
    } catch (error) {
        console.log('error getting current access token from database', error);
    } finally {
        client.release()
    }
}

getSelectionID = async (selections) => {
    const client = await pool.connect();
    try {
        console.log('in get Selection ID', selections);

        let results = await client.query(`INSERT INTO "selection" (image_id, genre_id, spotify_id, energy_value, mood_value) VALUES ($1,$2,$3,$4,$5) RETURNING "id";`,
            [selections.image_id, selections.genre_id, selections.spotify_id, selections.energy_value, selections.mood_value]);
        let selectionID = results.rows[0].id;
        return selectionID
    } catch (error) {
        console.log('error getting posting selections to database and returning selection id', error);
    } finally {
        client.release()
    }
}

getGenreName = async (genreID) => {
    const client = await pool.connect();
    try {
        console.log('in getGenreName', genreID);
        const result = await client.query(`SELECT "genre_name" FROM "genre" WHERE "id"=$1;`, [genreID])
        console.log('genre result', result.rows);

        const genreName = result.rows[0].genre_name;
        return genreName;
    } catch (error) {
        console.log('error getting genre name from database', error);
    } finally {
        client.release()
    }
}


getPlaylistTracks = async (access_token, genreName, selections, spotifyUserInfo) => {
    try {
        let range = .2;
        let maxEnergy = selections.energy_value + range > 1 ? 1 : selections.energy_value;
        let minEnergy = selections.energy_value - range < 0 ? 0 : selections.energy_value;
        let maxValence = selections.mood_value + range > 1 ? 1 : selections.mood_value;
        let minValence = selections.mood_value - range < 0 ? 0 : selections.mood_value;
        console.log('inside get playlist tracks', selections);
        
        const response = await axios({
            method: 'GET',
            url: `https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_genres=${genreName}&min_energy=${minEnergy}&max_energy=${maxEnergy}&target_energy=${selections.energy_value}&min_valence=${minValence}&max_valence=${maxValence}&target_valence=${selections.mood_value}`,
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        })
        const playlistTracks = response.data.tracks.map(track => track.uri);
        // const shuffled = images.sort(() => 0.5 - Math.random());
        // let selected = shuffled.slice(0, 6);
        return playlistTracks;
    } catch (error) {
        console.log('error getting playlist tracks from Spotify API', error);
    }
}

createPlaylist = async (access_token, spotifyUserInfo, selections, selectionID) => {
    const client = await pool.connect();
    try {
        console.log('in create playlist,spotifyUserInfo ', spotifyUserInfo);
        let jsonData = {
            name: selections.playlist_title,
            description: `Created on Stream ${selections.playlist_description}`,
            public: false,
        }
        const response = await axios({
            method: 'POST',
            url: `https://api.spotify.com/v1/users/${spotifyUserInfo.spotify_id}/playlists`,
            data: jsonData,
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
        const playlistInfo = await response.data;
        
        client.query(`INSERT INTO "playlist" (title, description, playlist_id, snapshot_id, href, selection_id, spotify_id, date_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
            [playlistInfo.name, playlistInfo.description, playlistInfo.id, playlistInfo.snapshot_id, playlistInfo.tracks.href, selectionID, spotifyUserInfo.id, Date.now()]);
        return playlistInfo
    } catch (error) {
        console.log('error creating playlist on Spotify API and returning playlist URLs', error);
    } finally {
        client.release()
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