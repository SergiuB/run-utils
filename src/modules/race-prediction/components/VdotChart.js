import React, { Component } from 'react';
import R from 'ramda';
import C3Chart from 'react-c3js';
import moment from 'moment';
import 'c3/c3.css';

export default class VdotChart extends Component {
  
  render() {
    const sort = R.sortBy(R.prop('date'));
    const { runActivities } = this.props;
    const sortedRuns = sort(runActivities);
    const dates = sortedRuns.map(R.prop('date'));
    const vdotValues = sortedRuns.map(R.prop('vdot'));
    const seriesName = 'Past Performances';
    console.log(sort(runActivities));
    const data = {
        x: 'x',
//        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
        columns: [
            ['x', ...dates],
//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
            [seriesName, ...vdotValues],
            // ['forecasted', null, null, null, null, null, null, 47.85, 49, 55],
        ],
        types: {
            [seriesName]: 'spline',
            // 'forecasted': 'line'
        },
        xFormat: '%Y-%m-%d'
    };

    const axis = {
        x: {
            type: 'timeseries',
            tick: {
                //format: '%Y-%m-%d',
                format: x => moment(x).format('YYYY-MM-DD')
                // values: ['2016-12-01', '2017-01-28', '2017-03-18']
            },
        },
    };

    const point =  {
      show: true
    }
    return <C3Chart data={data} axis={axis} point={point} unloadBeforeLoad={true}/>;
  }
}