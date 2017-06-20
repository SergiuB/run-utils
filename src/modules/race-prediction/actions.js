import shortid from 'shortid';
import core from 'modules/core';
const { firebase } = core.services;
const { kHalf } = core.constants;

export const setRaces = (races) => {
  return {
    type: 'SET_RACES',
    races,
  }
}

export const selectRace = (id) => {
  return {
    type: 'SELECT_RACE',
    id,
  }
}

export const deselectRace = (id) => {
  return {
    type: 'DESELECT_RACE',
    id,
  }
}

export const startAddingGoalPerformance = () => {
  return {
    type: 'START_ADDING_GOAL_PERFORMANCE',
  }
}

export const cancelAddingGoalPerformance = () => {
  return {
    type: 'CANCEL_ADDING_GOAL_PERFORMANCE',
  }
}

export const addGoalPerformance = (race, time) => {
  return {
    type: 'ADD_GOAL_PERFORMANCE',
    race,
    time,
    id: shortid.generate()
  }
}

export const removeGoalPerformance = (id) => {
  return {
    type: 'REMOVE_GOAL_PERFORMANCE',
    id
  }
}

export const changeGoalPerformanceRace = (id, race) => {
  return {
    type: 'CHANGE_GOAL_PERFORMANCE_RACE',
    id,
    race,
  }
}

export const changeGoalPerformanceTime = (id, time) => {
  return {
    type: 'CHANGE_GOAL_PERFORMANCE_TIME',
    id,
    time,
  }
}

export const selectTab = (tabId) => ({
  type: 'SELECT_TAB',
  tabId,
})

export const fetchRaces = (uid) => dispatch => {
  if (!uid) {
    return;
  }
  firebase.getRaces(uid)
    .then(races => dispatch(setRaces(races)));
}
