const MARATHON_DIST = 42.195;
const HALF_DIST = MARATHON_DIST / 2;
const TENK_DIST = 10;
const FIVEK_DIST = 5;
const MILE_DIST = 1.609344;
const ONEK_DIST = 1;
const EIGHTH_DIST = .8;
const FOURH_DIST = .4;

function raceTime(kph, km) {
  return km / kph * 3600;
}

function raceSpeed(sec, km) {
  return km / (sec / 3600);
}

const allRaces = [
  {
    label: 'Marathon',
    distance: MARATHON_DIST,
  },
  {
    label: 'Halfmarathon',
    distance: HALF_DIST,
  },
  {
    label: '10K',
    distance: TENK_DIST,
  },
  {
    label: '5K',
    distance: FIVEK_DIST,
  },
  {
    label: 'Mile',
    distance: MILE_DIST,
  },
  {
    label: 'Kilometer',
    distance: ONEK_DIST,
  },
  {
    label: '800m',
    distance: EIGHTH_DIST,
  },
  {
    label: '400m',
    distance: FOURH_DIST,
  },
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
  FOURH_DIST
}
