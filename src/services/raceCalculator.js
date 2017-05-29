import R from 'ramda';
import { kphToMinKm, minKmToKph, minKmToMinMile } from './conversion'

function raceTime(kph, km) {
  return km / kph * 3600;
}

const raceTimeList = R.zipWith(raceTime);

function raceTimeFromPace(minKm, km) {
  return raceTime(minKmToKph(minKm), km);
}
const raceTimeFromPaceList = R.zipWith(raceTimeFromPace);

function raceSpeed(sec, km) {
  return km / (sec / 3600);
}

function racePace(sec, km) {
  return kphToMinKm(raceSpeed(sec, km));
}
const racePaceList = R.zipWith(racePace);

function racePaceMile(sec, km) {
  return minKmToMinMile(racePace(sec, km));
}
const racePaceMileList = R.zipWith(racePaceMile);

export {
  raceTime,
  raceTimeList,
  raceTimeFromPace,
  raceTimeFromPaceList,
  raceSpeed,
  racePace,
  racePaceList,
  racePaceMile,
  racePaceMileList,
}
