const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// get all images from 'image' table on database
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "image";`).then((result) => {
        // console.log('image results', result.rows);
        res.send(result.rows);
    }).catch(error => {
        console.log('there was an error getting images', error);
    })
});


module.exports = router;