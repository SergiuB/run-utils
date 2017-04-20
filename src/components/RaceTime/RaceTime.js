import React from 'react';
import PropTypes from 'prop-types';
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
        value={moment(secToTime(raceTime(kph, km), showHour), 'HH:mm:ss')}
        onChange={(val) => onChange(raceSpeed(timeToSec(val.format('HH:mm:ss')), km))}
      />
    );
  }
}

RaceTime.propTypes = {
  showHour: PropTypes.bool,
  kph: PropTypes.number.isRequired,
  km: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

RaceTime.defaultProps = {
  showHour: true,
  onChange: () => {},
}
