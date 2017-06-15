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
const futureSeries = 'Forecast';

class VdotChart extends Component {
  
  render() {
    const { races } = this.props;
    const raceArr = races.map(({ date, vdot }) => [date, vdot]);
    const weeklyPredictions = forecast({
      data: raceArr
    })

    // console.log(weeklyPredictions);

    const pastDates = races.map(R.prop('date'));
    const pastVdotValues = races.map(R.prop('vdot'));

    const futureDates = weeklyPredictions.map(R.prop('date'));
    const futureVdotValues = weeklyPredictions.map(R.prop('val'));

     const data = {
        xs: {
            [pastSeries]: 'x1',
            [futureSeries]: 'x2',
            // 'data2': 'x2',
        },
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ['x1', ...pastDates],
            ['x2', ...futureDates],
//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            [pastSeries, ...pastVdotValues],
            [futureSeries, ...futureVdotValues],
            // ['forecasted', null, null, null, null, null, null, 47.85, 49, 55],
        ],
        types: {
            [pastSeries]: 'spline',
            [futureSeries]: 'spline',
            // 'forecasted': 'line'
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
        if (dataPoint.id === futureSeries) {
          const { x, value} = dataPoint
          return `
            <div>
              <div>${moment(x).format('YYYY-MM-DD')}</div>
              <div>${oneDecimal(value)} VDOT</div>
            </div>
          `;
        } else {
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