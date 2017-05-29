import R from 'ramda';
import { getRaceEquivalents, getTrainingPaces, getVdot } from './vdotTable';
import { secToTime, minToTime, timeToSec } from './conversion';
import { kHalf, k10 } from './constants';

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
    "10K": "1:03:57",
    "10M": "1:46:04",
    "1500": "08:30",
    "15K": "1:37:53",
    "20K": "2:13:08",
    "25K": "2:48:28",
    "2M": "19:22",
    "30K": "3:23:43",
    "3K": "17:49", 
    "5K": "30:43",
    "5M": "50:55",
    "8K": "50:17",
    "Half": "2:21:11",
    "Marathon": "4:49:17",
    "Mile": "09:15"
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

