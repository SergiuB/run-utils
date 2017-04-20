import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'material-ui/Slider';

import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { pinkA200 } from 'material-ui/styles/colors';

import classNames from 'classnames';
import {
  secToTime,
  minToTime,
  timeToSec,
} from '../../services/conversion';
import { racePace, racePaceMile } from '../../services/raceCalculator';

import 'rc-slider/assets/index.css';
import './RaceSlider.css';

function wrapWithCustomThemeIf(cond, theme, element) {
  return cond
    ? (
      <MuiThemeProvider muiTheme={theme}>
        {element}
      </MuiThemeProvider>
      )
    : element;
}

const selectedSliderTheme = getMuiTheme({
  palette: {
    primary1Color: pinkA200,
  },
});

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
  addSeconds(sec) {
    this.handleChange(this.getValue() + sec);
  }
  render() {
    const { paceDelta, race, seconds, minSec, maxSec, inline, showPace, selected, metric } = this.props;

    const sliderClass = classNames('slider', { inline, selected });

    const buttonStyle = {
      height: 30, lineHeight: '30px', minWidth: 50
    };

    return (
      <div>
        {selected && <div className='adjustments'>
          {[-5, -1, 1, 5].map(val => (
            <RaisedButton key={val} style={buttonStyle} label={`${val > 0 ? '+' : ''}${val}s`} onClick={() => this.addSeconds(val)} />
          ))}
        </div>}
        <div className={sliderClass}>
          <div className={'left-label'}>
            <div className='race-name mui--text-body2'>{race.label}</div>
            <div className='race-time'>{secToTime(seconds)}</div>
          </div>

          {wrapWithCustomThemeIf(selected, selectedSliderTheme,
            <Slider
              className='material-slider'
              value={seconds}
              onChange={(_, value) => this.handleChange(value)}
              min={minSec - 1}
              max={maxSec + 1}
              step={1}
              />
          )}

          {showPace && (
            <div className={'right-label'}>
              <div className='pace'>{metric ? minToTime(racePace(seconds, race.distance)) : minToTime(racePaceMile(seconds, race.distance))}/{metric ? 'km' : 'mile'}</div>
              <div className='pace-delta mui--text-dark-secondary'>{paceDelta > 0 ? '+' : '-'}{timeToSec(minToTime(Math.abs(paceDelta)))}s</div>
            </div>
          )}
        </div>
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
