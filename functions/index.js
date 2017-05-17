const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const cors = require('cors')({origin: true});
const router = new express.Router();

const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);
const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;

const oauthIds = {
  strava: {
    clientID: '9244',
    clientSecret: '94b8617916ead111be4ebf700ca1d610e2fb2ff0',
    callbackURL: 'https://us-central1-run-utils.cloudfunctions.net/stravaCallback'
  }
};

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push it into the Realtime Database then send a response
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});


router.use(cors);
router.use(session({
  store: new FirebaseStore({
    database: admin.database(),
  }),
  secret: 'myapp',
  resave: false,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serialize', user);
    done(null, user);
  });
passport.deserializeUser(function(obj, done) {
  console.log('deserialize', obj);
  done(null, obj);
});

passport.use(new StravaStrategy({
  clientID: oauthIds.strava.clientID,
  clientSecret: oauthIds.strava.clientSecret,
  callbackURL: oauthIds.strava.callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('logged in!', accessToken);
    //credentials = {accessToken, profile};
    process.nextTick(function () {
      return done(null, profile.id);
    });
  }
));

router.get('/hello', ({ user, url }, res) => {
  // const user = req.user;
  // console.log('user is', user);
  // console.log(req.originalUrl); // '/admin/new'
  // console.log(req.baseUrl); // '/admin'
  // console.log(req.path); // '/new'
  console.log('url is', url); // '/new'
  res.send(user ? 'Hello user ' + user : 'Dont know you!' );
});

router.get('/stravaCallback',
  (req, res, next) => { console.log('stravaCallback found'); next(); },
  (req, res) => res.send('stravacallback ok')
  // passport.authenticate('strava', { successRedirect: '/',
  //                                  failureRedirect: '/?error=true',
  //                                  failureFlash: true })
);

router.get('/authStrava',
   (req, res, next) => { console.log('authStrava found'); next(); },
   passport.authenticate('strava')
);

const httpsFunction = funcName => functions.https.onRequest((req, res) => {
  console.log('new request ', funcName);
  // NOTE: Adding a temporary fix for issue https://github.com/firebase/firebase-functions/issues/27
  // const splitUrl = req.url.split('?');
  // const queryParams = splitUrl[splitUrl.length - 1];
  // console.log(req.url, splitUrl, queryParams);
  // if (queryParams)
  //   req.url = `/${funcName}?${queryParams}`;
  // else
    req.url = `/${funcName}`;
    console.log('query: ', req.query);
  console.log('url is ', req.url);
  return router(req, res);
});

exports.hello = httpsFunction('hello');
exports.stravaCallback = httpsFunction('stravaCallback');
exports.authStrava = httpsFunction('authStrava');
