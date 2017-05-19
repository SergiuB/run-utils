
const strava = require('strava-v3');
const R = require('ramda');

const workoutTypes = ['run', 'race', 'long', 'workout'];
const PER_PAGE = 200;
const TOKEN = 'c09a0b9e399c689da55ce83ce4c184fbf1968597';
const MAX_ACTIVITY_COUNT = 2000;

const getErrorOrResult = (errorOrResult, emptyResult = []) => {
    const error = errorOrResult.errors ? errorOrResult : null;
    const result = !error ? errorOrResult : emptyResult;
    return { error, result };
}


const getApi = access_token => {

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

  const getAllActivities = ({ activityTransform = R.identity }) => {
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
    getActivities,
    getAllActivities,
  }
}

/*
id: activity.id,
          name: activity.name,
          sport: activity.type,
          type: workoutTypes[activity.workout_type],
          startDate: activity.start_date,
          movingTime: activity.moving_time
*/

const activityTransform = R.pick([
  'name',
  'type',
  'workout_type',
  'start_date',
  'moving_time',
]);

const printValue = message => value => {
  console.log(message, value);
  return value;
}

const api = getApi(TOKEN);

// const firstAndLast = R.converge(R.pair, [R.head, R.last]);

const isRun = R.propEq('type', 'Run');
const isRace = R.propEq('workout_type', 1);
const filterRunRaces = R.filter(R.allPass([isRace, isRun]));

const promise = api.getAllActivities({ activityTransform });

promise
  .then(R.prop('activities'))
  .then(filterRunRaces)
  .then(R.length)
  .then(printValue('Running races count'))
  .catch(printValue('Error'))

promise
  .then(R.prop('limits'))
  .then(printValue('Limits'))
  .catch(printValue('Error'))

promise
  .then(R.prop('activities'))
  .then(R.length)
  .then(printValue('Activity count'))
  .catch(printValue('Error'))


// strava.athlete.get({
//   access_token: TOKEN,
// }, (err, { id }) => {
//   console.log(err, id);
//   strava.athletes.stats({
//     access_token: TOKEN,
//     id
//   }, (err, stats) => {
//     console.log(err, stats);
//   })
// })