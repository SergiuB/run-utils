import React from 'react';
import R from 'ramda';

import Paper from 'material-ui/Paper';

import { secToTime } from '../../services/conversion';
import { kEasyPace, kMarathonPace, kMile } from '../../services/constants';

import './TrainingTable.css';

function formatIntensity(label, intensity, metric) {
  switch (label) {
    case kEasyPace:
      return metric ? secToTime(intensity) : secToTime(intensity * kMile.distance);
    case kMarathonPace:
      return metric ? secToTime(intensity / kMile.distance) : secToTime(intensity);
    default:
      return secToTime(intensity);
  }
}

class TrainingTable extends React.Component {
  render() {
    return (
      <Paper className='training-table'>
          <div>
            {R.compose(
              R.map(([label, intensity]) => (
                <div className='row' key={label}>
                  <div className='mui--text-body2'>{label}</div>
                  <div>{formatIntensity(label, intensity, this.props.metric)}</div>
                </div>
              )),
              R.filter(([_, intensity]) => intensity !== 0),
              R.toPairs
            )(this.props.trainingIntensity)}
          </div>
      </Paper>
    );
  }
};

export default TrainingTable;