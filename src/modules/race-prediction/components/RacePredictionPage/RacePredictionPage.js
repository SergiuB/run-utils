import React, { Component } from 'react';
import { connect } from 'react-redux';
import { branch, renderNothing } from 'recompose';
import R from 'ramda';
import moment from 'moment';

import Toggle from 'material-ui/Toggle';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import VdotChart from '../VdotChart';
import GoalPerfomanceTable from '../GoalPerformanceTable';

import core from 'modules/core';
const { getVdot } = core.services.vdotCalculator;

import * as actions from '../../actions';
import { forecast } from '../../services';

import './RacePredictionPage.css';

class RaceTable extends Component {
  isSelected(raceId) {
    return this.props.selectedRaceIds.includes(raceId);
  }
  render() {
    const { races, selectRace, deselectRace } = this.props;
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

const is6MonthsFromNow = ({ date }) => moment(date).isAfter(moment().add(6, 'M'));
const isOneYearFromNow = ({ date }) => moment(date).isAfter(moment().add(1, 'y'));
const is2YearsFromNow = ({ date }) => moment(date).isAfter(moment().add(2, 'y'));
const is5YearsFromNow = ({ date }) => moment(date).isAfter(moment().add(5, 'y'));

const getStopCond = forecastLimit => {
  switch(forecastLimit) {
    case '1y':
      return isOneYearFromNow;
    case '5y':
      return is5YearsFromNow;
    default:
      return isOneYearFromNow;
  }
}

class RacePredictionPage extends Component {

  handleTabChange(tabName) {
    this.props.history.push(`/racePrediction/${tabName}`);
  }
  
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
      addingGoalPerformance,
      removeGoalPerformance,
      startAddingGoalPerformance,
      cancelAddingGoalPerformance,
      selectedTab,
      selectTab,
      userData,
      forecastLimit,
      setForecastLimit,
    } = this.props;

    const selectedRaces = races.filter(({ id }) => selectedRaceIds.includes(id));

    let prediction;
    if (selectedRaces.length > 1){
      prediction = forecast({
        data: selectedRaces.map(({ date, vdot }) => [date, vdot]),
        stopCond: getStopCond(forecastLimit),
      });
    }
    
    return (
      <div className='race-prediction-page'>
        {selectedRaces.length > 1
          ? (<div>
              <VdotChart
                races={selectedRaces}
                goalPerformances={goalPerformances}
                prediction={prediction}
              />
              <SelectField
                floatingLabelText="Forecast limit"
                value={forecastLimit}
                onChange={(evt, idx, val) => setForecastLimit(val)}
              >
                <MenuItem value={'1y'} primaryText="One Year" />
                <MenuItem value={'5y'} primaryText="Five Years" />
              </SelectField>
            </div>)
          : <div className='info mui--text-subhead'>
              <p>
              {'At least two past performances are required to show the prediction chart. '}
              { userData
                ? 'Add more past activities with \'race\' type in Strava and refresh, or enable them if they are disabled.'
                : 'Login with Strava to retrieve your past races.'
              }
              </p>
            </div>
        }
        

        <Tabs
          value={selectedTab}
          onChange={selectTab}
        >
          <Tab label="Past Performances" value="past" >
            <RaceTable
              races={races}
              selectedRaceIds={selectedRaceIds}
              selectRace={selectRace}
              deselectRace={deselectRace}
            />
          </Tab>
          <Tab label="Future Goals" value="future" >
            <GoalPerfomanceTable
              goalPerformances={goalPerformances}
              prediction={prediction}
              addingGoalPerformance={addingGoalPerformance}
              addGoalPerformance={addGoalPerformance}
              removeGoalPerformance={removeGoalPerformance}
              startAddingGoalPerformance={startAddingGoalPerformance}
              cancelAddingGoalPerformance={cancelAddingGoalPerformance}
            />
          </Tab>
        </Tabs>
      </div>
    );
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
