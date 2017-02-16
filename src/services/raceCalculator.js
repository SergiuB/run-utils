const MARATHON_DIST = 42.195;
const HALF_DIST = MARATHON_DIST / 2;
const TENK_DIST = 10;
const FIVEK_DIST = 5;
const MILE_DIST = 1.609344;
const ONEK_DIST = 1;

function raceTime(kph, km) {
  return km / kph * 3600;
}

export {
  raceTime,
  MARATHON_DIST,
  HALF_DIST,
  TENK_DIST,
  FIVEK_DIST,
  MILE_DIST,
  ONEK_DIST,
}
