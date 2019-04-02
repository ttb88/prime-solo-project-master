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
        
        const result = await client.query(`SELECT "current_user" AS "spotify_id" FROM "spotify_current" WHERE "id"=$1;`, [1])
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
        console.log('inside playlist generate- selections', selections);
        let selectionID = await getSelectionID(selections);
        console.log('selectionID', selectionID);
        let access_token = await getToken();
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

// get all playlists from 'playlist' table on database
router.get('/all-playlists', async (req, res) => {
    let client = await pool.connect();
    try {
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


router.get('/current-playlist', async (req, res) => {
    let client = await pool.connect();
    try {
        console.log('inside current page get playlist');
        // let spotifyUserInfo = await getUserInfo();
        // console.log('got user info');

        // await getPlaylistInfo();

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
        console.log('userPlaylists have been created on server');
        await res.send(currentPlaylist);
    } catch (error) {
        console.log('error getting current playlist');
    } finally {
        client.release()
    }
});

router.put('/update-current-playlist', async (req, res) => {
    let client = await pool.connect();
    try {
        let currentPlaylistID = req.body.id;
        console.log('inside update current playlist');
        client.query(`UPDATE "spotify_current" SET "current_playlist_id"=$1 WHERE "id"=$2;`, [currentPlaylistID, 1]); 
        console.log('current playlist has been created on server');
        res.sendStatus(201);
    } catch (error) {
        console.log('error updating current playlist');
    } finally {
        client.release()
    }
});

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
        // let one = selections.genres.replace('{', '');
        // let two = one.replace('}', '');
        // let genreArray = two.split(',');
        // console.log('object to array conversion', genres);
        console.log('refresh playlist selections:', selections);
        let access_token = await getToken();
        let playlistTracks = await getPlaylistTracks(access_token, genreName, selections);
        console.log('refreshed playlistTracks', playlistTracks);
        let tracksUpdateResponse = await refreshPlaylist(spotifyID, access_token, playlistURL, playlistTracks);    
        res.sendStatus(201);
    } catch (error) {
        console.log('error refreshing current playlist');
    } 
});

router.put('/set-dates', async (req, res) => {
    console.log('inside set dates', req.body);
    
        const client = await pool.connect();
    try {
         client.query(`UPDATE "selection" SET "date_min"=$1, "date_max"=$2 WHERE "id"=$3;`, [req.body.dateMin, req.body.dateMax, req.body.selectionID]);
        res.sendStatus(201);
    } catch (error) {
        console.log('error updating date range');
    } finally {
        client.release()
    }
});



// get Spotify account info for logged in user
getUserInfo = async () => {
    let client = await pool.connect();
    try {
        console.log('inside get user info');
        
        
        // console.log('pool client', client);
        // await client.query('BEGIN')
        let result = await client.query(`SELECT "current_user" AS "spotify_id" FROM "spotify_current" WHERE "id"=$1;`, [1])
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
        const result = await client.query(`SELECT "access_token" FROM "spotify_current"`)
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

        let results = await client.query(`INSERT INTO "selection" (image_id, genre_id, spotify_id, energy_value, mood_value, date_min, date_max) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING "id";`,
            [selections.image_id, selections.genre_id, selections.spotify_id, selections.energy_value, selections.mood_value, selections.date_min, selections.date_max]);
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


getPlaylistTracks = async (access_token, genreName, selections) => {
    try {
        console.log('inside get playlist tracks', selections);
        
        let range = .4;
        let maxEnergy = selections.energy_value + range > .5 ? .5 : selections.energy_value + range;
        let minEnergy = selections.energy_value - range < 0 ? 0 : selections.energy_value - range;
        let maxValence = selections.mood_value + range > 1 ? 1 : selections.mood_value + range;
        let minValence = selections.mood_value - range < 0 ? 0 : selections.mood_value - range;
        console.log('inside get playlist tracks- energy + valence', maxEnergy, minEnergy, maxValence, minValence);

        // let genres = selections.genres;
        
        const response = await axios({
            method: 'GET',
            url: `https://api.spotify.com/v1/recommendations?limit=90&market=US&seed_genres=${genreName}&min_energy=${minEnergy}&max_energy=${maxEnergy}&target_energy=${selections.energy_value}&min_valence=${minValence}&max_valence=${maxValence}&target_valence=${selections.mood_value}&min_popularity=30&max_speechiness=.2&max_loudness=-5`,
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        })

        //filter out tracks by release date
        // let filteredTracks = response.data.tracks.filter(track => new Date(track.album.release_date).getFullYear() > 2010);
    
        let filteredTracks = await response.data.tracks.filter(track => new Date(track.album.release_date).getFullYear() >= selections.date_min && new Date(track.album.release_date).getFullYear() <= selections.date_max);
         console.log('release dates', filteredTracks);

        //  let filteredTracks = response.data.tracks.map(track => new Date(track.album.release_date).getFullYear());
        // console.log('filtered tracks by year', filteredTracks)
        // let playlistTracks = response.data.tracks.map(track => track.uri);
        let playlistTracks = await filteredTracks.map(track => track.uri);
        console.log('playlist tracks-before shuffle', playlistTracks);
        
        let shuffled = playlistTracks.sort(() => 0.5 - Math.random());
        let selected = shuffled.slice(0, 12); 
        return selected;
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
        let playlistID = await client.query(`INSERT INTO "playlist" (title, description, playlist_id, snapshot_id, href, selection_id, spotify_id, timestamp, date_created) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING "id";`,
            [playlistInfo.name, playlistInfo.description, playlistInfo.id, playlistInfo.snapshot_id, playlistInfo.tracks.href, selectionID, spotifyUserInfo.id, Date.now(), new Date()]);

        client.query(`UPDATE "spotify_current" SET "current_playlist_id"=$1 WHERE "id"=$2;`, [playlistID.rows[0].id, 1]);    
        
        return playlistInfo
    } catch (error) {
        console.log('error creating playlist on Spotify API and returning playlist URLs', error);
    } finally {
        client.release()
    }
}

// getCurrentPlaylistInfo = async () => {
//     const client = await pool.connect();
//     try {
//         console.log('in getCurrentPlaylistInfo');
//         const result = await client.query(`SELECT "*" FROM "playlist"`)
//         console.log('playlist result', result.rows);

//         const playlistID = await result.rows[0].playlist_id;

//         const response = await axios({
//             method: 'GET',
//             url: `https://api.spotify.com/v1/playlists/${playlistID}`,
//             headers: {
//                 'Authorization': 'Bearer ' + access_token,
//                 'Content-Type': 'application/json'
//             }
//         })
//         const playlistInfo = response;
//         console.log('spotify playlistInof', playlistInfo)
        
//         client.query(`UPDATE "playlist" SET "title"=$1, "description"=$2 WHERE "id"=$3;`, [playlistInfo.name, playlistInfo.description, playlistID]);
//         console.log('current playlist has been updated on server');
//         res.sendStatus(201);

//     } catch (error) {
//         console.log('error getting current playlist info on Spotify API', error);
//     } finally {
//         client.release()
//     }
// }

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

getSelection =  async (playlistSelectionID) => {
    const client = await pool.connect();
    try {
        console.log('in getSelections', playlistSelectionID);
        const result = await client.query(`SELECT * FROM "selection" WHERE "id"=$1;`, [playlistSelectionID])
        console.log('selections', result.rows);

        const selections = result.rows[0];
        return selections;
    } catch (error) {
        console.log('error getting selections from database', error);
    } finally {
        client.release()
    }
}

refreshPlaylist = async (spotifyID, access_token, playlistURL, playlistTracks) => {
    console.log('inside refresh playlist- spotifyID, access_token, playlistID, playlistTracks', spotifyID, access_token, playlistURL, playlistTracks )
    try {
        let response = await axios({
            method: 'PUT',
            url: playlistURL,
            data: { "uris": playlistTracks},
            dataType: 'json',
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json'
            }
        })
        const tracksUpdatedResponse = response;
        console.log('refresh successfull, tracksUpdatedResponse', tracksUpdatedResponse);
        // return tracksUpdatedResponse.status;
    } catch (error) {
        console.log('error updaing tracks to playlist on Spotify API', error);
    }

}

module.exports = router;