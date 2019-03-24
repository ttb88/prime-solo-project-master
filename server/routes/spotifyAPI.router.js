const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
// const SpotifyWebApi = require('spotify-web-api-node');
// const spotifyApi = new SpotifyWebApi();

let playlistTracks = [];
// let selections = {
//     image_id: '',
//     genre_id: '',
// };
let newPlaylist;
let embed = '';


// let selectedGenre = ''



/**
 * GET route template
 */

// let access_token = '';

router.get('/', (req, res) => {
    console.log('inside spotify get');
    pool.query(`SELECT "access_token" FROM "spotify_token"`)
        .then((result) => {
            access_token = result.rows[0].access_token;
            // res.send(token)
            axios({
                method: 'GET',
                url: `https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_genres=ambient&max_energy=.6&target_energy=.3&max_valence=.6&target_valence=.4`,
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                }
            }).then(res => {
                console.log('res', res.data);
                playlistTracks = res.data.tracks.map(track => track.uri);
            }).catch((error) => {
                console.log('error', error);
                res.sendStatus(500);
            })
        })
    res.sendStatus(204);
});

let jsonData = {
    name: 'New Playlist',
    public: false,
    description: 'enjoy...',
}

let newPlaylistURL = '';


// router.post('/playlist', (req, res) => {
//     axios({
//         method: 'POST',
//         url: `https://api.spotify.com/v1/users/tbraasch/playlists`,
//         data: jsonData,
//         dataType: 'json',
//         headers: {
//             'Authorization': 'Bearer ' + access_token,
//             'Content-Type': 'application/json'
//         }
//     }).then(res => {
//         console.log('res after creating playlist', res.data.id);
//         newPlaylistURL = res.data.tracks.href;
//         embed = res.data.id
//         addTracks();
//     })
//     res.sendStatus(201);
// })



addTracks = () => {
    axios({
        method: 'POST',
        url: newPlaylistURL,
        data: playlistTracks,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log('res after tracks created', res.data);
    })
}



router.get('/widgetURL', (req, res) => {
    console.log('embedurl', embed);
    res.send(embed)
})





// getGenre = () => {
//     queryText = (`SELECT "genre_name" FROM "genre" WHERE "id"=$1`)
//     const queryValues = [selections.genre_id];
//     pool.query(queryText, queryValues).then((result) => {
//         console.log('genre', result.rows[0].genre_name);
//         return result.rows[0].genre_name;
//     })
// }


router.post('/image', (req, res) => {
    console.log('selection', req.body);
    selections.image_id = req.body.id;
})

router.post('/genre', (req, res) => {
    console.log('selection', req.body);
    selections.genre_id = req.body.genre_id;
    console.log('selections', selections)
})


router.get('/token', (req, res) => {
    res.send(request)
})



// new server code
// let selections = {};

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


// const client = await pool.connect();
// try {
//     const result = await client.query(`SELECT "access_token" FROM "spotify_token"`)
//     const access_token = result.rows[0].access_token; 

//     const response = await axios({
//         method: 'GET',
//         url: 'https://api.spotify.com/v1/me',
//         headers: {
//             'Authorization': 'Bearer ' + access_token,
//         }
//     })
//         const spotifyUserID = response.data.id
//         console.log('response data', spotifyUserID);
//         res.send(spotifyUserID);

// } catch (error) {
//     console.log('error', error);   
// }
// });


// router.post('/selections', async (req, res) => {
//     console.log('in selection', req.body);
    
//     const client = await pool.connect();
//     let results = await client.query(`INSERT INTO "selection" (image_id, genre_id, spotify_id, title, description) VALUES ($1,$2,$3,$4,$5) RETURNING "id";`,
//     [req.body.image_id, req.body.genre_id, req.body.spotify_id, req.body.playlist_title, req.body.playlist_description]);
//     let currentPlaylistID = results.rows[0].id;
//     console.log('current client id', currentPlaylistID);
    
//     res.send(currentPlaylistID); 
// })


router.put('/playlist', async (req, res) => {
    try {
        let selectionID = await getSelectionID(req.body);
        console.log('selectionID', selectionID);
         

        // let token = await getToken();
        // let spotifyUserInfo = await getUserInfo(token);
        // let genreName = await getGenreName(selections.genre_id);
        // console.log('genre-name', genreName);
        // let playlistTracks = await getPlaylist(token, selections, spotifyUserInfo);

    }
    catch {

    }
    // let userInfo = getUserInfo();
    // let token = getToken();
    // let playlistTracks = getPlaylist(token, selections);
    // let newPlaylist = createPlaylist(token);
})

// get Spotify account info for logged in user
getUserInfo = async (access_token) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me',
            headers: {'Authorization': 'Bearer ' + access_token,}
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
        let results = await client.query(`INSERT INTO "selection" (image_id, genre_id, spotify_id, title, description) VALUES ($1,$2,$3,$4,$5) RETURNING "id";`,
            [selections.image_id, selections.genre_id, selections.spotify_id, selections.playlist_title, selections.playlist_description]);
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


getPlaylist = (access_token, selections) => {
    axios({
        method: 'GET',
        url: `https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_genres=${genre}&max_energy=.6&target_energy=.3&max_valence=.6&target_valence=.4`,
        headers: {
            'Authorization': 'Bearer ' + access_token,
        }
    }).then(res => {
        console.log('res', res.data);
        playlistTracks = res.data.tracks.map(track => track.uri);
        return playlistTracks;
    }).catch((error) => {
        console.log('error getting playlist', error);
        res.sendStatus(500);
    })

}

createPlaylist = (access_token) => {
    axios({
        method: 'POST',
        url: `https://api.spotify.com/v1/users/tbraasch/playlists`,
        data: jsonData,
        dataType: 'json',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log('res after creating playlist', res.data.id);
        newPlaylistURL = res.data.tracks.href;
        embed = res.data.id
        addTracks();
    })

}



/**
 * POST route template
 */
// router.post('/', (req, res) => {

// });

module.exports = router;