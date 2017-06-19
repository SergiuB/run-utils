import React, { Component } from 'react';
import { connect } from 'react-redux';
import { branch, renderNothing } from 'recompose';
import R from 'ramda';

import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';

import VdotChart from '../VdotChart';
import GoalPerfomanceTable from '../GoalPerformanceTable';

import core from 'modules/core';
const { getVdot } = core.services.vdotCalculator;

import * as actions from '../../actions';

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
      changeGoalPerformanceTime,
    } = this.props;
    
    const selectedRaces = races.filter(({ id }) => selectedRaceIds.includes(id));
    
    return (
      <div className='race-prediction-page'>
        <VdotChart
          races={selectedRaces}
          goalPerformances={goalPerformances}
        />
        <Tabs>
          <Tab label="Past Races" >
            <RaceTable
              races={races}
              selectedRaceIds={selectedRaceIds}
              selectRace={selectRace}
              deselectRace={deselectRace}
            />
          </Tab>
          <Tab label="Future Goals" >
            <GoalPerfomanceTable
              goalPerformances={goalPerformances}
              onAddGoalPerformance={addGoalPerformance}
              onRemoveGoalPerformance={removeGoalPerformance}
              onChangeGoalPerformanceRace={changeGoalPerformanceRace}
              onChangeGoalPerformanceTime={changeGoalPerformanceTime}
            />
          </Tab>
        </Tabs>
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
