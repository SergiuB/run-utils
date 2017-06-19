import React, { Component } from 'react';
// import R from 'ramda';
import moment from 'moment';
import R from 'ramda';
import { branch, renderNothing, onlyUpdateForKeys } from 'recompose';

import core from 'modules/core';
import { forecast } from '../../services';
import C3Chart from './C3Chart';

const { secToTime } = core.services.conversion;
const { getVdot } = core.services.vdotCalculator;

import 'c3/c3.css';

const pastSeries = 'Past';
const futureSeriesME = 'Forecast (Max Entropy)';
const futureSeriesLS = 'Forecast (Least Square)';
const oneDecimal = number => Number.parseFloat(number.toFixed(1), 10);
const max = R.reduce(R.max, 0);

class VdotChart extends Component {

  state = {
    refreshChart: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.goalPerformances.length != nextProps.goalPerformances.length) {
      this.setState({ refreshChart: true });
    } else {
      this.setState({ refreshChart: false })
    }
  }
  
  
  render() {

    const { races, goalPerformances } = this.props;
    const { refreshChart } = this.state;

    const raceArr = races.map(({ date, vdot }) => [date, vdot]);

    const weeklyPredictionsME = forecast({
      data: raceArr
    });
    
    const weeklyPredictionsLS = forecast({
      data: raceArr,
      method: 'ARLeastSquare'
    });


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
          [pastSeries]: 'line',
          [futureSeriesME]: 'line',
          [futureSeriesLS]: 'line',
      },
      xFormat: '%Y-%m-%d',
    };

    const formatTicks = (date) => {
      return moment(date).format('YYYY-MM-DD');
    };

    const goalPerfLines = goalPerformances.map(({ race, time }, idx) => {
      const vdot = oneDecimal(getVdot(race.distance, time));
      const position = idx % 2 ? 'middle' : 'start';
      return {
        value: vdot,
        text: `${race.label} - ${secToTime(time)} (VDOT ${vdot})`,
        position
      };
    });

    const grid = {
      y: {
        // show: true,
        lines: goalPerfLines
      }
    }

    const maxVdot = max(goalPerfLines.map(R.prop('value')));
    const axis = {
      x: {
          type: 'timeseries',
          tick: {
              format: formatTicks,
              rotate: 45,
          },
      },
      y: {
        label: 'VDOT',
        max: goalPerfLines.length ? maxVdot : undefined
      }
    };

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

    return (
      <C3Chart
        data={data}
        axis={axis}
        tooltip={tooltip}
        grid={grid}
        padding={{
          right: 35
        }}
        recreate={refreshChart}
      />
    );
  }
}

const hideIfNoRaces = branch(
  props => !(props.races.length),
  renderNothing
)

const optimize = onlyUpdateForKeys(['races', 'goalPerformances']);

const enhance = R.compose(
  hideIfNoRaces,
  optimize,
)

export default enhance(VdotChart);