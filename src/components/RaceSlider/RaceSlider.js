import React, { PropTypes } from 'react';
import Slider from 'material-ui/Slider';

import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import { pinkA200 } from 'material-ui/styles/colors'

import classNames from 'classnames';
import {
  secToTime,
  minToTime,
  timeToSec,
} from '../../services/conversion';
import { racePace, racePaceMile } from '../../services/raceCalculator';

import 'rc-slider/assets/index.css';
import './RaceSlider.css';

export default class RaceSlider extends React.Component {
  handleChange(value) {
    const { onChange, minSec, maxSec } = this.props;

    // Don't fire onChange if speed is below or above limits
    if (value > minSec && value < maxSec) {
      onChange.call(null, value);
    }
  }
  getValue() {
    return this.props.seconds;
  }
  incValue() {
    this.handleChange(this.getValue() + 1);
  }
  decValue() {
    this.handleChange(this.getValue() - 1);
  }
  render() {
    const { paceDelta, race, seconds, minSec, maxSec, inline, showPace, selected, metric } = this.props;

    const sliderClass = classNames('slider', { inline, selected });

    const iconStyle = {
      color: pinkA200
    };
              
    return (
      <div className={sliderClass}>
        <div className={'left-label'}>
          <div className='race-name'>{race.label}</div>
          <div className='race-time'>{secToTime(seconds)}</div>
        </div>
        <IconButton iconStyle={selected ? iconStyle : {}} className='change-btn' onClick={() => this.decValue()} style={{ padding: 0 }}>
          <NavigationChevronLeft />
        </IconButton>
        <Slider
          className='material-slider'
          value={seconds}
          onChange={(_,value) => this.handleChange(value)}
          min={minSec-1}
          max={maxSec+1}
          />
        <IconButton iconStyle={selected ? iconStyle : {}} className='change-btn right' onClick={() => this.incValue()}>
          <NavigationChevronRight />
        </IconButton>
        {showPace && (
          <div className={'right-label'}>
            <div className='pace'>{metric ? minToTime(racePace(seconds, race.distance)) : minToTime(racePaceMile(seconds, race.distance))}/{metric ? 'km' : 'mile'}</div>
            <div className='pace-delta'>{paceDelta > 0 ? '+': '-'}{timeToSec(minToTime(Math.abs(paceDelta)))}s</div>
          </div>
        )}
      </div>
    );
  }
}

RaceSlider.propTypes = {
  seconds: PropTypes.number.isRequired,
  race: PropTypes.shape({
    label: PropTypes.string,
    distance: PropTypes.number
  }),
  onChange: PropTypes.func.isRequired,
};
