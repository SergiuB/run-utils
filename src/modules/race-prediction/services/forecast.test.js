import forecast from './forecast';
import moment from 'moment';
import R from 'ramda';

const convexData = [
  ['2016-10-14', 40.1],
  ['2016-12-01', 43.1],
  ['2017-01-28', 45.0],
];

describe('forecast service', () => {
  it('forecasts VDOT on specific date using ARMaxEntropy method by default', () => {
    const weeklyPrediction = forecast({
      stopCond: ({ date, val }) => moment(date).isSame('2018-01-01'),
      data: convexData
    });

    const { date, val } = R.last(weeklyPrediction);

    expect(moment(date).format('YYYY-MM-DD')).toEqual('2018-01-01');
    expect(val).toEqual(51.87151581762892);
  });

  it('forecasts VDOT on specific date using ARLeastSquare method', () => {
    const weeklyPrediction = forecast({
      stopCond: ({ date, val }) => moment(date).isSame('2018-01-01'),
      data: convexData,
      method: 'ARLeastSquare',
    });
    const { date, val } = R.last(weeklyPrediction);
    expect(moment(date).format('YYYY-MM-DD')).toEqual('2018-01-01');
    expect(val).toEqual(56.68251594380877);
  });


  it('forecasts VDOT for end of each week until specific date', () => {
    const weeklyPrediction = forecast({
      stopCond: ({ date, val }) => moment(date).isSame('2017-02-28'),
      data: convexData,
    })
      .map(({ date, val }) => ({
        date: moment(date).format('YYYY-MM-DD'),
        val
      }));

    expect(weeklyPrediction).toEqual([
      { date: '2017-01-29', val: 44.999883656380284},
      { date: '2017-02-05', val: 45.22520288023854},
      { date: '2017-02-12', val: 45.44514391313285},
      { date: '2017-02-19', val: 45.6599301558172},
      { date: '2017-02-26', val: 45.86976579691684},
      { date: '2017-02-28', val: 45.92883619561878}
    ]);
  });
})