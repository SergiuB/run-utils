import React from 'react';
import {
  kphToMinKm,
  minToTime,
  timeToMin,
  minKmToKph,
} from '../../services/conversion';

export default function SpeedConversion({ kph, onChange}) {
  return (
    <div>
      <input
        type="number"
        value={kph}
        onChange={(event) => onChange(event.target.value)}
      />
      <input
        type="text"
        value={minToTime(kphToMinKm(kph))}
        onChange={(event) => onChange(minKmToKph(timeToMin(event.target.value)))}
      />
    </div>
  );
}

SpeedConversion.propTypes = {
  kph: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

SpeedConversion.defaultProps = {
  kph: 10,
  onChange: () => {},
}
