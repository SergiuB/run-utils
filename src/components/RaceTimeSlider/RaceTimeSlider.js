import React from 'react';
import Slider from 'rc-slider';

import _ from 'lodash'
import {
  secToTime,
} from '../../services/conversion';
import { raceTime, raceSpeed } from '../../services/raceCalculator';

import 'rc-slider/assets/index.css';

const Range = Slider.Range;

export default class RaceTimeSlider extends React.Component {
  handleChange(value) {
    const { kph, races, onChange } = this.props;
    const oldValues = races.map(race => Math.floor(raceTime(kph, race.distance)));

    const [, val, race] = _.find(_.zip(oldValues, value, races),
      ([oldVal, val]) => oldVal !== val);

    onChange.call(null, raceSpeed(val, race.distance));
  }
  render() {
    const { kph, races, max } = this.props;
    const markData = _(races)
      .map(race => ({
        label: `${race.label}\n${secToTime(raceTime(kph, race.distance))}`,
      }))
      .value();

    const values = races.map(race => Math.floor(raceTime(kph, race.distance)));

    const marks = _.zipObject(values, markData);

    return (
     <Range
       className={'slider'}
       value={values}
       onChange={value => this.handleChange(value)}
       marks={marks}
       max={max}
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
