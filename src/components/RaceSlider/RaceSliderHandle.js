/* eslint
  no-unused-vars: 0
*/

import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

import './RaceSliderHandle.css';

export default class RaceSliderHandle extends React.Component {
  render() {
    const {
      vertical,
      offset,
      minimumTrackTintColor,
      disabled,
      labelUp,
      labelDown,
      inline,
      dragging,
      ...restProps,
    } = this.props;
    const style = vertical ? { bottom: `${offset}%` } : { left: `${offset}%` };
    if (minimumTrackTintColor && !disabled) {
      style.borderColor = minimumTrackTintColor;
    }
    const rightSide = offset < 50;
    const handleClass = classNames('slider-handle', { inline, 'right-side': rightSide });

    const labels = (
      <div className='labels' key='labels'>
        <div className='label-up'>{labelUp}</div>
        <div className='label-down'>{labelDown}</div>
      </div>
    );
    const mark = <div className='mark' key='mark'></div>;

    const handleElements = [labels, mark];

    return (
      <div {...restProps} className={handleClass} style={style}>
        {rightSide
          ? handleElements.reverse()
          : handleElements
        }
      </div>
    );
  }
}
