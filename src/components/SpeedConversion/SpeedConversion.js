import React from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import {
  kphToMinKm,
  minToTime,
  timeToMin,
  minKmToKph,
  minKmToMinMile,
  minMileToMinKm,
} from '../../services/conversion';

import 'rc-time-picker/assets/index.css';

export default class SpeedConversion extends React.Component {
  render() {
    const { kph, onChange} = this.props;
    return (
      <div>
        <input
          className="kph"
          type="number"
          value={kph}
          onChange={(event) => onChange(event.target.value)}
        />
        <TimePicker
          className="minKm"
          showHour={false}
          value={moment(minToTime(kphToMinKm(kph)), 'HH:mm:ss')}
          onChange={(val) => onChange(minKmToKph(timeToMin(val.format('mm:ss'))))}
        />,
        <TimePicker
          className="minMile"
          showHour={false}
          value={moment(minToTime(minKmToMinMile(kphToMinKm(kph))), 'HH:mm:ss')}
          onChange={(val) => onChange(minKmToKph(minMileToMinKm(timeToMin(val.format('mm:ss')))))}
        />
      </div>
    );
  }
}

SpeedConversion.propTypes = {
  kph: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

SpeedConversion.defaultProps = {
  kph: 10,
  onChange: () => {},
}
