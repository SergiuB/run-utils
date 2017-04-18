import React, { Component } from 'react';
import R from 'ramda';

import { secToTime } from '../../services/conversion';
import { kEasyPace, kMarathonPace, kMile } from '../../services/constants';


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

class TrainingTable extends Component {
  render() {
    return (
      <div>
        {R.compose(
          R.map(([label, intensity]) => (
            <div key={label}>
              <div>{label}</div>
              <div>{formatIntensity(label, intensity, this.props.metric)}</div>
            </div>
          )),
          R.filter(([_, intensity]) => intensity !== 0),
          R.toPairs
        )(this.props.trainingIntensity)}
      </div>
    );
  }
}

export default TrainingTable;