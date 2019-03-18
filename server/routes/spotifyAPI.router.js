const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({});


/**
 * GET route template
 */
router.get('/',(req, res) => {
    queryText = (`SELECT "access_token" FROM "spotify_token"`)
    pool.query(queryText).then((result) => {
        console.log('access_token', result.rows[0].access_token);
        access_token = result.rows[0].access_token;
        spotifyApi.setAccessToken(access_token);


    }).catch((error) => {
        console.log('There was an error with your GET. Definitely syntax');
        res.sendStatus(500);
    })
});




/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;