import R from 'ramda';
const MILE = 1.609344;

function kphToMinKm(kph) {
  return 60 / kph;
}

function minKmToKph(minKm) {
  return 60 / minKm;
}

function timeToParts(time) {
  if (!R.is(String, time)) {
    throw new Error('invalid time');
  }
  const parts = time.split(':').map(s => parseInt(s, 10));//.map(parseInt);
  let h = 0, m = 0, s = 0;
  switch (parts.length) {
    case 3:
      [h, m, s] = parts;
      break;
    case 2:
      [m, s] = parts;
      break;
    case 1:
      [s] = parts;
      break;
    default:
      throw new Error('invalid time format');
  }
  if (!R.all(Number.isInteger, [h, m, s])) {
    throw new Error('invalid time format');
  }
  return { h, m, s };
}

function timeToSec(time) {
  const { h, m, s } = timeToParts(time);
  return h * 3600 + m * 60 + s;
}

function timeToMin(time) {
  const { h, m, s } = timeToParts(time);
  return h * 60 + m + s / 60;
}

function minToTime(min, showHour = false) {
  let [h, m, s] = [Math.floor(min / 60), 0, 0];
  const rest = min % 60;
  if (rest) {
    m = Math.floor(rest);
    s = Math.round((rest - m) * 60);
  }

  // Adjust for 60 seconds case
  if (s === 60) {
    s = 0;
    m++;
    if (m === 60) {
      m = 0;
      h++;
    }
  }

  const pad0 = n => n < 10 ? '0' + n : n;

  return showHour || h > 0
    ? `${h}:${pad0(m)}:${pad0(s)}`
    : `${pad0(m)}:${pad0(s)}`;
}

function secToTime(sec, showHour = false) {
  return minToTime(sec / 60, showHour);
}

function minKmToMinMile(minKm) {
  return minKm * MILE;
}

function minMileToMinKm(minMile) {
  return minMile / MILE;
}

function oneDecimal(number) {
  return Number.parseFloat(number.toFixed(1), 10);
}

export {
  kphToMinKm,
  minKmToKph,
  timeToSec,
  timeToMin,
  minToTime,
  secToTime,
  minKmToMinMile,
  minMileToMinKm,
  oneDecimal
}
