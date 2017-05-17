const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;

const oauthIds = {
  strava: {
    clientID: '9244',
    clientSecret: '94b8617916ead111be4ebf700ca1d610e2fb2ff0',
    callbackURL: 'http://127.0.0.1:3001/auth/strava/callback'
  }
};

let credentials;

let init = () => {
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
      credentials = {accessToken, profile};
      process.nextTick(function () {
        return done(null, profile.id);
      });
    }
  ));
};

let isAuthenticated = () => !!credentials;
let getToken = () => isAuthenticated() ? credentials.accessToken: undefined;

module.exports = { init, getToken };
