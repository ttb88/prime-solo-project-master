let express = require('express');
let request = require('request');
let querystring = require('querystring');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


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
      scope: 'user-library-read user-top-read playlist-modify-public user-read-private user-read-email user-follow-read',
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
    addUserInfo(access_token);
    postToken(access_token);
    res.redirect(uri);
    // const queryText = 'UPDATE "spotify_token" SET "access_token"=$1 WHERE "id"=$2';
    // pool.query(queryText, [access_token, 1])
    // res.redirect(uri + '?access_token=' + access_token)
  })
})

addUserInfo = access_token => {
  axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + access_token,
    }
  }).then(res => {
    console.log('res', res.data);
    let user = res.data
    const queryText = `INSERT INTO "spotify_user" (display_name, spotify_id, email, href, uri, country) VALUES ($1,$2,$3,$4,$5,$6);`;
    pool.query(queryText, [user.display_name, user.id, user.email, user.href, user.uri, user.country]) 
  }).catch(error => {
    console.log('there was an error', error);
  })
}

module.exports = router;