import React from 'react';
import Slider from 'rc-slider';

import _ from 'lodash';
import R from 'ramda';
import classNames from 'classnames';
import {
  secToTime,
  minToTime,
  kphToMinKm,
} from '../../services/conversion';
import { raceTime, raceSpeed } from '../../services/raceCalculator';

import RaceTimeHandle from './RaceTimeHandle';

import 'rc-slider/assets/index.css';
import './style.css';

const Range = Slider.Range;

export default class RaceTimeRange extends React.Component {
  handleChange(value) {
    const { races, onChange, minKph, maxKph } = this.props;
    const oldValues = this.getValues();

    const [, val, race] = _.find(_.zip(oldValues, value, races),
      ([oldVal, val]) => oldVal !== val);

    const newSpeed = raceSpeed(val, race.distance);

    // Don't fire onChange if speed is below or above limits
    if (newSpeed > minKph && newSpeed < maxKph) {
      onChange.call(null, newSpeed);
    }
  }
  getValues() {
    return this.props.races.map(race => raceTime(this.props.kph, race.distance));
  }
  incFirstValue() {
    const [first, ...rest] = this.getValues();
    this.handleChange([first + 1, ...rest]);
  }
  decFirstValue() {
    const [first, ...rest] = this.getValues();
    this.handleChange([first - 1, ...rest]);
  }
  render() {
    const { kph, races, minKph, maxKph, inline, showPace, selected } = this.props;
    const values = races.map(race => Math.floor(raceTime(kph, race.distance)));

    const getMaxDistance = R.compose(R.prop('distance'), R.reduce(R.maxBy(R.prop('distance')), { distance: 0 }));
    const maxSec = Math.floor((getMaxDistance(races) / minKph) * 3600);

    const getMinDistance = R.compose(R.prop('distance'), R.reduce(R.minBy(R.prop('distance')), { distance: Number.POSITIVE_INFINITY }));
    const minSec = Math.floor((getMinDistance(races) / maxKph) * 3600);

    const sliderClass = classNames('slider', { inline, selected });
    return (
      <div className={sliderClass}>
        <button type='button' className='change-btn' onClick={() => this.decFirstValue()}>&lt;</button>
        <Range
          value={values}
          onChange={value => this.handleChange(value)}
          min={minSec}
          max={maxSec}
          handle={props => {
            const race = races[props.index];
            return (
              <RaceTimeHandle
                key={props.index}
                labelUp={race.label}
                labelDown={secToTime(raceTime(kph, race.distance))}
                inline={inline}
                {...props}
                />
            );
          }}
          />
        <button type='button' className='change-btn' onClick={() => this.incFirstValue()}>&gt;</button>
        {showPace && <div className={'right-label'}>{minToTime(kphToMinKm(kph), false)}/km</div>}
      </div>
    );
  }
}

RaceTimeRange.propTypes = {
  kph: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

RaceTimeRange.defaultProps = {
  kph: 10,
  onChange: () => { },
}