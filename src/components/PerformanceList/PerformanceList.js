
import React, { Component } from 'react';
import R from 'ramda';
import classNames from 'classnames';

import Ripple from '../Ripple';

import { secToTime } from '../../services/conversion';

import './PerformanceList.css';

const getVdot = (performance) => (performance.vdot + performance.percentage);

const isSamePerformanceAs = (p1, p2) => getVdot(p1) === getVdot(p2);

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
    const { performanceData, onClick, selected } = this.props;
    const { selectedRace, performance } = performanceData;

    return (
      <div
        className={classNames('performance-list-item', 'Ripple-parent', { selected })}
        onMouseUp={this.handleClick.bind(this)}
        onTouchEnd={this.handleClick.bind(this)}
        onClick={() => onClick(performanceData)}
        >
        <span className="mui--text-body2">{getVdot(performance).toFixed(1)}</span>
        <span >{selectedRace.label}</span>
        <span className="mui--text-caption">{secToTime(performance.equivalents[selectedRace.label])}</span>

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
        R.map((p) => <PerformanceItem
          key={`${p.selectedRace.label}-${getVdot(p.performance)}`}
          performanceData={p}
          onClick={onItemClick}
          selected={isSamePerformanceAs(selectedPerformance, p.performance)}
          />
        ),
        R.sort(R.descend(p => getVdot(p.performance)))
      )(performances)}
    </div>;
  }
}

export default PerformanceList;