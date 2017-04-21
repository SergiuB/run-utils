
import React, { Component } from 'react';

import { secToTime } from '../../services/conversion';

import './PerformanceChipList.css';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement(({ value }) => {
  const { selectedRace, performance } = value;
  const getVdot = (performance) => (performance.vdot + performance.percentage);

  return (
    <div
      className={'performance-list-item'}
      onClick={() => console.log('item clicked')}
      >
      <span className="mui--text-body2">{getVdot(performance).toFixed(1)}</span>
      <span >{selectedRace.label}</span>
      <span className="mui--text-caption">{secToTime(performance.equivalents[selectedRace.label])}</span>
    </div>
  );
});

const SortableList = SortableContainer(({
  items,
  itemClass,
}) => {
  return (
    <div className={'performance-list'}>
      {items.map((performance, index) => (
        <SortableItem key={`item-${index}`} index={index} value={performance}
          className={itemClass}
          height={100}
          />
      ))}
    </div>
  );
});

class PerformanceChipList extends Component {
  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.onOrderChanged(arrayMove(this.props.performances, oldIndex, newIndex));
  };
  render() {
    const { performances } = this.props;
    return <SortableList
      items={performances}
      onSortEnd={this.onSortEnd}
      pressDelay={200}
      axis={'x'}
      lockAxis={'x'}
      helperClass={'performance-list-helper'}
    />;
  }
}

export default PerformanceChipList;