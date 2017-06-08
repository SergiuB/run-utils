import React from 'react';
import R from 'ramda';

import Divider from 'material-ui/Divider';

import core from '../../../core';
const { secToTime, minToTime } = core.services.conversion;
const { kEasyPace, kMile, allIntensitiesObj } = core.constants;
const { racePace, racePaceMile } = core.services.raceCalculator;

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
      <div className='training-table-row'>
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

  buildEasyRow({ val } ) {
    const { metric } = this.props;
    return (
      <div className='training-table-row'>
        <div><p className='type mui--text-body2'>{kEasyPace.type}</p></div>
        <div className='intensity-data'>
          <div className='intensity-data-col'>
            <span>{formatEasyPace(val, metric)}</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='training-table'>
        {R.compose(
          R.map(([type, cols]) => (
              <div key={type}>
                {type !== kEasyPace.type && <Divider />}
                {type === kEasyPace.type ? this.buildEasyRow(cols[0]) : this.buildIntensityRow(type, cols)}
              </div>
            )
          ),
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