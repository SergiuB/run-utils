import * as firebase from "firebase";

const init = ({ authSuccess, authFail, notAuth, requestAuth }) => {
  requestAuth();

  var config = {
      apiKey: "AIzaSyCHAoB9rAywEHUeO2XMZKVW2tHzyuitIWI",
      authDomain: "run-utils.surge.sh",
      databaseURL: "https://run-utils.firebaseio.com",
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          const { uid, displayName, email, photoURL } = user;
          firebase.database()
            .ref(`/stravaAccessToken/${uid}`)
            .once('value')
            .then((snapshot) => {
              const accessToken = snapshot.val();
              authSuccess({ uid, displayName, email, photoURL, accessToken });
            })
            .catch(error => authFail(error));
        } else {
          notAuth();
        }
      },
      error => console.log(error)
    );
};

const signInWithCustomToken = token => firebase.auth().signInWithCustomToken(token);

const getRaces = uid => firebase.database().ref(`/runRaces/${uid}`).once('value')
  .then(snapshot => snapshot.val());

const signOut = () => firebase.auth().signOut();

export {
  init,
  signInWithCustomToken,
  getRaces,
  signOut,
}