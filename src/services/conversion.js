const MILE = 1.609344;

function kphToMinKm(kph) {
  return 60 / kph;
}

function minKmToKph(minKm) {
  return 60 / minKm;
}

function timeToParts(time) {
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

function minToTime(min) {
  let [h, m, s] = [Math.floor(min / 60), 0, 0];
  const rest = min % 60;
  if (rest) {
    m = Math.floor(rest);
    s = Math.ceil((rest - m) * 60);
  }

  const pad0 = n => n < 10 ? '0' + n : n;

  return (
    h
      ? `${pad0(h)}:${pad0(m)}:${pad0(s)}`
      : m
          ? `${pad0(m)}:${pad0(s)}`
          : `${pad0(s)}`
  );
}

function minKmToMinMile(minKm) {
  return minKm * MILE;
}

function minMileToMinKm(minMile) {
  return minMile / MILE;
}

export {
  kphToMinKm,
  minKmToKph,
  timeToSec,
  timeToMin,
  minToTime,
  minKmToMinMile,
  minMileToMinKm,
}
