import React from 'react';
import R from 'ramda';

import core from 'modules/core';

const {
  calculate,
  mergeWorkoutData,
  pointTable
} = core.services.workoutCalculator;
const { 
  getTrainingPaces,
} = core.services.vdotCalculator;
const { minToTime, oneDecimal } = core.services.conversion;

// Add warmup and cooldown to quality workouts represented as strings
const addWuCd = ({ wu = '2kmE', cd = '2kmE'} = {}) => workout => {
  const hasWu = w => (/^[0-9]+('|km|mi|m)E/i.test(w));
  const hasCd = w => (/^.*E$/i.test(w));
  let workoutWithWuCd = workout;
  if (!hasWu(workoutWithWuCd)) {
    workoutWithWuCd = wu + '+' + workoutWithWuCd;
  }
  if (!hasCd(workoutWithWuCd)) {
    workoutWithWuCd = workoutWithWuCd + '+' + cd;
  }
  return workoutWithWuCd;
};


const formatPercentage = perc => perc * 100

const computeTotals = ({ distance, time, points, zones }) => {
  return ({
  distance,
  time: minToTime(time),
  points,
  zones: R.map(zone => ({
    ...zone,
    pDistance: formatPercentage(zone.distance / distance),
    pTime: formatPercentage(zone.time / time),
    pPoints: formatPercentage(zone.points / points),
  }))(zones)
})};

const addPaces = vdot => {
  const paces = getTrainingPaces(vdot);
  return workout => workout
    .replace(/0kmE/g, `off`)
    // .replace(/E/g, `@${minToTime(paces.E)}`)
    // .replace(/M/g, `@${minToTime(paces.M)}`)
    // .replace(/T/g, `@${minToTime(paces.T)}`)
    // .replace(/I/g, `@${minToTime(paces.I)}`)
    // .replace(/R/g, `@${minToTime(paces.R)}`);
}


const WorkoutCycle = ({ cycle, dates, index, vdot }) => {
  const calc = calculate(vdot);
  const formatWorkout = addPaces(vdot);

  let workouts = R.compose(
    R.map(([ text, info, date ]) => ({ text, info, date })), // make it an object
    R.zipWith(R.append, dates), // associate dates
    R.converge(R.zip, [R.map(formatWorkout), R.map(calc)]), // format and compute workout info
    R.map(addWuCd()), // add wu/cd where necessary
    R.prop('workouts') // take the workouts
  )(cycle);

  const totals = R.compose(
    computeTotals,
    R.reduce(mergeWorkoutData, {}),
    R.map(R.prop('info'))
  )(workouts);

  const tapLog = R.tap(console.log);

  return (
    <div className='cycle mui--text-caption' key={index}>
      <div className='title mui--text-subhead'>Cycle {index+1}</div>
      {workouts.map(({ text, info, date } , wi) => {
        return (
          <div className='workout' key={wi}>
            <div className='date'>{date.format('ddd, DD MMM')}</div>
            <div className='text'>{text}</div>
            <div className='workout-numbers'>
              <div className='workout-col'>
                <div>{info.distance.toFixed(1)}</div>
              </div>
              <div className='workout-col'>
                <div>{minToTime(info.time)}</div>
              </div>
              <div className='workout-col'>
                <div>{info.points.toFixed(1)}</div>
              </div>
            </div>
          </div>
        )}
      )}
      <div className='cycle-totals mui--text-menu'>
        <div className='workout'>
          <div></div>
          <div className='workout-numbers'>
            <div className='workout-col'>
              <div>{totals.distance.toFixed(1)}</div>
            </div>
            <div className='workout-col'>
              <div>{totals.time}</div>
            </div>
            <div className='workout-col '>
              <div>{totals.points.toFixed(1)}</div>
            </div>
          </div>
        </div>
        <div className='pace-distribution'>
        {R.compose(
          R.map(([zone, data]) => (
            <div className={`zone-${zone}`} style={{ flexGrow: Math.min(data.pDistance, 50)}} key={zone}>
              {oneDecimal(data.pDistance)}%
            </div>
          )),
          R.sortBy(([zone, data]) => pointTable[zone]),
          R.toPairs,
        )(totals.zones)}
        </div>
      </div>
    </div>
  );
};

export default WorkoutCycle;