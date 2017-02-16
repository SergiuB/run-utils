import {
  kphToMinKm,
  minKmToKph,
  timeToSec,
  timeToMin,
  minToTime,
} from './conversion';

it('converts from kph to min/km', () => {
  expect(kphToMinKm(10)).toEqual(6);
  expect(kphToMinKm(12)).toEqual(5);
  expect(kphToMinKm(15)).toEqual(4);
  expect(kphToMinKm(20)).toEqual(3);
});

it('converts from min/km to kph', () => {
  expect(minKmToKph(6)).toEqual(10);
  expect(minKmToKph(5)).toEqual(12);
  expect(minKmToKph(4)).toEqual(15);
  expect(minKmToKph(3)).toEqual(20);
});

it('converts from hh:mm:ss to seconds', () => {
  expect(timeToSec("3:10:45")).toEqual(190 * 60 + 45);
  expect(timeToSec("10:45")).toEqual(645);
  expect(timeToSec("234")).toEqual(234);
});

it('converts from hh:mm:ss to minutes', () => {
  expect(timeToMin("0:10:59")).toEqual(10 + 59 / 60);
  expect(timeToMin("02:03")).toEqual(2 + 3 / 60);
  expect(timeToMin("90")).toEqual(1.5);
});

it('converts from minutes to hh:mm:ss', () => {
  expect(minToTime(10 + 59 / 60)).toEqual("10:59");
  expect(minToTime(2 + 3 / 60)).toEqual("02:03");
  expect(minToTime(1.5)).toEqual("01:30");
  expect(minToTime(60)).toEqual("01:00:00");
  expect(minToTime(1)).toEqual("01:00");
});
