import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import {
  secToTime,
} from '../../services/conversion';

import { raceTime } from '../../services/raceCalculator';

import 'rc-time-picker/assets/index.css';

export default class RaceTime extends React.Component {
  render() {
    const { kph, km} = this.props;
    return (
      <TimePicker
        value={moment(secToTime(raceTime(kph, km)), 'HH:mm:ss')}
      />
    );
  }
}

RaceTime.propTypes = {
  kph: React.PropTypes.number.isRequired,
  km: React.PropTypes.number.isRequired,
};
