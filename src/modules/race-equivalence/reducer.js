import core from '../core';

const { kHalf } = core.constants;
const { getVdot } = core.services.vdotCalculator;
const { timeToSec } = core.services.conversion;

const initialState = {
  selectedPerformance: {
    race: kHalf,
    vdot: getVdot(kHalf, timeToSec('1:36:33')),
  },
  savedPerformances: [],
  changed: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CHANGE_VDOT':
      return {
        ...state,
        changed: true,
        selectedPerformance: {
          ...state.selectedPerformance,
          vdot: action.vdot,
        }
      };

    case 'CHANGE_RACE':
      return {
        ...state,
        selectedPerformance: {
          ...state.selectedPerformance,
          race: action.race,
        }
      };
    
    case 'SELECT_PERFORMANCE': 
      return {
        ...state,
        changed: false,
        selectedPerformance: action.performance,
      };

    case 'SAVE_PERFORMANCE':
      return {
        ...state,
        changed: false,
        savedPerformances: [
          action.performance,
          ...state.savedPerformances,
        ],
      };

    case 'REMOVE_PERFORMANCE':
      return {
        ...state,
        changed: state.savedPerformances.findIndex(({ vdot }) => vdot === action.performance.vdot) !== -1,
        savedPerformances: state.savedPerformances.filter(({ vdot }) => vdot !== action.performance.vdot),
      };

    default:
      return state;
  }
}

export default reducer;