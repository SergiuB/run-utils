const initialState = {
  metric: true,
  isMenuOpen: false,
  userData: null,
  isAuthenticating: false,
  authError: null,
};

const app = (state = initialState, action) => {
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

    default:
      return state;
  }
}

export default app;