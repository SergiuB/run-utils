
import React, { Component } from 'react';
import R from 'ramda';
import classNames from 'classnames';

import { secToTime } from '../../services/conversion';

import './PerformanceChipList.css';

const getVdot = (performance) => (performance.vdot + performance.percentage);

const isSamePerformanceAs = (p1, p2) => getVdot(p1) === getVdot(p2);

const PerformanceItem = ({ performanceData, onClick, selected }) => {
  const { selectedRace, performance } = performanceData;

  return (
    <div
      className={classNames('performance-list-item', { selected })}
      onClick={() => onClick(performanceData)}
      >
      <span className="mui--text-body2">{getVdot(performance).toFixed(1)}</span>
      <span >{selectedRace.label}</span>
      <span className="mui--text-caption">{secToTime(performance.equivalents[selectedRace.label])}</span>
    </div>
  );
};


class PerformanceChipList extends Component {
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

export default PerformanceChipList;