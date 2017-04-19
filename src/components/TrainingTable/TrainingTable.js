import React from 'react';
import R from 'ramda';

import Paper from 'material-ui/Paper';

import { secToTime } from '../../services/conversion';
import { kEasyPace, kMile, allIntensitiesObj } from '../../services/constants';

import './TrainingTable.css';

function formatIntensity(id, intensity, metric) {
  switch (id) {
    case kEasyPace.id:
      return metric ? secToTime(intensity) : secToTime(intensity * kMile.distance);
    default:
      return secToTime(intensity);
  }
}

class TrainingTable extends React.Component {
  buildIntensityCol(a) {
    console.log(a);
    const {label, id, val} = a;
    return (
      <div key={id}>{label}- {formatIntensity(id, val, this.props.metric)}</div>
    )
  }

  buildIntensityRow([type, intensityCols]) {
    return (
      <div className='row' key={type}>
        <div className='mui--text-body2'>{type}</div>
        <div className='row'>
          {R.map(colData => this.buildIntensityCol(colData), intensityCols)}
      </div>
      </div>
    )
  }

  render() {
    return (
      <Paper className='training-table'>
        <div>
          {R.compose(
            R.map(rowData => this.buildIntensityRow(rowData)),
            R.toPairs,
            R.groupBy(({ type }) => type),
            R.map(([id, intensityVal]) => R.merge(allIntensitiesObj[id], { val: intensityVal })),
            R.filter(([_, intensityVal]) => intensityVal !== 0),
            R.toPairs
          )(this.props.trainingIntensity)}
        </div>
      </Paper>
    );
  }
};

export default TrainingTable;