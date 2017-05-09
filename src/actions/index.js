export const changeVdot = (vdot) => {
  return {
    type: 'CHANGE_VDOT',
    vdot,
  }
}

export const changeRace = (race) => {
  return {
    type: 'CHANGE_RACE',
    race,
  }
}

export const savePerformance = (performance) => {
  return {
    type: 'SAVE_PERFORMANCE',
    performance,
  }
}

export const selectPerformance = (performance) => {
  return {
    type: 'SELECT_PERFORMANCE',
    performance,
  }
}

export const removePerformance = (performance) => {
  return {
    type: 'REMOVE_PERFORMANCE',
    performance,
  }
}

export const setMetric = (metric) => {
  return {
    type: 'SET_METRIC',
    metric,
  }
}

export const openMenu= (open) => {
  return {
    type: 'OPEN_MENU',
    open,
  }
}