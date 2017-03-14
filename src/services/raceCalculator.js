const MARATHON_DIST = 42.195;
const HALF_DIST = MARATHON_DIST / 2;
const TENK_DIST = 10;
const FIVEK_DIST = 5;
const MILE_DIST = 1.609344;
const ONEK_DIST = 1;
const EIGHTH_DIST = .8;
const FOURH_DIST = .4;

const MARATHON_RACE = {
  label: 'Marathon',
  distance: MARATHON_DIST,
};
const HALF_RACE = {
  label: 'Half',
  distance: HALF_DIST,
};
const TENK_RACE = {
  label: '10K',
  distance: TENK_DIST,
};
const FIVEK_RACE = {
  label: '5K',
  distance: FIVEK_DIST,
};
const MILE_RACE = {
  label: 'Mile',
  distance: MILE_DIST,
};
const ONEK_RACE = {
  label: 'Kilometer',
  distance: ONEK_DIST,
};
const EIGHTH_RACE = {
  label: '800m',
  distance: EIGHTH_DIST,
};
const FOURH_RACE = {
  label: '400m',
  distance: FOURH_DIST,
};

function raceTime(kph, km) {
  return km / kph * 3600;
}

function raceSpeed(sec, km) {
  return km / (sec / 3600);
}

const allRaces = [
  MARATHON_RACE,
  HALF_RACE,
  TENK_RACE,
  FIVEK_RACE,
  MILE_RACE,
  ONEK_RACE,
  EIGHTH_RACE,
  FOURH_RACE,
]

export {
  raceTime,
  raceSpeed,
  allRaces,
  MARATHON_DIST,
  HALF_DIST,
  TENK_DIST,
  FIVEK_DIST,
  MILE_DIST,
  ONEK_DIST,
  EIGHTH_DIST,
  FOURH_DIST,
  MARATHON_RACE,
  HALF_RACE,
  TENK_RACE,
  FIVEK_RACE,
  MILE_RACE,
  ONEK_RACE,
  EIGHTH_RACE,
  FOURH_RACE,
}
