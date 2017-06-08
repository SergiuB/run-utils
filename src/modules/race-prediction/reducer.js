const initialState = {
  races: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_RACES':
      return {
        ...state,
        races: [...action.races],
      };
    default:
      return state;
  }
}

export default reducer;