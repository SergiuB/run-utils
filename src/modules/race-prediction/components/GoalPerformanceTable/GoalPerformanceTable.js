import React, { Component } from 'react';
import moment from 'moment';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';
import IconButton from 'material-ui/IconButton';

import AddFutureGoalDialog from '../AddFutureGoalDialog';

import 'rc-time-picker/assets/index.css';
import './GoalPerformanceTable.css';


import core from 'modules/core';
const { secToTime } = core.services.conversion;

class GoalPerfomanceTable extends Component {
  render() {
    const {
      goalPerformances,
      addingGoalPerformance,
      startAddingGoalPerformance,
      cancelAddingGoalPerformance,
      addGoalPerformance,
      removeGoalPerformance,
    } = this.props;
    return (
        <div className='goal-performance-table'>
          {addingGoalPerformance
            ? (
              <AddFutureGoalDialog
                onOk={addGoalPerformance}
                onCancel={cancelAddingGoalPerformance}
              />
            )
            : (
              <FloatingActionButton mini={true} onTouchTap={startAddingGoalPerformance}>
                <ContentAdd />
              </FloatingActionButton>  
            )
          }
          {goalPerformances.map(({ id, race, time }) => (
              <div className='goal-performance' key={id}>
                <div className='column'>{race.label}</div>
                <div className='column'>{secToTime(time)}</div>
                <IconButton
                  className='column'
                  onTouchTap={() => removeGoalPerformance(id)}
                >
                  <ContentRemove />
                </IconButton>
              </div>
          ))}
        </div>
      );
  }
}

export default GoalPerfomanceTable;


                
                // <SelectField
                //   value={race.label}
                //   onChange={(ev, idx, raceLabel) => onChangeGoalPerformanceRace(id, allRacesObj[raceLabel])}
                //   style={{ width: 100 }}
                // >
                //   {mapValues(r => (
                //     <MenuItem key={r.label} value={r.label} primaryText={r.label} />
                //   ), allRacesObj)}
                // </SelectField>
                // <TimePicker
                //   value={secToMoment(time)}
                //   format={format}
                //   onChange={value => this.handleTimeChange(id, value)}
                //   className='goal-time-picker'
                // />