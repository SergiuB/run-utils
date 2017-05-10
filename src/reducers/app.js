const initialState = {
  metric: true,
  isMenuOpen: false,
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

    default:
      return state;
  }
}

export default app;