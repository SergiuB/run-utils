import { kphToMinKm, minKmToKph, minKmToMinMile } from './conversion'

function raceTime(kph, km) {
  return km / kph * 3600;
}

function raceTimeFromPace(minKm, km) {
  return raceTime(minKmToKph(minKm), km);
}

function raceSpeed(sec, km) {
  return km / (sec / 3600);
}

function racePace(sec, km) {
  return kphToMinKm(raceSpeed(sec, km));
}

function racePaceMile(sec, km) {
  return minKmToMinMile(racePace(sec, km));
}

export {
  raceTime,
  raceTimeFromPace,
  raceSpeed,
  racePace,
  racePaceMile,
}
