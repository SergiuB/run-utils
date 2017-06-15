import React, { Component } from 'react';
// import R from 'ramda';
import C3Chart from 'react-c3js';
import moment from 'moment';

import core from 'modules/core';
const { secToTime } = core.services.conversion;

import 'c3/c3.css';


export default class VdotChart extends Component {
  
  render() {
    const { races } = this.props;

    const data = {
      json: races,
      keys: {
        x: 'date', // it's possible to specify 'x' when category axis
        value: ['vdot']
      },
      names: {
        vdot: 'Past performances',
      }
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

    const tooltip = {
      contents: (d, defaultTitleFormat, defaultValueFormat, color) => {
        const { name, date, vdot, time, distance } = this.props.races[d[0].index];
        return `
          <div>
            <div>${moment(date).format('YYYY-MM-DD')}</div>
            <div>${name}</div>
            <div>${distance.toFixed(2)} km</div>
            <div>${secToTime(time)}</div>
            <div>${vdot} VDOT</div>
          </div>
        `;
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