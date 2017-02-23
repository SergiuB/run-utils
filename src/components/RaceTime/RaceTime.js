import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import {
  secToTime,
  timeToSec,
} from '../../services/conversion';

import { raceTime, raceSpeed } from '../../services/raceCalculator';

import 'rc-time-picker/assets/index.css';

export default class RaceTime extends React.Component {
  render() {
    const { kph, km, onChange, showHour} = this.props;
    return (
      <TimePicker
        showHour={showHour}
        value={moment(secToTime(raceTime(kph, km)), 'HH:mm:ss')}
        onChange={(val) => onChange(raceSpeed(timeToSec(val.format('HH:mm:ss')), km))}
      />
    );
  }
}

RaceTime.propTypes = {
  showHour: React.PropTypes.bool,
  kph: React.PropTypes.number.isRequired,
  km: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func,
};

RaceTime.defaultProps = {
  showHour: true,
  onChange: () => {},
}
