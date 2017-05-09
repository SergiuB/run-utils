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