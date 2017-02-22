import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import {
  secToTime,
  minKmToKph,
  timeToMin,
} from '../../services/conversion';

import { raceTime } from '../../services/raceCalculator';

import 'rc-time-picker/assets/index.css';

export default class RaceTime extends React.Component {
  render() {
    const { kph, km, onChange} = this.props;
    return (
      <TimePicker
        value={moment(secToTime(raceTime(kph, km)), 'HH:mm:ss')}
        onChange={(val) => onChange(minKmToKph(timeToMin(val.format('mm:ss'))))}
      />
    );
  }
}

RaceTime.propTypes = {
  kph: React.PropTypes.number.isRequired,
  km: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
};

RaceTime.defaultProps = {
  onChange: () => {},
}
