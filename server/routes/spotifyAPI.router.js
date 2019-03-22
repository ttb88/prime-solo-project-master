const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
// const SpotifyWebApi = require('spotify-web-api-node');
// const spotifyApi = new SpotifyWebApi();

let request;

/**
 * GET route template
 */
router.post('/',(req, res) => {
    console.log('inside spotify get');
    queryText = (`SELECT "access_token" FROM "spotify_token"`)
    pool.query(queryText).then((result) => {
        console.log('access_token', result.rows[0].access_token);
        access_token = result.rows[0].access_token
        axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/recommendations?limit=1&market=US&seed_genres=french%2C%20pop&max_energy=.6&target_energy=.3&max_valence=.6&target_valence=.4',
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        }).then(res => {
            console.log('res', res.data); 
            request = res.data.tracks
        })
    }).catch((error) => {
        console.log('There was an error with your GET. Definitely syntax', error);
        res.sendStatus(500);
    })
});

router.get('/token', (req,res) => {
    res.send(request)
})








    /**
     * POST route template
     */
    router.post('/', (req, res) => {

    });

    module.exports = router;