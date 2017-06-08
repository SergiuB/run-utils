import React, { Component } from 'react';
import R from 'ramda';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';

import { pinkA200 } from 'material-ui/styles/colors';

import core from '../../../core';
const { Ripple } = core.components;
const  { secToTime } = core.services.conversion;

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
    const { performance, onClick, onRemove, selected } = this.props;

    return (
      <div className='performance-list-item-wrapper'>
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
        {selected && 
          <IconButton
              className='remove-btn' 
              iconStyle={{ color: pinkA200 }}
              onTouchTap={() => onRemove(performance)}
          >
            <ContentRemove />
          </IconButton>
        }
      </div>
    );
  }
};


class PerformanceList extends Component {
  render() {
    const { performances, onItemClick, onItemRemove, selectedPerformance } = this.props;
    return <div className={'performance-list'}>
      {R.compose(
        R.map(performance => <PerformanceItem
          key={`${performance.race.label}-${performance.vdot}`}
          performance={performance}
          onClick={() => onItemClick(performance)}
          onRemove={() => onItemRemove(performance)}
          selected={isSamePerformanceAs(selectedPerformance, performance)}
          />
        ),
        R.sort(R.descend(p => p.vdot))
      )(performances)}
    </div>;
  }
}

export default PerformanceList;