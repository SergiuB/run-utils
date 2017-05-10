import {
  kHalf,
} from '../services/constants';
import { getVdot } from '../services/vdotTable';
import { timeToSec } from '../services/conversion';

const initialState = {
  selectedPerformance: {
    race: kHalf,
    vdot: getVdot(kHalf, timeToSec('1:36:33')),
  },
  savedPerformances: [],
  changed: true,
};

const raceEquiv = (state = initialState, action) => {
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

export default raceEquiv;