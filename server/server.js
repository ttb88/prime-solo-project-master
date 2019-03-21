
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const spotifyAuthRouter = require('./routes/spotifyAuth.router');
const imageRouter = require('./routes/image.router');
const genreRouter = require('./routes/genre.router');
// const userRouter = require('./routes/user.router');
// const spotifyAPIRouter = require('./routes/spotifyAPI.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/', spotifyAuthRouter);
app.use('/api/image', imageRouter);
app.use('/api/genre', genreRouter);
// app.use('/api/user', userRouter);
// app.use('/api/spotify', spotifyAPIRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
