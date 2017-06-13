import React, { Component } from 'react';
import { connect } from 'react-redux';

import VdotChart from './VdotChart';

import core from 'modules/core';
const { getVdot } = core.services.vdotCalculator;

import * as actions from '../actions';

class RacePredictionPage extends Component {
  
  componentWillMount() {
    const { userData, fetchRaces } = this.props;

    if (!userData)
      return;
    console.log('cwm', userData.uid);
    fetchRaces(userData.uid);
  }

  render() {
    const { races } = this.props;
    const toVdotActivity = race => ({
      vdot: parseFloat(getVdot(race.distance / 1000, race.moving_time)).toFixed(1),
      distance: race.distance / 1000,
      time: race.moving_time,
      name: race.name,
      id: race.id,
      date: new Date(race.start_date_local),
    })
    // console.log(races);
    return <VdotChart runActivities={races.map(toVdotActivity)}/>
    // return <div>
    //   {races.map(race => <div key={race.id}>{race.name} - {getVdot(race.distance / 1000, race.moving_time)} - {new Date(race.start_date_local).toString()}</div>)}
    // </div>;
  }
}

const mapStateToProps = (state) => ({
  userData: state.app.userData,
  races: state.racePrediction.races,
});

export default connect(
  mapStateToProps,
  actions,
)(RacePredictionPage);
