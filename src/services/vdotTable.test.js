import R from 'ramda';
import { getRaceEquivalents, getTrainingPaces, getVdot, minRaceEquivalents, maxRaceEquivalents, VDOT_MIN, VDOT_MAX } from './vdotTable';
import { secToTime, minToTime, timeToSec } from './conversion';
import { kHalf, k10 } from './constants';



it('minRaceEquivalents', () => {
  const expectGt = (v1, v2) => expect(v1).toBeGreaterThan(v2);
  R.zipWith(expectGt, getRaceEquivalents(VDOT_MIN), minRaceEquivalents);
  expect(secToTime(minRaceEquivalents[kHalf.label])).toEqual("2:21:04");
})
it('maxRaceEquivalents', () => {
  const expectLt = (v1, v2) => expect(v1).toBeLessThan(v2);
  R.zipWith(expectLt, getRaceEquivalents(VDOT_MAX), maxRaceEquivalents);
  expect(secToTime(maxRaceEquivalents[k10.label])).toEqual("26:19");
})

it('getVdot using race object', () => {
  expect(getVdot(kHalf, timeToSec('57:50'))).toEqual(85);
  expect(getVdot(kHalf, timeToSec('2:21:04'))).toEqual(30.032202911832528);
  expect(getVdot(k10, timeToSec('44:30'))).toEqual(46.056709825464914);
});

it('time obtained from race equivalents is same as time used to compute them', () => {
  const halfTime = timeToSec('1:35:40');
  const eqvHalfTime = getRaceEquivalents(getVdot(kHalf, halfTime))[kHalf.label];
  expect(eqvHalfTime).toEqual(halfTime);
});

it('getRaceEquivalents', () => {
  const eqv = R.map(secToTime, getRaceEquivalents(30));
  expect(eqv).toEqual({
    "10K": "1:03:46",
    "10M": "1:45:55",
    "1500": "08:30",
    "15K": "1:37:53",
    "20K": "2:13:08",
    "25K": "2:48:28",
    "2M": "19:19",
    "30K": "3:23:37",
    "3K": "17:49", 
    "5K": "30:40",
    "5M": "50:50",
    "8K": "50:17",
    "Half": "2:21:04",
    "Marathon": "4:49:17",
    "Mile": "09:11"
  });
});

it('getTrainingPaces', () => {
  const eqv = R.map(minToTime, getTrainingPaces(47));
  expect(eqv).toEqual({
    'J': '06:04',
    'E': '05:34',
    'M': '04:46',
    'T': '04:29',
    'T10K': '04:22',
    'I': '04:07',
    'R': '03:50',
  });  
});

