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
const oneDecimal = number => Number.parseFloat(number.toFixed(1), 10);
const max = R.reduce(R.max, 0);
const is6MonthsFromNow = ({ date }) => moment(date).isAfter(moment().add(6, 'M'));
const isOneYearFromNow = ({ date }) => moment(date).isAfter(moment().add(1, 'y'));
const is2YearsFromNow = ({ date }) => moment(date).isAfter(moment().add(2, 'y'));
const is5YearsFromNow = ({ date }) => moment(date).isAfter(moment().add(5, 'y'));

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

    const forecastData = {
      data: raceArr,
      stopCond: is5YearsFromNow,
    };

    const weeklyPredictionsME = forecast(forecastData);

    const pastDates = races.map(R.prop('date'));
    const pastVdotValues = races.map(R.prop('vdot'));

    const futureDatesME = weeklyPredictionsME.map(R.prop('date'));
    const futureVdotValuesME = weeklyPredictionsME.map(R.prop('val'));

    const data = {
      xs: {
          [pastSeries]: 'x1',
          [futureSeriesME]: 'x2',
      },
      columns: [
          ['x1', ...pastDates],
          ['x2', ...futureDatesME],
          [pastSeries, ...pastVdotValues],
          [futureSeriesME, ...futureVdotValuesME],
      ],
      types: {
          [pastSeries]: 'line',
          [futureSeriesME]: 'line',
      },
      xFormat: '%Y-%m-%d',
    };

    const formatTicks = (date) => {
      return moment(date).format('YYYY-MM-DD');
    };

    const toLine = ({ race, time }) => ({
      value: oneDecimal(getVdot(race.distance, time)),
      text: `${race.label} - ${secToTime(time)}`,
      position: 'start'
    });

    const toLines = R.map(toLine);

    const lines = toLines(goalPerformances);

    const grid = {
      y: {
        // show: true,
        lines: toLines(goalPerformances)
      }
    }

    const maxVdot = max(lines.map(R.prop('value')));
    const axis = {
      x: {
          type: 'timeseries',
          tick: {
              format: formatTicks,
              rotate: 45,
          },
      },
      y: {
        max: lines.length ? maxVdot : undefined
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
          const [ forecastME ] = d;

          return `
            <div>
              <div>${moment(forecastME.x).format('YYYY-MM-DD')}</div>
              <div>${forecastME.id} ${oneDecimal(forecastME.value)} VDOT</div>
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