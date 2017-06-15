const initialState = {
  races: [],
  selectedRaceIds: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_RACES':
      return {
        ...state,
        races: [...action.races],
        selectedRaceIds: state.selectedRaceIds && state.selectedRaceIds.length
          ? state.selectedRaceIds
          : [...action.races.map(({ id }) => id)]
      };
    
    case 'SELECT_RACE': 
      return {
        ...state,
        selectedRaceIds: [action.id, ...state.selectedRaceIds]
      };

    case 'DESELECT_RACE': 
      return {
        ...state,
        selectedRaceIds: state.selectedRaceIds.filter(id => id !== action.id)
      };

    default:
      return state;
  }
}

export default reducer;