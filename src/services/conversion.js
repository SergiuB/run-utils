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
  return [h, m, s];
}

function timeToSec(time) {
  const [h, m, s] = timeToParts(time);
  return h * 3600 + m * 60 + s;
}

function timeToMin(time) {
  const [h, m, s] = timeToParts(time);
  return h * 60 + m + s / 60;
}

export {
  kphToMinKm,
  minKmToKph,
  timeToSec,
  timeToMin,
}
