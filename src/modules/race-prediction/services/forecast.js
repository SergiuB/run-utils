const timeseries = require("timeseries-analysis");
const R = require('ramda');
const { timeDay } = require('d3-time');
const moment = require('moment');

const stringToDate = R.constructN(1, Date);
const toDate = R.map(R.adjust(stringToDate,0));
const pointsToSegments = R.aperture(2);

const progression = (v1, v2, count) => R.times(n => v1 + n * ((v2 - v1) / count), count);

const expandSegment = ([p1, p2]) => {
    const [d1, v1] = p1;
    const [d2, v2] = p2;
    const dateRange = timeDay.range(d1, d2);
    const vdotRange = progression(v1, v2, dateRange.length);
    return R.zip(dateRange, vdotRange);
};

const process = R.compose(
    R.unnest,
    R.map(expandSegment),
    pointsToSegments,
    toDate,
);

const nextDay = date => moment(date).add(1,'d').toDate();
const lastDate = R.compose(R.prop(0), R.last);

const isOneYearFromNow = date => moment(date).isAfter(moment().add(1, 'y'));

const forecast = ({
    data,
    stopCond = last => isOneYearFromNow(last.date),
    method = 'ARMaxEntropy', // 'ARLeastSquare',
    degree = 5,
} = {}) => {
    if (data.length < 2) {
        throw new Error('Forecasting requires at least 2 data points.')
    }
    const all = process(data);
    const prediction = [];
    
    const coeffOp = method === 'ARMaxEntropy' ? R.subtract : R.add;
    
    let maxCount = 2000;
    let i = 0;
    while (i < maxCount) {
        var t     = new timeseries.main(all);
        var coeffs = t[method]({ degree });
        
        const last = R.compose(R.map(R.prop(1)), R.reverse, R.takeLast);
        const values = last(coeffs.length, t.data);
        
        var forecastVal	= R.compose(
            R.reduce(coeffOp, 0),
            R.zipWith(R.multiply),
        )(values, coeffs);
        
        const nextDate = nextDay(lastDate(t.data));

        all.push([nextDate, forecastVal]);
        prediction.push({ date: nextDate, val: forecastVal });
        
        if (stopCond.call(null, prediction[prediction.length - 1], prediction[prediction.length - 2])) {
            break;
        }
        i++;
    }
    const weekly = prediction
        .filter(({ date }, idx) => date.getDate() === 1 || idx === prediction.length - 1);
    return weekly;
}

export default forecast;
