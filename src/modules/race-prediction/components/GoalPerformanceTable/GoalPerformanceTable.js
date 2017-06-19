import React, { Component } from 'react';
import R from 'ramda';
import moment from 'moment';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';
import IconButton from 'material-ui/IconButton';
import TimePicker from 'rc-time-picker';

import 'rc-time-picker/assets/index.css';
import './GoalPerformanceTable.css';

const format = 'h:mm:ss';

import core from 'modules/core';
const { allRacesObj } = core.constants;
const { secToTime, timeToSec } = core.services.conversion;

const secToMoment = sec => {
  const time = secToTime(sec, true);
  const [h, m, s] = time.split(':').map(s => Number.parseInt(s, 10));
  return moment().hour(h).minute(m).second(s);
}

const momentToSec = m => {
  return timeToSec(`${m.hour()}:${m.minute()}:${m.second()}`);
}

class GoalPerfomanceTable extends Component {
  render() {
    const {
      goalPerformances,
      onAddGoalPerformance,
      onRemoveGoalPerformance,
      onChangeGoalPerformanceRace,
      onChangeGoalPerformanceTime,
    } = this.props;
    const mapValues = R.compose(
      R.values,
      R.map,
    );
    return (
        <div className='goal-performance-table'>
          {goalPerformances.map(({ id, race, time }) => (
              <div className='goal-performance' key={id}>
                <SelectField
                  value={race.label}
                  onChange={(ev, idx, raceLabel) => onChangeGoalPerformanceRace(id, allRacesObj[raceLabel])}
                  style={{ width: 100 }}
                >
                  {mapValues(r => (
                    <MenuItem key={r.label} value={r.label} primaryText={r.label} />
                  ), allRacesObj)}
                </SelectField>
                <TimePicker
                  value={secToMoment(time)}
                  format={format}
                  onChange={value => onChangeGoalPerformanceTime(id, momentToSec(value))}
                  className='goal-time-picker'
                />
                <IconButton
                    onTouchTap={() => onRemoveGoalPerformance(id)}
                >
                  <ContentRemove />
                </IconButton>
              </div>
          ))}
          <FloatingActionButton mini={true} onTouchTap={() => onAddGoalPerformance()}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      );
  }
}

export default GoalPerfomanceTable;