
import React, { Component } from 'react';
import R from 'ramda';
import classNames from 'classnames';

import Ripple from '../Ripple';

import { secToTime } from '../../services/conversion';

import './PerformanceList.css';

const isSamePerformanceAs = (p1, p2) => p1.vdot === p2.vdot;

class PerformanceItem extends Component {
  state = {
    cursorPos: {}
  };

  handleClick(e){
    // Get Cursor Position
    let cursorPos = {
      top: e.clientY,
      left: e.clientX,
      // Prevent Component duplicates do ripple effect at the same time
      time: Date.now()
    };
    this.setState({ cursorPos: cursorPos });
  }

  render() {
    const { performance, onClick, selected } = this.props;

    return (
      <div
        className={classNames('performance-list-item', 'Ripple-parent', { selected })}
        onMouseUp={this.handleClick.bind(this)}
        onTouchEnd={this.handleClick.bind(this)}
        onClick={() => onClick(performance)}
        >
        <span className="mui--text-body2">{performance.vdot.toFixed(1)}</span>
        <span >{performance.race.label}</span>
        <span className="mui--text-caption">{secToTime(performance.time)}</span>

        <Ripple cursorPos={this.state.cursorPos} />
      </div>
    );
  }
};


class PerformanceList extends Component {
  render() {
    const { performances, onItemClick, selectedPerformance } = this.props;
    return <div className={'performance-list'}>
      {R.compose(
        R.map(performance => <PerformanceItem
          key={`${performance.race.label}-${performance.vdot}`}
          performance={performance}
          onClick={() => onItemClick(performance)}
          selected={isSamePerformanceAs(selectedPerformance, performance)}
          />
        ),
        R.sort(R.descend(p => p.vdot))
      )(performances)}
    </div>;
  }
}

export default PerformanceList;