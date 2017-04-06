import React from 'react';
import Slider from 'rc-slider';

import _ from 'lodash';
import R from 'ramda';
import moment from 'moment';
import classNames from 'classnames';
import {
  secToTime,
  minToTime,
  kphToMinKm,
} from '../../services/conversion';
import { raceTime, raceSpeed } from '../../services/raceCalculator';

import 'rc-slider/assets/index.css';
import './style.css';

const Range = Slider.Range;

class Handle extends React.Component {
  render() {
    const {
      className,
      vertical,
      offset,
      minimumTrackTintColor,
      disabled,
      labelUp,
      labelDown,
      dragging,
      index,
      inline,
      ...restProps,
    } = this.props;
    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    if (minimumTrackTintColor && !disabled) {
      style.borderColor = minimumTrackTintColor;
    }

    const handleClass = classNames('slider-handle', { inline });

    return (
      <div {...restProps} className={handleClass} style={style}>
        <div className='slider-handle-label-up'>{labelUp}</div>
        <div className='slider-handle-mark'></div>
        <div className='slider-handle-label-down'>{labelDown}</div>
      </div>
    );
  }
}

export default class RaceTimeSlider extends React.Component {
  handleChange(value) {
    const { kph, races, onChange, minKph, maxKph } = this.props;
    const oldValues = races.map(race => Math.floor(raceTime(kph, race.distance)));

    const [, val, race] = _.find(_.zip(oldValues, value, races),
      ([oldVal, val]) => oldVal !== val);

    const newSpeed = raceSpeed(val, race.distance);

    // Don't fire onChange if speed is below or above limits
    if (newSpeed > minKph && newSpeed < maxKph) {
      onChange.call(null, newSpeed);
    }
  }
  render() {
    const { kph, races, minKph, inline, showPace } = this.props;
    const values = races.map(race => Math.floor(raceTime(kph, race.distance)));

    const getMaxDistance = R.compose(R.prop('distance'), R.reduce(R.maxBy(R.prop('distance')), { distance: 0 }));
    const maxSec = Math.floor((getMaxDistance(races) / minKph) * 3600);

    const sliderClass = classNames('slider', { inline });
    return (
      <div className={sliderClass}>
        <Range
          value={values}
          onChange={value => this.handleChange(value)}
          max={maxSec}
          handle={props => {
            const race = races[props.index];
            return (
              <Handle
                key={props.index}
                labelUp={race.label}
                labelDown={secToTime(raceTime(kph, race.distance))}
                inline={inline}
                {...props}
                />
            );
          }}
          />
        {showPace && <div className={'right-label'}>{minToTime(kphToMinKm(kph), false)}</div>}
      </div>
    );
  }
}

RaceTimeSlider.propTypes = {
  kph: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

RaceTimeSlider.defaultProps = {
  kph: 10,
  onChange: () => { },
}
