import R from 'ramda';
import { getRaceEquivalents, getTrainingPaces } from './vdotTable';
import { secToTime, minToTime } from './conversion';

it('getRaceEquivalents', () => {
  const eqv = R.map(secToTime, getRaceEquivalents(40.04838709677419355));
  expect(eqv).toEqual({
    '1500': '06:35',
    Mile: '07:07',
    '3K': '14:03',
    '2M': '15:08',
    '5K': '24:07',
    '8K': '39:39',
    '5M': '39:54',
    '10K': '50:00',
    '15K': '1:17:02',
    '10M': '1:23:06',
    '20K': '1:44:47',
    Half: '1:50:53',
    '25K': '2:12:50',
    '30K': '2:40:57',
    Marathon: '3:49:32'
  });  
});

it('getTrainingPaces', () => {
  const eqv = R.map(minToTime, getTrainingPaces(47));
  expect(eqv).toEqual({
    'E': '05:34',
    'M': '04:46',
    'T': '04:30',
    'T10K': '04:22',
    'I': '04:07',
    'R': '03:51',
  });  
});

