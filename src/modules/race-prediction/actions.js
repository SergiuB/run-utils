import strava from 'strava-v3';

const getErrorOrResult = (errorOrResult, emptyResult = []) => {
  const error = errorOrResult.errors ? errorOrResult : null;
  const result = !error ? errorOrResult : emptyResult;
  return { error, result };
}

export const setRaces = (races) => {
  return {
    type: 'SET_RACES',
    races,
  }
}

export const fetchRaces = (accessToken) => dispatch => {
  if (!accessToken) {
    return;
  }
  strava.athlete.listActivities({
      access_token: accessToken,
      page: 1,
      per_page: 10,
    }, (_, errOrActivities, limits) => {
      const { error, result: activities } = getErrorOrResult(errOrActivities);
      error && dispatch(setRaces([]));
      !error && dispatch(setRaces(activities));
    });
}
