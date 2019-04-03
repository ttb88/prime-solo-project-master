const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
// get all genres from 'genre' table on database
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "genre";`).then((result) => {
        res.send(result.rows);
    }).catch(error => {
        console.log('there was an error getting genres', error);
    })
});


module.exports = router;