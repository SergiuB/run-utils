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
    callbackURL: 'https://us-central1-run-utils.cloudfunctions.net/api/stravaCallback'
  }
};

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

const enableIf = (predicateFn, mwToEnable) => (req, res, next) => {
  const enable = predicateFn(req);
  enable && mwToEnable(req, res, next);
  !enable && next();
}

const authenticateIfNot = enableIf(req => !req.user, passport.authenticate('strava', { failureRedirect: 'error' }));
const log = ({ user, url }, req, next) => {
  console.log(`user: ${user}, url: ${url}`);
  next();
}

router.use(log);

router.get('/hello',
  authenticateIfNot,
  (req, res) => {
  const { user } = req;
  res.send(user ? 'Hello user ' + user : 'Dont know you!' );
});

router.get('/stravaCallback',
  passport.authenticate('strava', { successRedirect: 'hello',
                                   failureRedirect: 'error',
                                   failureFlash: true })
);

router.get('/authStrava',
   passport.authenticate('strava')
);

exports.api = functions.https.onRequest(router);