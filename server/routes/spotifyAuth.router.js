let express = require('express');
let request = require('request');
let querystring = require('querystring');
const pool = require('../modules/pool');
const router = express.Router();

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let redirect_uri =
  process.env.REDIRECT_URI ||
  'http://localhost:5000/callback'

router.get('/login', function (req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      scope: 'user-read-private user-read-email',
      // show_dialog: true,
      redirect_uri
    }))
})

router.get('/callback', function (req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(
        clientID + ':' + clientSecret
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function (error, response, body) {
    access_token = body.access_token
    console.log('access token', access_token);
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    const queryText = 'UPDATE "spotify_token" SET "access_token"=$1 WHERE "id"=$2';
    pool.query(queryText, [access_token, 1])
    res.redirect(uri + '?access_token=' + access_token)
    // res.redirect(uri)
    // postToken(access_token);
  })
})

// function postToken (access_token) {
//   const queryText = 'UPDATE "spotify_token" SET "access_token"=$1 WHERE "id"=$2';
//   pool.query(queryText, [access_token, 1])
//     // .then(() => res.sendStatus(201))
//     // .catch(() => res.sendStatus(500));
// }

// let port = process.env.PORT || 8888
// console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
// router.listen(port)

module.exports = router;