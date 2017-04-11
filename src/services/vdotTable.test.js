import { getPerformance } from './vdotTable';
import { k3, k5, k10, kHalf } from './constants';

it('psses basic tests', () => {
  expect(getPerformance(k10, '50:00')).toEqual({
    vdot: 40,
    percentage: 0.05,
    equivalents: ['00:06:35', '00:07:07', '00:14:03', '00:15:08', '00:24:07', '00:39:39', '00:39:54', '00:50:00', '01:17:02', '01:23:06', '01:44:47', '01:50:53', '02:12:49', '02:40:57', '03:49:32']
  });
  expect(getPerformance(k10, '47:11')).toEqual({
    vdot: 42,
    percentage: 0.88,
    equivalents: ['00:06:12', '00:06:42', '00:13:14', '00:14:16', '00:22:45', '00:37:25', '00:37:38', '00:47:11', '01:12:38', '01:18:22', '01:38:51', '01:44:36', '02:05:24', '02:32:01', '03:36:59']
  });
  expect(getPerformance(kHalf, '1:40:25')).toEqual({
    vdot: 44,
    percentage: 0.96,
    equivalents: ['00:05:57', '00:06:26', '00:12:41', '00:13:41', '00:21:52', '00:35:56', '00:36:09', '00:45:19', '01:09:44', '01:15:14', '01:34:54', '01:40:25', '02:00:26', '02:26:04', '03:28:36']
  });
  expect(getPerformance(k3, '12:38')).toEqual({
    vdot: 45,
    percentage: 0.14,
    equivalents: ['00:05:56', '00:06:24', '00:12:39', '00:13:38', '00:21:47', '00:35:49', '00:36:02', '00:45:09', '01:09:30', '01:14:59', '01:34:35', '01:40:05', '02:00:02', '02:25:35', '03:27:55']
  });
  expect(getPerformance(k5, '21:56')).toEqual({
    vdot: 44,
    percentage: 0.76,
    equivalents: ['00:05:58', '00:06:27', '00:12:44', '00:13:44', '00:21:57', '00:36:04', '00:36:18', '00:45:29', '01:10:00', '01:15:32', '01:35:16', '01:40:49', '02:00:54', '02:26:38', '03:29:23']
  });
  expect(getPerformance(kHalf, '1:36:33')).toEqual({
    vdot: 47,
    percentage: 0.05,
    equivalents: ['00:05:42', '00:06:10', '00:12:12', '00:13:10', '00:21:01', '00:34:33', '00:34:46', '00:43:34', '01:07:03', '01:12:21', '01:31:15', '01:36:33', '01:55:50', '02:20:33', '03:20:50']
  });
});

it('throws error for invalid params', () => {
  expect(getPerformance).toThrow('Race object not valid. Valid ones are in constants, import from there.');
  expect(getPerformance.bind(null, k10)).toThrow('invalid time');
  expect(getPerformance.bind(null, k10, 'fggh')).toThrow('invalid time format');
});