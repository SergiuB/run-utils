import {
  raceTime,
  kMarathon,
  kHalf,
  k10,
  k5,
  kMile,
} from './raceCalculator';

it('computes time in seconds to run various distances based on speed and distance', () => {
  expect(raceTime(10, kMarathon.distance)).toEqual(15190.2);
  expect(raceTime(10, kHalf.distance)).toEqual(7595.1);
  expect(raceTime(10, k10.distance)).toEqual(3600);
  expect(raceTime(10, k5.distance)).toEqual(1800);
  expect(raceTime(10, kMile.distance)).toEqual(579.36384);
});
