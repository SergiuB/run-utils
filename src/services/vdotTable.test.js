import { getPerformance } from './vdotTable';
import { k3, k5, k10, kHalf } from './constants';

it('psses basic tests', () => {
  expect(getPerformance(k10, '50:00')).toEqual({
    vdot: 40,
    percentage: 0.05,
    equivalents: {
      '1500': '06:35',
      Mile: '07:07',
      '3K': '14:03',
      '2M': '15:08',
      '5K': '24:07',
      '8K': '39:39',
      '5M': '39:54',
      '10K': '50:00',
      '15K': '01:17:02',
      '10M': '01:23:06',
      '20K': '01:44:47',
      Half: '01:50:53',
      '25K': '02:12:49',
      '30K': '02:40:57',
      Marathon: '03:49:32'
    }
  });
  expect(getPerformance(k10, '47:11')).toEqual({
    vdot: 42,
    percentage: 0.88,
    equivalents: {
      '1500': '06:12',
      Mile: '06:42',
      '3K': '13:14',
      '2M': '14:16',
      '5K': '22:45',
      '8K': '37:25',
      '5M': '37:38',
      '10K': '47:11',
      '15K': '01:12:38',
      '10M': '01:18:22',
      '20K': '01:38:51',
      Half: '01:44:36',
      '25K': '02:05:24',
      '30K': '02:32:01',
      Marathon: '03:36:59'
    }
  });
  expect(getPerformance(kHalf, '1:40:25')).toEqual({
    vdot: 44,
    percentage: 0.96,
    equivalents: {
      '1500': '05:57',
      Mile: '06:26',
      '3K': '12:41',
      '2M': '13:41',
      '5K': '21:52',
      '8K': '35:56',
      '5M': '36:09',
      '10K': '45:19',
      '15K': '01:09:44',
      '10M': '01:15:14',
      '20K': '01:34:54',
      Half: '01:40:25',
      '25K': '02:00:26',
      '30K': '02:26:04',
      Marathon: '03:28:36'
    }
  });
  expect(getPerformance(k3, '12:38')).toEqual({
    vdot: 45,
    percentage: 0.14,
    equivalents: {
      '1500': '05:56',
      Mile: '06:24',
      '3K': '12:39',
      '2M': '13:38',
      '5K': '21:47',
      '8K': '35:49',
      '5M': '36:02',
      '10K': '45:09',
      '15K': '01:09:30',
      '10M': '01:14:59',
      '20K': '01:34:35',
      Half: '01:40:05',
      '25K': '02:00:02',
      '30K': '02:25:35',
      Marathon: '03:27:55'
    }
  });
  expect(getPerformance(k5, '21:56')).toEqual({
    vdot: 44,
    percentage: 0.76,
    equivalents: {
      '1500': '05:58',
      Mile: '06:27',
      '3K': '12:44',
      '2M': '13:44',
      '5K': '21:57',
      '8K': '36:04',
      '5M': '36:18',
      '10K': '45:29',
      '15K': '01:10:00',
      '10M': '01:15:32',
      '20K': '01:35:16',
      Half: '01:40:49',
      '25K': '02:00:54',
      '30K': '02:26:38',
      Marathon: '03:29:23'
    }
  });
  expect(getPerformance(kHalf, '1:36:33')).toEqual({
    vdot: 47,
    percentage: 0.05,
    equivalents: {
      '1500': '05:42',
      Mile: '06:10',
      '3K': '12:12',
      '2M': '13:10',
      '5K': '21:01',
      '8K': '34:33',
      '5M': '34:46',
      '10K': '43:34',
      '15K': '01:07:03',
      '10M': '01:12:21',
      '20K': '01:31:15',
      Half: '01:36:33',
      '25K': '01:55:50',
      '30K': '02:20:33',
      Marathon: '03:20:50'
    }
  });
});

it('throws error for invalid params', () => {
  expect(getPerformance).toThrow('Race object not valid. Valid ones are in constants, import from there.');
  expect(getPerformance.bind(null, k10)).toThrow('invalid time');
  expect(getPerformance.bind(null, k10, 'fggh')).toThrow('invalid time format');
});