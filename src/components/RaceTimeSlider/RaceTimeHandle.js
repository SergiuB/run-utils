import React from 'react';
import _ from 'lodash';
import R from 'ramda';
import classNames from 'classnames';

import './RaceSliderHandle.css';

export default class RaceTimeHandle extends React.Component {
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
    const rightSide = offset < 50;
    const handleClass = classNames('slider-handle', { inline, 'right-side': rightSide });

    const labels = (
      <div className='labels' key='labels'>
        <div className='slider-handle-label-up'>{labelUp}</div>
        <div className='slider-handle-label-down'>{labelDown}</div>
      </div>
    );
    const mark = <div className='slider-handle-mark' key='mark'></div>;

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
