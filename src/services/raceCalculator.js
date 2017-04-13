import { kphToMinKm } from './conversion'

function raceTime(kph, km) {
  return km / kph * 3600;
}

function raceSpeed(sec, km) {
  return km / (sec / 3600);
}

function racePace(sec, km) {
  return kphToMinKm(raceSpeed(sec, km));
}

export {
  raceTime,
  raceSpeed,
  racePace,
}
