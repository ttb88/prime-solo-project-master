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
  'https://prime-solo-project-stream.herokuapp.com/spotify-auth/callback'

router.get('/login', function (req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientID,
      scope: 'user-top-read playlist-modify-public playlist-modify-private playlist-read-private user-read-private user-read-email user-follow-read',
      show_dialog: true,
      redirect_uri,
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
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/#/genre'
    userInfo(access_token);
    postToken(access_token);
    res.redirect(uri);
    // const queryText = 'UPDATE "spotify_token" SET "access_token"=$1 WHERE "id"=$2';
    // pool.query(queryText, [access_token, 1])
    // res.redirect(uri + '?access_token=' + access_token)
  })
})

// make get requst for user's Spotify info
userInfo = (access_token) => {
  axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': 'Bearer ' + access_token,
    }
  }).then(res => {
    let user = res.data
    console.log('current user', user);
    
    checkDatabase(user);
    addToCurrentUser(user);
  }).catch(error => {
    console.log('there was an error', error);
  })
}

// check to see if user is in database- if not add to database
checkDatabase = (user) => {
  pool.query(`SELECT * FROM "spotify_user" WHERE "spotify_id"=$1;`, [user.id])
    .then((result) => {
      // add user if not in database
      console.log('inside checkdatabase', result.rows);
      
      if (!result.rows[0]) {
        console.log('adding user to database');
        const queryText = `INSERT INTO "spotify_user" (display_name, spotify_id, email, href, uri, country) VALUES ($1,$2,$3,$4,$5,$6);`;
        pool.query(queryText, [user.display_name, user.id, user.email, user.href, user.uri, user.country])
      }
      else {
        console.log('user already in database');
      }
    }).catch(error => {
      console.log('there was an error checking user against database', error);
    })
}

// post current access token to database
postToken = access_token => {
  const queryText = 'UPDATE "spotify_token" SET "access_token"=$1 WHERE "id"=$2';
  pool.query(queryText, [access_token, 1]).then(() => {
    console.log('access token added to database');
  }).catch(error => {
    console.log('there was an error adding access_token to database', error);
  })
}

addToCurrentUser = (user) => {
  const queryText = 'UPDATE "spotify_token" SET "current_user"=$1 WHERE "id"=$2';
  pool.query(queryText, [user.id, 1]).then(() => {
    console.log('current user added to database');
  }).catch(error => {
    console.log('there was an error adding access_token to database', error);
  })

}


module.exports = router;