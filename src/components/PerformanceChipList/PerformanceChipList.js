import React, { Component } from 'react';
import Chip from 'material-ui/Chip';

import { secToTime } from '../../services/conversion';

import './PerformanceChipList.css';

class PerformanceChipList extends Component {

  getVdot = (performance) => (performance.vdot + performance.percentage);

  shortenLabel = (label) => {
    const shortLabels = { 'Marathon': 'M', 'Half': 'H', 'Mile': '1M' };
    return shortLabels[label] ? shortLabels[label] : label;
  }

  render() {
    const { performances } = this.props;
    return (
      <div className='chip-list'>
        {performances.map(({ selectedRace, performance }) => (
          <Chip
            key={this.getVdot(performance)}
            onRequestDelete={() => {}}
            onTouchTap={() => {}}
          >
            <span className="mui--text-body2">{this.getVdot(performance).toFixed(1)}</span>
            <span >{this.shortenLabel(selectedRace.label)}</span>
            <span className="mui--text-caption">{secToTime(performance.equivalents[selectedRace.label])}</span>
          </Chip>
        ))}
      </div>
    );
  }
}

export default PerformanceChipList;