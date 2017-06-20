import React, { Component } from 'react';
import moment from 'moment';
import R from 'ramda';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';
import IconButton from 'material-ui/IconButton';
import { grey400 } from 'material-ui/styles/colors';

import AddFutureGoalDialog from '../AddFutureGoalDialog';

import 'rc-time-picker/assets/index.css';
import './GoalPerformanceTable.css';

import core from 'modules/core';
const { secToTime } = core.services.conversion;
const { getVdot } = core.services.vdotCalculator;
const oneDecimal = number => Number.parseFloat(number.toFixed(1), 10);
const formatMonth = date => moment(date).format('MMM YYYY');

const TableHeader = ({ label }) => (
  <div className='column mui--text-caption' style={{ color: grey400 }}>{label}</div>
)

const addVdot = (performance) => ({
  ...performance,
  vdot: getVdot(performance.race, performance.time)
});

const addEta = prediction => (performance) => {
  if (!prediction || !prediction.length) {
    return { ...performance, eta: { message: 'Unknown'}};
  }
  const day = R.find(({ val }) => val >= performance.vdot )(prediction);
  if (day) {
    return { ...performance, eta: { date: day.date } };
  } else {
    const maxVdot = R.compose(
      R.reduce(R.max, 0),
      R.map(R.prop('val'))
    )(prediction);
    
    const lastPrediction = R.last(prediction);
    if (lastPrediction.val === maxVdot) {
      return { ...performance, eta: { message: `Maybe after ${formatMonth(lastPrediction.date)}` }}
    } else {
      return { ...performance, eta: { message: `Never` }}
    }
  }
}

class GoalPerfomanceTable extends Component {
  render() {
    const {
      goalPerformances,
      prediction,
      addingGoalPerformance,
      startAddingGoalPerformance,
      cancelAddingGoalPerformance,
      addGoalPerformance,
      removeGoalPerformance,
    } = this.props;


    const toGoalPerformanceRow = ({ id, race, time, vdot, eta }) => (
      <div className='goal-performance' key={id}>
        <div className='column'>{race.label}</div>
        <div className='column'>{secToTime(time)}</div>
        <div className='column'>{oneDecimal(vdot)}</div>
        <div className='column'>{eta.date ? formatMonth(eta.date) : eta.message}</div>
        <div className='button-column'>
          <IconButton
            onTouchTap={() => removeGoalPerformance(id)}
            style={{
              width: 36,
              height: 36,
            }}
          >
            <ContentRemove />
          </IconButton>
        </div>
      </div>
    )

    const goalPerformanceRows = R.compose(
      R.map(toGoalPerformanceRow),
      R.sortBy(R.prop('vdot')),
      R.map(addEta(prediction)),
      R.map(addVdot),
    )(goalPerformances);

    return (
        <div className='goal-performances'>
          {goalPerformanceRows.length 
            ? <div className='goal-performance-table'>
                <div className='goal-performance headers'>
                  <TableHeader label='Event' />
                  <TableHeader label='Time' />
                  <TableHeader label='VDOT' />
                  <TableHeader label='When (est)' />
                </div>
                {goalPerformanceRows}
              </div>
            : (!addingGoalPerformance && <div className='info mui--text-subhead no-goals'>
                <p>
                {'No future goals added yet. Tell the genie your wishes.'}
                </p>
              </div>)
          }
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
        </div>
      );
  }
}

export default GoalPerfomanceTable;