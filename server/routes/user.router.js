const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  getSpotifyID();
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

getSpotifyID = () => {
  
}


module.exports = router;
