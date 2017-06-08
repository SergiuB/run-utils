import R from 'ramda';
import { getTrainingPaces } from './vdotCalculator';
import { kMile } from '../constants';
import { parse } from './workoutParser';

const pointTable = {
  E: .2,
  M: .4,
  T: .6,
  T10K: .8,
  I: 1,
  R: 1.5,
}

const round = num => Math.round(num * 100) / 100;

const getDistanceAndTime = ({pace, num, unit}) => {
  let distance, time;
  switch(unit) {
    case 'm': {
      distance = num / 1000;
      break;
    }
    case 'km': {
      distance = num;
      break;
    }
    case 'mi': {
      distance = num * kMile.distance;
      break;
    }
    case '\'': {
      time = num;
      break;
    }
    case '"': {
      time = num / 60;
      break;
    }
    default:
      break;
  }

  if (!distance && !time) {
    throw new Error('No time nor distance could not be determined');
  }

  if (time) {
    distance = time / pace;
  }

  if (distance) {
    time = distance * pace;
  }

  time = round(time);
  distance = round(distance);

  return { time, distance }
}

const calculateWorkout = ({ pace, num, unit, type, givePoints=true }) => {
  const { distance, time } = getDistanceAndTime({pace, num, unit});
  const data = {
    distance,
    time,
    points: givePoints ? round(pointTable[type] * time) : 0,
  }
  return {
    ...data,
    zones: {
      [type]: {
        ...data,
      },
    }
  }
}

const mergeWorkoutData = R.mergeWithKey((k, v1, v2) => {
  if (['zones', 'E', 'M', 'T', 'T10K', 'I', 'R'].includes(k)) return R.mergeWith(mergeWorkoutData,v1, v2);
  return round(R.add(v1, v2));
});

const calculatePart = ({ trainingPaces, work, type, rest}) => {
  const pace = trainingPaces[type];
  const { num, unit } = work;
  const workoutData = calculateWorkout({ pace, num, unit, type });
  if (rest) {
    const restPart = calculateWorkout({ pace: trainingPaces.J, ...rest, type: 'E' });
    return mergeWorkoutData(workoutData, restPart);
  }
  return workoutData;
}

const calculateIntervals = ({ times, work, calculateForVdot }) => {
  const mult = R.compose(round, R.multiply(times));
  const doubleTransf = {
    distance: mult,
    time: mult,
    points: mult,
  }
  const transformations = {
    ...doubleTransf,
    zones: {
      ...R.zipObj(
        ['E', 'M', 'T', 'T10K', 'I', 'R'],
        R.times(() => ({...doubleTransf}), 6)
      )
    }
  }
  return R.evolve(transformations, calculateForVdot(work));
}

const calculate = vdot => {
  const trainingPaces = getTrainingPaces(vdot);
  const calculateForVdot = workout => {
    const { type, times, work, rest, length } = workout;
    if (type) {
      return calculatePart({ trainingPaces, work, type, rest });
    }
    if (times) {
      return calculateIntervals({ times, work, calculateForVdot});
    }
    // Sequence of workout parts
    if (length) {
      return R.reduce((acc, workPart) => mergeWorkoutData(acc, calculateForVdot(workPart)), {}, workout);
    }
  };
  return R.compose(calculateForVdot, parse); 
}

const expandTemplate = (template ,{ variables }) => {
  const [cX, cY] = variables.map(([name, values]) => R.xprod([name], values));
  const workoutFromTemplate = R.reduce((acc, [varName, val]) => acc.replace(new RegExp(varName, "g"), val), template);
  
  if (!cX && !cY) {
    return [template];
  } else if (!cY) {
    return cX.map(([varName, val]) => template.replace(new RegExp(varName, "g"), val));
  } else {
    const cXY = R.xprod(cX, cY);
    return cXY.map(workoutFromTemplate);
  }
}

export {
  calculate,
  mergeWorkoutData,
  pointTable,
  expandTemplate,
}