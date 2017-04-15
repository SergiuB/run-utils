import React from 'react';
import Slider from 'material-ui/Slider';

import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { pinkA200 } from 'material-ui/styles/colors'

import classNames from 'classnames';
import {
  secToTime,
  minToTime,
  kphToMinKm,
  timeToSec,
  minKmToMinMile,
} from '../../services/conversion';
import { raceTime, raceSpeed } from '../../services/raceCalculator';

import 'rc-slider/assets/index.css';
import './RaceSlider.css';

export default class RaceSlider extends React.Component {
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
    const { kph, paceDelta, race, minKph, maxKph, inline, showPace, selected, metric } = this.props;
    const value = Math.floor(raceTime(kph, race.distance));

    const maxSec = Math.floor((race.distance / minKph) * 3600);
    const minSec = Math.floor((race.distance / maxKph) * 3600);

    const sliderClass = classNames('slider', { inline, selected });

    const iconStyle = {
      color: pinkA200
    };
              
    return (
      <div className={sliderClass}>
        <div className={'left-label'}>
          <div className='race-name'>{race.label}</div>
          <div className='race-time'>{secToTime(raceTime(kph, race.distance))}</div>
        </div>
        <IconButton iconStyle={selected ? iconStyle : {}} className='change-btn' onClick={() => this.decValue()} style={{ padding: 0 }}>
          <NavigationChevronLeft />
        </IconButton>
        <Slider
          className='material-slider'
          value={value}
          onChange={(_,value) => this.handleChange(value)}
          min={minSec-1}
          max={maxSec+1}
          />
        <IconButton iconStyle={selected ? iconStyle : {}} className='change-btn right' onClick={() => this.incValue()}>
          <NavigationChevronRight />
        </IconButton>
        {showPace && (
          <div className={'right-label'}>
            <div className='pace'>{metric ? minToTime(kphToMinKm(kph)) : minToTime(minKmToMinMile(kphToMinKm(kph)))}/{metric ? 'km' : 'mile'}</div>
            <div className='pace-delta'>{paceDelta > 0 ? '+': '-'}{timeToSec(minToTime(Math.abs(paceDelta)))}s</div>
          </div>
        )}
      </div>
    );
  }
}

RaceSlider.propTypes = {
  kph: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

RaceSlider.defaultProps = {
  kph: 10,
  onChange: () => { },
}
