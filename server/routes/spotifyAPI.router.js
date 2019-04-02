const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();


// match spotify account id to id on 'spotify user' database table and return 'id' from 'spotify_user' table
router.get('/user', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query(`SELECT "current_user" AS "spotify_id" FROM "spotify_current" WHERE "id"=$1;`, [1])
        let spotifyID = result.rows[0].spotify_id;
        const spotifyUser = await client.query(`SELECT "id" AS "spotify_id" FROM "spotify_user" WHERE "spotify_id"=$1;`, [spotifyID])
        let spotifyUserID = spotifyUser.rows[0];
        res.send(spotifyUserID);
    } catch (error) {
        console.log('error getting user info in get request from Saga', error);
    } finally {
        client.release()
    }
});

// initiate process to create new playlst base on user's selections and return pertinent playlist info
router.put('/playlist', async (req, res) => {
    try {
        let selections = req.body;
        console.log('inside playlist generate- selections', selections);
        let selectionID = await getSelectionID(selections);
        console.log('selectionID:', selectionID);
        let access_token = await getToken();
        let spotifyUserInfo = await getUserInfo();
        console.log('spotifyUserInfo:', spotifyUserInfo.spotify_id);
        let genreName = await getGenreName(selections.genre_id);
        console.log('genre-name:', genreName);
        let playlistTracks = await getPlaylistTracks(access_token, genreName, selections, spotifyUserInfo);
        console.log('playlistTracks:', playlistTracks);
        let playlistInfo = await createPlaylist(access_token, spotifyUserInfo, selections, selectionID);
        console.log('playlistURL:', playlistInfo);
        await addTracksToPlaylist(access_token, playlistInfo.tracks.href, playlistTracks);
        await res.send(playlistInfo)
    }
    catch (error) {
        console.log('error completing playlist creation', error);
    }
})

// initiate query to 'playlist' table on database to retrieve pertinent info for 
// all of current user's playlists for display on 'SavedPlaylists' component
router.get('/all-playlists', async (req, res) => {
    let client = await pool.connect();
    try {
        let spotifyUserInfo = await getUserInfo();
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
            "selection_id",
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
        console.log('userPlaylists have been retrieved from server');
        // await client.query('COMMIT')
        await res.send(userPlaylists);
    } catch (error) {
        console.log('error getting playlist of current user');
    } finally {
        client.release()
    }
});


// initiate query to database and retrieve all pertinent info on current playlist to for display on 'PlayerPage' component
router.get('/current-playlist', async (req, res) => {
    let client = await pool.connect();
    try {
        console.log('inside get current playlist');

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
            "selection_id",
            "date_created"
            FROM "playlist"
            JOIN "selection" ON "selection_id"="selection"."id"
            JOIN "genre" ON "genre_id" = "genre"."id"
            JOIN "image" ON "selection"."image_id"="image"."id"
            JOIN "spotify_user" ON "playlist"."spotify_id"="spotify_user"."id"
            JOIN "spotify_current" ON "current_playlist_id"="playlist"."id";`)
        let currentPlaylist = await result.rows;
        await res.send(currentPlaylist);
    } catch (error) {
        console.log('error getting current playlist');
    } finally {
        client.release()
    }
});

// initiate database query to 'spotify_current' table when a pre-exsiting playlist is selected from playlist board
router.put('/update-current-playlist', async (req, res) => {
    console.log('inside update current playlist');
    let client = await pool.connect();
    try {
        let currentPlaylistID = req.body.id;
        client.query(`UPDATE "spotify_current" SET "current_playlist_id"=$1 WHERE "id"=$2;`, [currentPlaylistID, 1]);
        console.log('current playlist has been updated on server');
        res.sendStatus(201);
    } catch (error) {
        console.log('error updating current playlist');
    } finally {
        client.release()
    }
});

// initiate refresh of current playlist when selected selected from 'more option' menu on 'PlayerPage' component
router.put('/refresh-current-playlist', async (req, res) => {
    try {
        console.log('inside refresh current playlist', req.body);
        let selectionID = req.body.selection_id;
        console.log('refresh selection ID', selectionID);
        let genreName = req.body.genre_name;
        let playlistURL = req.body.href;
        console.log('playlistURL', playlistURL);
        let spotifyID = req.body.spotify_id;
        let selections = await getSelection(selectionID);
        console.log('refresh playlist selections:', selections);
        let access_token = await getToken();
        let playlistTracks = await getPlaylistTracks(access_token, genreName, selections);
        console.log('refreshed playlistTracks', playlistTracks);
        await refreshPlaylist(spotifyID, access_token, playlistURL, playlistTracks);
        res.sendStatus(201);
    } catch (error) {
        console.log('error refreshing current playlist');
    }
});

// initiate database query to 'selection' table to update dateMin/dateMax fields when selected from 'more option' menu on 'PlayerPage' component
router.put('/set-dates', async (req, res) => {
    console.log('inside set dates', req.body);

    const client = await pool.connect();
    try {
        client.query(`UPDATE "selection" SET "date_min"=$1, "date_max"=$2 WHERE "id"=$3;`,
            [req.body.dateMin, req.body.dateMax, req.body.selectionID]);
        res.sendStatus(201);
    } catch (error) {
        console.log('error updating date range');
    } finally {
        client.release()
    }
});



// initiate database query to 'spotiy_user' table to retrieve account info from current user
getUserInfo = async () => {
    let client = await pool.connect();
    try {
        console.log('inside get user info');
        let result = await client.query(`SELECT "current_user" AS "spotify_id" FROM "spotify_current" WHERE "id"=$1;`, [1])
        let spotifyID = result.rows[0].spotify_id;
        let resultsTwo = await client.query(`SELECT * FROM "spotify_user" WHERE "spotify_id"=$1;`, [spotifyID])
        let spotifyUserInfo = await resultsTwo.rows[0];
        return spotifyUserInfo
    } catch (error) {
        console.log(`error getting Spotify user info from 'spotify_user' table on database`, error);
    } finally {
        client.release()
    }
}

// get current access_token
getToken = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query(`SELECT "access_token" FROM "spotify_current"`)
        const access_token = await result.rows[0].access_token;
        return access_token;
    } catch (error) {
        console.log(`error getting current access token from 'spotify_current' table on database`, error);
    } finally {
        client.release()
    }
}


// initiate database query to insert choosen user selections and return id
getSelectionID = async (selections) => {
    const client = await pool.connect();
    try {
        console.log('in get Selection ID', selections);

        let results = await client.query(`INSERT INTO "selection" 
        (image_id, genre_id, spotify_id, energy_value, mood_value, date_min, date_max) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "id";`,
        [selections.image_id, selections.genre_id, selections.spotify_id, selections.energy_value, selections.mood_value, selections.date_min, selections.date_max]);
        
        let selectionID = results.rows[0].id;
        return selectionID
    } catch (error) {
        console.log(`error posting selections to 'selection' table on database and returning id`, error);
    } finally {
        client.release()
    }
}

// use genre_id from database to return string of genre name
getGenreName = async (genreID) => {
    const client = await pool.connect();
    try {
        console.log('in getGenreName- genreID:', genreID);
        const result = await client.query(`SELECT "genre_name" FROM "genre" WHERE "id"=$1;`, [genreID])
        const genreName = result.rows[0].genre_name;
        return genreName;
    } catch (error) {
        console.log(`error getting genre name from 'genre' table on database`, error);
    } finally {
        client.release()
    }
}

// initiate POST to Spotify API and create playlist to current user's account
createPlaylist = async (access_token, spotifyUserInfo, selections, selectionID) => {
    const client = await pool.connect();
    try {
        console.log('in create playlist');
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
        let playlistID = await client.query(`INSERT INTO 
        "playlist" (title, description, playlist_id, snapshot_id, href, selection_id, spotify_id, timestamp, date_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING "id";`,
        [playlistInfo.name, playlistInfo.description, playlistInfo.id, playlistInfo.snapshot_id, playlistInfo.tracks.href, selectionID, spotifyUserInfo.id, Date.now(), new Date()]);

        client.query(`UPDATE "spotify_current" SET "current_playlist_id"=$1 WHERE "id"=$2;`, [playlistID.rows[0].id, 1]);

        return playlistInfo
    } catch (error) {
        console.log('error creating playlist on Spotify API and returning playlist info', error);
    } finally {
        client.release()
    }
}

// initiate GET to Spotify API based on recommendation seed info provided and return an array of 12 tracks
getPlaylistTracks = async (access_token, genreName, selections) => {
    try {
        console.log('inside get playlist tracks- selections:', selections);

        // set range for energy and valence levels
        let range = .4;
        let maxEnergy = selections.energy_value + range > .5 ? .5 : selections.energy_value + range;
        let minEnergy = selections.energy_value - range < 0 ? 0 : selections.energy_value - range;
        let maxValence = selections.mood_value + range > 1 ? 1 : selections.mood_value + range;
        let minValence = selections.mood_value - range < 0 ? 0 : selections.mood_value - range;

        const response = await axios({
            method: 'GET',
            url: `https://api.spotify.com/v1/recommendations?limit=90&market=US&seed_genres=${genreName}&min_energy=${minEnergy}&max_energy=${maxEnergy}&target_energy=${selections.energy_value}&min_valence=${minValence}&max_valence=${maxValence}&target_valence=${selections.mood_value}&min_popularity=30&max_speechiness=.2&max_loudness=-5`,
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        })

        console.log('playlist tracks-before filter', response.data.tracks.map(track => track.uri));
        //filter out tracks by release date range
        let filteredTracks = await response.data.tracks.filter(track =>
            new Date(track.album.release_date).getFullYear() >= selections.date_min &&
            new Date(track.album.release_date).getFullYear() <= selections.date_max);

        let playlistTracks = await filteredTracks.map(track => track.uri);
        let shuffled = playlistTracks.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 12);
        return selected;
    } catch (error) {
        console.log('error getting new tracks from Spotify API', error);
    }
}



// initiate POST to Spotify API and insert current array of 12 tracks into current playlist
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
        console.log('error adding tracks to current playlist on Spotify API', error);
    }
}

// initiate database query to 'selection' table and retrieve all info from pre-existing playlist selected on playlist board
getSelection = async (playlistSelectionID) => {
    const client = await pool.connect();
    try {
        console.log('in getSelections', playlistSelectionID);
        const result = await client.query(`SELECT * FROM "selection" WHERE "id"=$1;`, [playlistSelectionID])
        console.log('selections', result.rows);

        const selections = result.rows[0];
        return selections;
    } catch (error) {
        console.log(`error getting selections 'selection' table on database`, error);
    } finally {
        client.release()
    }
}

// upon clicking 'refresh playlist' button a PUT to Spotify API is initiated and replaces current playlist with refreshed array of 12 tracks
refreshPlaylist = async (spotifyID, access_token, playlistURL, playlistTracks) => {
    console.log('inside refresh playlist- spotifyID, access_token, playlistID, playlistTracks', spotifyID, access_token, playlistURL, playlistTracks)
    try {
        let response = await axios({
            method: 'PUT',
            url: playlistURL,
            data: { "uris": playlistTracks },
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
        const tracksUpdatedResponse = response;
        console.log('refresh successful / tracksUpdatedResponse:', tracksUpdatedResponse);
    } catch (error) {
        console.log('error updaing tracks to playlist on Spotify API', error);
    }

}

module.exports = router;