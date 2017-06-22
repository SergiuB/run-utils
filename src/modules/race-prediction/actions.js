import shortid from 'shortid';
import core from 'modules/core';
const { firebase } = core.services;

export const setRaces = (races) => {
  return {
    type: 'SET_RACES',
    races,
  }
}

export const setSelectedRaces = (ids) => ({
  type: 'SET_SELECTED_RACES',
  ids
})

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

export const setForecastLimit = (limit) => ({
  type: 'SET_FORECAST_LIMIT',
  limit,
})

export const fetchRaces = (uid) => dispatch => {
  if (!uid) {
    return;
  }
  firebase.getRaces(uid)
    .then(races => dispatch(setRaces(races)));
}
