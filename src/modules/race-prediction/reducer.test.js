import reducer from './reducer';

const someState = {
  races: [1,2,3],
  selectedRaceIds: [4, 5, 6],
  goalPerformances: [
    { id: 1, race: 'a', time: 100 },
    { id: 2, race: 'b', time: 200 },
    { id: 3, race: 'c', time: 300 }
  ]
};

describe('race prediction reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      races: [],
      selectedRaceIds: [],
      goalPerformances: [],
    })
  });

  it('should handle ADD_GOAL_PERFORMANCE', () => {
    expect(
      reducer(someState, {
        type: 'ADD_GOAL_PERFORMANCE',
        id: 4,
        race: 'd',
        time: 400,
      })
    ).toEqual({
      ...someState,
      goalPerformances: [
        ...someState.goalPerformances,
        { id: 4, race: 'd', time: 400 },
      ],
    });
  });

  it('should handle REMOVE_GOAL_PERFORMANCE', () => {
    expect(
      reducer(someState, {
        type: 'REMOVE_GOAL_PERFORMANCE',
        id: 2,
      })
    ).toEqual({
      ...someState,
      goalPerformances: [
        { id: 1, race: 'a', time: 100 },
        { id: 3, race: 'c', time: 300 }
      ]
    });
  });

  it('should handle CHANGE_GOAL_PERFORMANCE_RACE', () => {
    expect(
      reducer(someState, {
        type: 'CHANGE_GOAL_PERFORMANCE_RACE',
        id: 2,
        race: 'bbb'
      })
    ).toEqual({
      ...someState,
      goalPerformances: [
        { id: 1, race: 'a', time: 100 },
        { id: 2, race: 'bbb', time: 200 },
        { id: 3, race: 'c', time: 300 }
      ]
    });
  });

  it('should handle CHANGE_GOAL_PERFORMANCE_TIME', () => {
    expect(
      reducer(someState, {
        type: 'CHANGE_GOAL_PERFORMANCE_TIME',
        id: 2,
        time: 999
      })
    ).toEqual({
      ...someState,
      goalPerformances: [
        { id: 1, race: 'a', time: 100 },
        { id: 2, race: 'b', time: 999 },
        { id: 3, race: 'c', time: 300 }
      ]
    });
  });
});