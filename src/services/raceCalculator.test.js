import {
  raceTime,
  MARATHON_DIST,
  HALF_DIST,
  TENK_DIST,
  FIVEK_DIST,
  MILE_DIST,
  ONEK_DIST,
} from './raceCalculator';

it('computes time in seconds to run various distances based on speed and distance', () => {
  expect(raceTime(10, MARATHON_DIST)).toEqual(15190.2);
  expect(raceTime(10, HALF_DIST)).toEqual(7595.1);
  expect(raceTime(10, TENK_DIST)).toEqual(3600);
  expect(raceTime(10, FIVEK_DIST)).toEqual(1800);
  expect(raceTime(10, MILE_DIST)).toEqual(579.36384);
  expect(raceTime(10, ONEK_DIST)).toEqual(360);
});
