import React from 'react';
import R from 'ramda';

import Divider from 'material-ui/Divider';

import { secToTime, minToTime } from '../../services/conversion';
import { kEasyPace, kMile, allIntensitiesObj } from '../../services/constants';
import { racePace, racePaceMile } from '../../services/raceCalculator';

import './TrainingTable.css';

function formatEasyPace(sec, metric) {
  const formatPace = sec => metric ? secToTime(sec) : secToTime(sec * kMile.distance);
  return `${formatPace(sec)}/${metric ? 'km': 'mile'}`;
}

class TrainingTable extends React.Component {
  buildIntensityRow(type, intensityCols) {
    const { metric } = this.props;
    const maxPace = R.compose(
      minToTime,
      R.reduce(R.max, 0),
      R.map(({ val, distance }) => metric ? racePace(val, distance) : racePaceMile(val, distance))
    )(intensityCols);
    return (
      <div className='row' key={type}>
        <div><p className='type mui--text-body2'>{type}</p></div>
        <div className='intensity-data'>
            {R.map(({id, label, val, distance}) => (
              <div key={id} className='intensity-data-col mui--text-caption'>
                <span>{label}</span>
                <span className='mui--text-dark-secondary'>{secToTime(val)}</span>
              </div>
            ), intensityCols)}
          <div key={'pace'} className='intensity-data-col'>
              <span>{`${maxPace}/${metric ? 'km': 'mile'}`}</span>
          </div>
        </div>
      </div>
    )
  }

  buildEasyRow({ id, type, label, val } ) {
    const { metric } = this.props;
    return (
      <div className='row' key={type}>
        <div><p className='type mui--text-body2'>{type}</p></div>
        <div className='intensity-data'>
          <div key={id} className='intensity-data-col'>
            <span>{formatEasyPace(val, metric)}</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='training-table'>
        <div className="mui--text-subhead mui--text-dark-secondary">Training Paces</div>
        {R.compose(
          R.intersperse(<Divider />),
          R.map(([type, cols]) => type === kEasyPace.type ? this.buildEasyRow(cols[0]) : this.buildIntensityRow(type, cols)),
          R.toPairs,
          R.groupBy(({ type }) => type),
          R.map(([id, intensityVal]) => R.merge(allIntensitiesObj[id], { val: intensityVal })),
          R.filter(([_, intensityVal]) => intensityVal !== 0),
          R.toPairs,
        )(this.props.trainingIntensity)}
      </div>
    );
  }
};

export default TrainingTable;