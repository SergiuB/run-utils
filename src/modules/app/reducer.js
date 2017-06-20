const initialState = {
  metric: true,
  isMenuOpen: false,
  userData: null,
  isAuthenticating: false,
  isLoggingOut: false,
  authError: null,
  logoutError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_METRIC':
      return {
        ...state,
        metric: action.metric,
      };

    case 'OPEN_MENU':
      return {
        ...state,
        isMenuOpen: action.open,
      };

    case 'REQUEST_AUTH':
      return {
        ...state,
        isAuthenticating: true,
      };

    case 'NOT_AUTH':
      return {
        ...state,
        isAuthenticating: false,
      };
    
    case 'AUTH_SUCCESS':
      return {
        ...state,
        isAuthenticating: false,
        userData: action.userData,
      };
    
    case 'AUTH_FAIL': 
      return {
        ...state,
        isAuthenticating: false,
        authError: action.error,
      };

    case 'REQUEST_LOGOUT':
      return {
        ...state,
        isLoggingOut: true,
      };
    
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        isLoggingOut: false,
        userData: null,
      };
    
    case 'LOGOUT_FAIL': 
      return {
        ...state,
        isLoggingOut: false,
        logoutError: action.error,
      };

    default:
      return state;
  }
}

export default reducer;