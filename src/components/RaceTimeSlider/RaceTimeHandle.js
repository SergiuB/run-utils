import React from 'react';
import _ from 'lodash';
import R from 'ramda';
import classNames from 'classnames';

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

    const handleClass = classNames('slider-handle', { inline });

    return (
      <div {...restProps} className={handleClass} style={style}>
        <div className='labels'>
          <div className='slider-handle-label-up'>{labelUp}</div>
          <div className='slider-handle-label-down'>{labelDown}</div>
        </div>
        <div className='slider-handle-mark'></div>
      </div>
    );
  }
}
