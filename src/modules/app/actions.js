
import core from 'modules/core';
const { firebase } = core.services;

export const setMetric = (metric) => ({
  type: 'SET_METRIC',
  metric,
});

export const openMenu = (open) => ({
  type: 'OPEN_MENU',
  open,
});

export const requestAuth = () =>  ({
  type: 'REQUEST_AUTH',
});

export const authSuccess = (userData) =>  ({
  type: 'AUTH_SUCCESS',
  userData,
});

export const authFail = (error) =>  ({
  type: 'AUTH_FAIL',
  error,
})

export const notAuth = () =>  ({
  type: 'NOT_AUTH',
})

export const login = () => dispatch => {
  let popup;

  const handleTokenMessage = ({ data, origin }) => {
    if (origin !== "https://us-central1-run-utils.cloudfunctions.net")
      return;

    const { stravaAuthToken } = data;
    
    firebase.signInWithCustomToken(stravaAuthToken).catch(error => dispatch(authFail(error)));

    window.removeEventListener("message", handleTokenMessage, false);
    popup.close();
  }

  dispatch(requestAuth());

  window.addEventListener("message", handleTokenMessage, false);
  popup = window.open('https://us-central1-run-utils.cloudfunctions.net/api/authStrava', 'firebaseAuth', 'height=315,width=400');
}

export const requestLogout = () =>  ({
  type: 'REQUEST_LOGOUT',
});

export const logoutSuccess = () =>  ({
  type: 'LOGOUT_SUCCESS',
});

export const logoutFail = (error) =>  ({
  type: 'LOGOUT_FAIL',
  error,
})

export const logout = () => dispatch => {
  dispatch(requestLogout());
  firebase.signOut()
    .then(() => dispatch(logoutSuccess()))
    .catch(error => dispatch(logoutFail(error)))
}