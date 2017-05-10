import raceEquiv from './raceEquiv';
import {
  kHalf,
  k10,
  k5,
} from '../services/constants';

const initialState = {
  selectedPerformance: {
    race: kHalf,
    vdot: 39,
  },
  savedPerformances: [ { race: k10, vdot: 43 } ],
  changed: true,
};

describe('raceEquiv reducer', () => {
  it('should handle CHANGE_VDOT', () => {
    expect(
      raceEquiv(initialState, {
        type: 'CHANGE_VDOT',
        vdot: 30,
      })
    ).toEqual({
      ...initialState,
      selectedPerformance: {
        race: kHalf,
        vdot: 30,
      },
    })
  });

  it('should handle CHANGE_RACE', () => {
    expect(
      raceEquiv(initialState, {
        type: 'CHANGE_RACE',
        race: k5,
      })
    ).toEqual({
      ...initialState,
      selectedPerformance: {
        race: k5,
        vdot: initialState.selectedPerformance.vdot,
      },
    })
  });

  it('should handle SAVE_PERFORMANCE', () => {
    expect(
      raceEquiv(initialState, {
        type: 'SAVE_PERFORMANCE',
        performance: {
          race: k5,
          vdot: 52,
        }
      })
    ).toEqual({
      ...initialState,
      changed: false,
      savedPerformances: [
        {
          race: k5,
          vdot: 52,
        },
        ...initialState.savedPerformances,
      ],
    })
  });

  it('should handle REMOVE_PERFORMANCE for existing saved performance', () => {
    expect(
      raceEquiv(initialState, {
        type: 'REMOVE_PERFORMANCE',
        performance: {
          vdot: 43,
        }
      })
    ).toEqual({
      ...initialState,
      changed: true,
      savedPerformances: [],
    })
  });

  it('should handle REMOVE_PERFORMANCE for nonexisting saved preformance', () => {
    expect(
      raceEquiv(initialState, {
        type: 'REMOVE_PERFORMANCE',
        performance: {
          vdot: 999,
        }
      })
    ).toEqual({
      ...initialState,
      changed: false,
    })
  });
});