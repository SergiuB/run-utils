const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stravaApi = require('./stravaApi');

const { fbcfg, stravacfg } = functions.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: fbcfg.projectid,
    clientEmail: fbcfg.clientemail,
    // When pasting the private key in the command line (firebase functions:config:set fbcfg.privatekey='[KEY]') newline slashes are doubled
    privateKey: fbcfg.privatekey.replace(/\\n/g, '\n'),
  }),
  databaseURL: fbcfg.databaseurl,
});

const R = require('ramda');
const express = require('express');
const cors = require('cors')({origin: true});
const router = new express.Router();

const session = require('express-session');
const FirebaseStore = require('connect-session-firebase')(session);
const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;

const oauthIds = {
  strava: {
    clientID: stravacfg.clientid,
    clientSecret: stravacfg.clientsecret,
    callbackURL: stravacfg.callbackurl,
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

const printValue = message => value => {
  console.log(message, value);
  return value;
}

const rethrowIfNotErrorCode = code => error => {
  if (code !== error.code) throw error;
};

passport.use(new StravaStrategy({
  clientID: oauthIds.strava.clientID,
  clientSecret: oauthIds.strava.clientSecret,
  callbackURL: oauthIds.strava.callbackURL
  },
  (accessToken, refreshToken, { id, displayName, photos, emails }, done) => {
    printValue('logged in!')(accessToken);
    //credentials = {accessToken, profile};
    const uid = `strava:${id}`;
    const createCustomToken = () => admin.auth().createCustomToken(uid);
    const saveAccessToken = admin.database().ref(`/stravaAccessToken/${uid}`)
      .set(accessToken);
    const doneOk = result => done(null, result);
    const doneError = done;
    const userData = {
      uid,
      displayName,
      email: emails[0].value,
      photoURL: photos[0].value,
    };
    admin.auth().createUser(userData)
      .then(printValue("Successfully created new user"))
      .catch(R.pipe(
        printValue("Cannot create user"),
        rethrowIfNotErrorCode('auth/uid-already-exists')
      ))
      .then(saveAccessToken)
      .then(printValue('Saved access token'))
      .then(createCustomToken)
      .then(printValue('Firebase token created'))
      .then(doneOk)
      .catch(doneError);
  }
));

const log = ({ user, url }, req, next) => {
  console.log(`user: ${user}, url: ${url}`);
  next();
}

router.use(log);

router.get('/stravaCallback',
  passport.authenticate('strava', { failureRedirect: 'error',
                                   failureFlash: true }),
  (req, res) => res.send(sendToken(req.user))                            
);

function sendToken(token) {
  return `
    <script>
      window.opener.postMessage({ stravaAuthToken: '${token}' }, '${fbcfg.frontendurl}');
      window.opener.postMessage({ stravaAuthToken: '${token}' }, 'http://localhost:3000/');
    </script>
  `;
}

router.get('/authStrava', passport.authenticate('strava'));

exports.api = functions.https.onRequest(router);

exports.findStravaRaces = functions.database.ref('/stravaAccessToken/{uid}')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const token = event.data.val();
      const uid = event.params.uid;
      console.log(`Access token ${token ? (token + ' stored'): 'removed'} for user ${uid}`);
      
      if (token) {
        const isRun = R.propEq('type', 'Run');
        const isRace = R.propEq('workout_type', 1);
        const filterRunRaces = R.filter(R.allPass([isRace, isRun]));

        const saveRaces = races => admin.database().ref(`/runRaces/${uid}`)
          .set(races);
        
        return stravaApi(token).getAllActivities()
          .then(R.prop('activities'))
          .then(filterRunRaces)
          .then(printValue('Running races'))
          .then(saveRaces);
      }
    });