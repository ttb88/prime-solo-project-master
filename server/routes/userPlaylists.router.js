const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const access_token = require('../modules/access-token');

/**
 * GET route template
 */
// get all genres from 'genre' table on database
router.get('/', async (req, res) => {
    try {
        let token = await access_token;
        console.log('token is', token);
        
        const response = await axios({
            method: 'GET',
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + token, }
        })
        const spotifyUserInfo = response.data
        console.log('spotifyuserinfo', spotifyUserInfo);
        
        const client = await pool.connect();
        const result = await client.query(`SELECT  
            "playlist"."id", 
            "title", 
            "description", 
            "playlist_id",
            "snapshot_id", 
            "playlist"."href", 
            "spotify_user"."spotify_id", 
            "display_name",
            "genre_name",
            "date_created"
            FROM "playlist"
            JOIN "selection" ON "selection_id"="selection"."id"
            JOIN "genre" ON "genre_id" = "genre"."id"
            JOIN "spotify_user" ON "playlist"."spotify_id"="spotify_user"."id"
            WHERE "spotify_user"."spotify_id"=$1
            ORDER BY "date_created" DESC;
            `, [spotifyUserInfo.id]);
        const userPlaylists = await result.rows;
        console.log('userPlaylists', userPlaylists);
        res.send(userPlaylists);
    } catch (error) {
        console.log('error getting playlist of current user', error);
    }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;