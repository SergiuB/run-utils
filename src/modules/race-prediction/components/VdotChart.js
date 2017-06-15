import React, { Component } from 'react';
// import R from 'ramda';
import C3Chart from 'react-c3js';
import moment from 'moment';
import R from 'ramda';
import { branch, renderNothing } from 'recompose';

import core from 'modules/core';
import { forecast } from '../services';

const { secToTime } = core.services.conversion;

import 'c3/c3.css';

const pastSeries = 'Past';
const futureSeriesME = 'Forecast (Max Entropy)';
const futureSeriesLS = 'Forecast (Least Square)';

class VdotChart extends Component {
  
  render() {
    const { races } = this.props;
    const raceArr = races.map(({ date, vdot }) => [date, vdot]);

    const weeklyPredictionsME = forecast({
      data: raceArr
    });
    
    const weeklyPredictionsLS = forecast({
      data: raceArr,
      method: 'ARLeastSquare'
    });

    // console.log(weeklyPredictions);

    const pastDates = races.map(R.prop('date'));
    const pastVdotValues = races.map(R.prop('vdot'));

    const futureDatesME = weeklyPredictionsME.map(R.prop('date'));
    const futureVdotValuesME = weeklyPredictionsME.map(R.prop('val'));

    const futureDatesLS = weeklyPredictionsLS.map(R.prop('date'));
    const futureVdotValuesLS = weeklyPredictionsLS.map(R.prop('val'));

     const data = {
        xs: {
            [pastSeries]: 'x1',
            [futureSeriesME]: 'x2',
            [futureSeriesLS]: 'x3',
            // 'data2': 'x2',
        },
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ['x1', ...pastDates],
            ['x2', ...futureDatesME],
            ['x3', ...futureDatesLS],
            [pastSeries, ...pastVdotValues],
            [futureSeriesME, ...futureVdotValuesME],
            [futureSeriesLS, ...futureVdotValuesLS],
        ],
        types: {
            [pastSeries]: 'spline',
            [futureSeriesME]: 'line',
            [futureSeriesLS]: 'line',
        },
        xFormat: '%Y-%m-%d',
    };

    const formatTicks = (date) => {
      return moment(date).format('YYYY-MM-DD');
    };

    const axis = {
      x: {
          type: 'timeseries',
          tick: {
              format: formatTicks,
              rotate: 45,
          },
      },
      y: {
        label: 'VDOT'
      }
    };

    const oneDecimal = number => Number.parseFloat(number.toFixed(1), 10);
    const tooltip = {
      contents: (d, defaultTitleFormat, defaultValueFormat, color) => {
        const dataPoint = d[0];
        if (dataPoint.id === pastSeries) {
          const { name, date, vdot, time, distance } = this.props.races[dataPoint.index];
          return `
            <div>
              <div>${moment(date).format('YYYY-MM-DD')}</div>
              <div>${name}</div>
              <div>${distance.toFixed(2)} km</div>
              <div>${secToTime(time)}</div>
              <div>${oneDecimal(vdot)} VDOT</div>
            </div>
          `;
        } else {
          const [ forecastME, forecastLS ] = d;

          return `
            <div>
              <div>${moment(forecastME.x).format('YYYY-MM-DD')}</div>
              <div>${forecastME.id} ${oneDecimal(forecastME.value)} VDOT</div>
              <div>${forecastLS.id} ${oneDecimal(forecastLS.value)} VDOT</div>
            </div>
          `;
        }
      }
    };

    const point =  {
      show: true
    };

    return (
      <C3Chart
        data={data}
        axis={axis}
        point={point}
        tooltip={tooltip}
      />
    );
  }
}

const hideIfNoRaces = branch(
  props => !(props.races.length),
  renderNothing
)

export default hideIfNoRaces(VdotChart);