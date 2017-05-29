import {
  raceTime,
  raceTimeList,
  raceTimeFromPace,
  raceTimeFromPaceList,
} from './raceCalculator';

import {
  kMarathon,
  kHalf,
  k10,
  k5,
  kMile,
} from './constants';

it('computes time in seconds to run various distances based on speed and distance', () => {
  expect(raceTime(10, kMarathon.distance)).toEqual(15190.2);
  expect(raceTime(10, kHalf.distance)).toEqual(7595.1);
  expect(raceTime(10, k10.distance)).toEqual(3600);
  expect(raceTime(10, k5.distance)).toEqual(1800);
  expect(raceTime(10, kMile.distance)).toEqual(579.36384);
});

it('computes time in seconds to run various distances based on pace and distance', () => {
  expect(raceTimeFromPace(6, kMarathon.distance)).toEqual(15190.2);
  expect(raceTimeFromPace(6, kHalf.distance)).toEqual(7595.1);
  expect(raceTimeFromPace(6, k10.distance)).toEqual(3600);
  expect(raceTimeFromPace(6, k5.distance)).toEqual(1800);
  expect(raceTimeFromPace(6, kMile.distance)).toEqual(579.36384);
});

it('computes time in seconds to run various distances based on speed and distance (list version)', () => {
  expect(raceTimeList([10, 12], [k5.distance, k10.distance])).toEqual([30*60 ,50*60]);
});
it('computes time in seconds to run various distances based on pace and distance (list version)', () => {
  expect(raceTimeFromPaceList([6, 5], [k5.distance, k10.distance])).toEqual([30*60 ,50*60]);
});