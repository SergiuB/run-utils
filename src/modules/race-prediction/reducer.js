
const initialState = {
  races: [],
  selectedRaceIds: [],
  goalPerformances: [],
  addingGoalPerformance: false,
  selectedTab: 'past',
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
    
    case 'START_ADDING_GOAL_PERFORMANCE': 
      return {
        ...state,
        addingGoalPerformance: true,
      };
    
    case 'CANCEL_ADDING_GOAL_PERFORMANCE': 
      return {
        ...state,
        addingGoalPerformance: false,
      };

    case 'ADD_GOAL_PERFORMANCE':
      return {
        ...state,
        goalPerformances: [
          ...state.goalPerformances, {
          id: action.id,
          race: action.race,
          time: action.time
        }],
        addingGoalPerformance: false,
      }
    
    case 'REMOVE_GOAL_PERFORMANCE':
      return {
        ...state,
        goalPerformances: state.goalPerformances.filter(({ id }) => id !== action.id)
      }
    
    case 'CHANGE_GOAL_PERFORMANCE_RACE':
      return {
        ...state,
        goalPerformances: state.goalPerformances.map(
          p => p.id === action.id
            ? { ...p, race: action.race }
            : p
        ) 
      }
    
    case 'CHANGE_GOAL_PERFORMANCE_TIME':
      return {
        ...state,
        goalPerformances: state.goalPerformances.map(
          p => p.id === action.id
            ? { ...p, time: action.time }
            : p
        ) 
      }

    case 'SELECT_TAB': 
      return {
        ...state,
        selectedTab: action.tabId,
      }

    default:
      return state;
  }
}

export default reducer;