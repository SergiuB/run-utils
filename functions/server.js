const express = require('express')
const app = express()
const session = require('express-session');
const passport = require('passport');

const { init } = require('./strava-passport');

app.use(session({
  secret: 'myapp',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

init(app);

app.get('/', function (req, res) {
  // console.log(req);
  const user = req.user && req.user;
  console.log('user', user);
  res.send(user ? 'Hello user ' + user : 'Dont know you!' )
})

app.get('/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.get('/auth/strava', passport.authenticate('strava'));

app.listen(3001, function () {
  console.log('Exampe app listening on port 3001!')
})