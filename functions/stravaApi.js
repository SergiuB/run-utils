const strava = require('strava-v3');
const R = require('ramda');

const PER_PAGE = 200;
const MAX_ACTIVITY_COUNT = 2000;

const getErrorOrResult = (errorOrResult, emptyResult = []) => {
    const error = errorOrResult.errors ? errorOrResult : null;
    const result = !error ? errorOrResult : emptyResult;
    return { error, result };
}


const stravaApi = access_token => {

  const getActivities= ({ page = 1, activityTransform = R.identity } = {}) => {
    return new Promise((resolve, reject) => {
      strava.athlete.listActivities({
        access_token,
        page,
        per_page: PER_PAGE,
      }, (_, errOrActivities, limits) => {
        const { error, result: activities } = getErrorOrResult(errOrActivities);
        error && reject(error);
        !error && resolve({
          activities: activities.map(activityTransform),
          limits,
        });
      });
    });
  };

  const getAllActivities = ({ activityTransform = R.identity } = {}) => {
    return new Promise((resolve, reject) => {
      let fn = (curPage, allActivities) => {
        getActivities({ page: curPage, activityTransform})
          .then(({ activities, limits }) => {
            if (activities.length < PER_PAGE || allActivities.length + activities.length >= MAX_ACTIVITY_COUNT) {
              resolve({
                activities: R.take(MAX_ACTIVITY_COUNT, allActivities.concat(activities)),
                limits,
              });
            } else {
              fn(curPage + 1, allActivities.concat(activities));
            }
          })
          .catch(err => reject(err));
      };

      fn(1, []);
    });
  };

  return {
    getAllActivities,
  }
}

module.exports = stravaApi;