import React, { Component } from 'react';
import moment from 'moment';
import R from 'ramda';
import { branch, renderNothing, onlyUpdateForKeys } from 'recompose';

import core from 'modules/core';
import C3Chart from './C3Chart';

const { secToTime } = core.services.conversion;
const { getVdot, getRaceEquivalents } = core.services.vdotCalculator;

import 'c3/c3.css';
import './VdotChart.css';

const pastSeries = 'Past';
const futureSeriesME = 'Forecast (Max Entropy)';
const oneDecimal = number => Number.parseFloat(number.toFixed(1), 10);
const max = R.reduce(R.max, 0);

class VdotChart extends Component {

  state = {
    refreshChart: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.goalPerformances.length !== nextProps.goalPerformances.length) {
      this.setState({ refreshChart: true });
    } else {
      this.setState({ refreshChart: false })
    }
  }
  
  
  render() {

    const { races, goalPerformances, prediction } = this.props;
    const { refreshChart } = this.state;

    const pastDates = races.map(R.prop('date'));
    const pastVdotValues = races.map(R.prop('vdot'));

    const futureDatesME = prediction.map(R.prop('date'));
    const futureVdotValuesME = prediction.map(R.prop('val'));

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

    const maxGoalVdot = max(lines.map(R.prop('value')));
    const maxPredictedVdot = R.compose(
      max,
      R.map(R.prop('val'))
    )(prediction);

    const axis = {
      x: {
          type: 'timeseries',
          tick: {
              format: formatTicks,
              rotate: 45,
          },
      },
      y: {
        max: Math.max(maxGoalVdot, maxPredictedVdot)
      }
    };

    const goalRaceLabels = goalPerformances.map(({ race }) => race.label);

    const equivPerformances = vdot => {
      const raceEquivalents = getRaceEquivalents(vdot);
      return goalRaceLabels.map(label => ({
        label,
        time: raceEquivalents[label]
      }));
    };

    const equivPerformancesHtml = vdot => equivPerformances(vdot).map(({ label, time }) => `
      <div class='multiple-values'>
        <div>${label}</div>
        <div>${secToTime(time)}</div>
      </div>
    `).join('');

    const tooltip = {
      contents: (d, defaultTitleFormat, defaultValueFormat, color) => {
        const dataPoint = d[0];
        if (dataPoint.id === pastSeries) {
          const { name, date, vdot, time, distance } = this.props.races[dataPoint.index];
          return `
            <div class='tooltip'>
              <div class='multiple-values'>
                <div>${moment(date).format('YYYY-MM-DD')}</div>
                <div>${oneDecimal(vdot)}</div>
              </div>
              <div>${name}</div>
              <div class='multiple-values'>
                <div>${distance.toFixed(2)} km</div>
                <div>${secToTime(time)}</div>
              </div>
              <div>Equivalent performances</div>
              ${equivPerformancesHtml(vdot)}
            </div>
          `;
        } else {
          const [ forecastME ] = d;

          return `
            <div class='tooltip'>
              <div class='multiple-values'>
                <div>${moment(forecastME.x).format('YYYY-MM-DD')}</div>
                <div>${oneDecimal(forecastME.value)}</div>
              </div>
              <div>Equivalent performances</div>
              ${equivPerformancesHtml(forecastME.value)}
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