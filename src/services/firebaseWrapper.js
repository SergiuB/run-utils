import * as firebase from "firebase";

const firebaseInit = ({ authSuccess, authFail, notAuth, requestAuth }) => {
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
            .ref(`/instagramAccessToken/${uid}`)
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

export {
  firebaseInit,
  signInWithCustomToken,
}