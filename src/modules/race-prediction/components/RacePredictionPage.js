import React, { Component } from 'react';
import { connect } from 'react-redux';
import { branch, renderNothing } from 'recompose';
import R from 'ramda';

import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove-circle-outline';
import IconButton from 'material-ui/IconButton';

import VdotChart from './VdotChart';

import core from 'modules/core';
const { getVdot } = core.services.vdotCalculator;
const { allRacesObj } = core.constants;

import * as actions from '../actions';

import './RacePredictionPage.css';

class RaceTable extends Component {
  isSelected(raceId) {
    return this.props.selectedRaceIds.includes(raceId);
  }
  render() {
    const { races, selectedRaceIds, selectRace, deselectRace } = this.props;
    return (
        <div className='race-table'>
          {races.map(({ id, name }) => (
              <Toggle key={id} label={name} toggled={this.isSelected(id)}
                onToggle={(event, tState) => tState ? selectRace(id): deselectRace(id)}
              />
          ))}
        </div>
      );
  }
}

class GoalPerfomanceTable extends Component {
  render() {
    const {
      goalPerformances,
      onAddGoalPerformance,
      onRemoveGoalPerformance,
      onChangeGoalPerformanceRace,
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
                >
                  {mapValues(r => (
                    <MenuItem key={r.label} value={r.label} primaryText={r.label} />
                  ), allRacesObj)}
                </SelectField>
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


const toVdotActivity = race => ({
  vdot: getVdot(race.distance / 1000, race.moving_time),
  distance: race.distance / 1000,
  time: race.moving_time,
  name: race.name,
  id: race.id,
  date: new Date(race.start_date_local),
});


class RacePredictionPage extends Component {
  
  componentWillMount() {
    const { userData, fetchRaces } = this.props;
    fetchRaces(userData.uid);
  }

  render() {
    const {
      races,
      selectedRaceIds,
      selectRace,
      deselectRace,
      goalPerformances,
      addGoalPerformance,
      removeGoalPerformance,
      changeGoalPerformanceRace,
    } = this.props;
    
    const selectedRaces = races.filter(({ id }) => selectedRaceIds.includes(id));
    
    return (
      <div className='race-prediction-page'>
        <VdotChart
          races={selectedRaces}
          goalPerformances={goalPerformances}
        />
        <RaceTable
          races={races}
          selectedRaceIds={selectedRaceIds}
          selectRace={selectRace}
          deselectRace={deselectRace}
        />
        <GoalPerfomanceTable
          goalPerformances={goalPerformances}
          onAddGoalPerformance={addGoalPerformance}
          onRemoveGoalPerformance={removeGoalPerformance}
          onChangeGoalPerformanceRace={changeGoalPerformanceRace}
        />
      </div>
    );
    // return <div>
    //   {races.map(race => <div key={race.id}>{race.name} - {getVdot(race.distance / 1000, race.moving_time)} - {new Date(race.start_date_local).toString()}</div>)}
    // </div>;
  }
}

const processRaces = R.compose(
  R.sortBy(R.prop('date')),
  R.map(toVdotActivity)
)

const mapStateToProps = (state) => ({
  userData: state.app.userData,
  ...state.racePrediction,
  races: processRaces(state.racePrediction.races)
});

const hideIfNoUser = branch(
  props => !(props.userData),
  renderNothing
)

const enhance = R.compose(
  connect(
    mapStateToProps,
    actions,
  ),
  hideIfNoUser,
);

export default enhance(RacePredictionPage);
