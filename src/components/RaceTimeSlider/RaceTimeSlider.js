import React from 'react';
import Slider from 'rc-slider';

import _ from 'lodash';
import R from 'ramda';
import classNames from 'classnames';
import {
  secToTime,
  minToTime,
  kphToMinKm,
  timeToSec,
} from '../../services/conversion';
import { raceTime, raceSpeed } from '../../services/raceCalculator';

import RaceTimeHandle from './RaceTimeHandle';

import 'rc-slider/assets/index.css';
import './RaceSlider.css';

export default class RaceTimeSlider extends React.Component {
  handleChange(value) {
    const { race, onChange, minKph, maxKph } = this.props;

    const newSpeed = raceSpeed(value, race.distance);

    // Don't fire onChange if speed is below or above limits
    if (newSpeed > minKph && newSpeed < maxKph) {
      onChange.call(null, newSpeed);
    }
  }
  getValue() {
    return raceTime(this.props.kph, this.props.race.distance);
  }
  incValue() {
    this.handleChange(this.getValue() + 1);
  }
  decValue() {
    this.handleChange(this.getValue() - 1);
  }
  render() {
    const { kph, paceDelta, race, minKph, maxKph, inline, showPace, selected } = this.props;
    const value = Math.floor(raceTime(kph, race.distance));

    const maxSec = Math.floor((race.distance / minKph) * 3600);
    const minSec = Math.floor((race.distance / maxKph) * 3600);

    const sliderClass = classNames('slider', { inline, selected });
    return (
      <div className={sliderClass}>
        <button type='button' className='change-btn' onClick={() => this.decValue()}>&lt;</button>
        <Slider
          value={value}
          onChange={value => this.handleChange(value)}
          min={minSec}
          max={maxSec}
          handle={props => (
            <RaceTimeHandle
              key={props.index}
              labelUp={race.label}
              labelDown={secToTime(raceTime(kph, race.distance))}
              inline={inline}
              {...props}
              />
          )}
          />
        <button type='button' className='change-btn' onClick={() => this.incValue()}>&gt;</button>
        {showPace && (
          <div className={'right-label'}>
            <div className='pace'>{minToTime(kphToMinKm(kph))}/km</div>
            {!selected && <div className='pace-delta'>{paceDelta > 0 ? '+': '-'}{timeToSec(minToTime(Math.abs(paceDelta)))}s</div>}
          </div>
        )}
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
