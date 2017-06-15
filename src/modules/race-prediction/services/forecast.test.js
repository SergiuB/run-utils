import forecast from './forecast';
import moment from 'moment';

describe('forecast service', () => {
  it('forecasts', () => {
    const data = [
      ['10/14/2016', 40.1],
      ['12/01/2016', 43.1],
      ['01/28/2017', 45.0],
      ['04/09/2017', 47.0],
      ['05/14/2017', 48.1]
    ];
    const { date, val } = forecast({
      stopCond: ({ date, val }) => moment(date).isSame('2018-01-01'),
      data
    });
    expect(moment(date).isSame('2018-01-01')).toBeTruthy();
    expect(val).toEqual(53.64485097778608);
  })
})