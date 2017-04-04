import React from 'react';
import Slider from 'rc-slider';

import _ from 'lodash';
import R from 'ramda';
import {
  secToTime,
} from '../../services/conversion';
import { raceTime, raceSpeed } from '../../services/raceCalculator';

import 'rc-slider/assets/index.css';

const Range = Slider.Range;

export default class RaceTimeSlider extends React.Component {
  handleChange(value) {
    const { kph, races, onChange, minKph, maxKph } = this.props;
    const oldValues = races.map(race => Math.floor(raceTime(kph, race.distance)));

    const [, val, race] = _.find(_.zip(oldValues, value, races),
      ([oldVal, val]) => oldVal !== val);

    const newSpeed = raceSpeed(val, race.distance);
    console.log(newSpeed, minKph, maxKph);

    // Don't fire onChange if speed is below or above limits
    if (newSpeed > minKph && newSpeed < maxKph) {
      onChange.call(null, newSpeed);
    }
  }
  render() {
    const { kph, races, minKph } = this.props;
    const markData = _(races)
      .map(race => ({
        label: `${race.label}\n${secToTime(raceTime(kph, race.distance))}`,
      }))
      .value();

    const values = races.map(race => Math.floor(raceTime(kph, race.distance)));

    const marks = _.zipObject(values, markData);

    const getMaxDistance = R.compose(R.prop('distance'), R.reduce(R.maxBy(R.prop('distance')), { distance: 0 }));
    const maxSec = Math.floor((getMaxDistance(races) / minKph) * 3600 * 1.01);

    return (
     <Range
       className={'slider'}
       value={values}
       onChange={value => this.handleChange(value)}
       marks={marks}
       max={maxSec}
     />
    );
  }
}

RaceTimeSlider.propTypes = {
  kph: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

RaceTimeSlider.defaultProps = {
  kph: 10,
  onChange: () => {},
}
