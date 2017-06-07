
import { signInWithCustomToken } from "../services/firebaseWrapper";

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

export const logIn = () => dispatch => {
  let popup;

  const handleTokenMessage = ({ data, origin }) => {
    if (origin !== "https://us-central1-run-utils.cloudfunctions.net")
      return;
    
    signInWithCustomToken(data).catch(error => dispatch(authFail(error)));

    window.removeEventListener("message", handleTokenMessage, false);
    popup.close();
  }

  dispatch(requestAuth());

  window.addEventListener("message", handleTokenMessage, false);
  popup = window.open('https://us-central1-run-utils.cloudfunctions.net/api/authStrava', 'firebaseAuth', 'height=315,width=400');
}