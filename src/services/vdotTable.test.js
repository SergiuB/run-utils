import { getPerformance } from './vdotTable';
import { k3, k5, k10, kHalf } from './constants';

it('test', () => {

  expect(getPerformance(k10, '50:00')).toEqual({
    vdot: 40,
    percentage: 0.05,  
  });
  expect(getPerformance(k10, '47:011')).toEqual({
    vdot: 42,
    percentage: 0.88,  
  });
  expect(getPerformance(kHalf, '1:40:25')).toEqual({
    vdot: 44,
    percentage: 0.96,  
  });
  expect(getPerformance(k3, '12:38')).toEqual({
    vdot: 45,
    percentage: 0.14,  
  });
  expect(getPerformance(k5, '21:56')).toEqual({
    vdot: 44,
    percentage: 0.76,  
  });
  expect(getPerformance(kHalf, '1:36:33')).toEqual({
    vdot: 47,
    percentage: 0.05,  
  });
});
