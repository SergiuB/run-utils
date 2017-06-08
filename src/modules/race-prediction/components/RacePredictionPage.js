import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    return <div>{races.map(race => <div key={race.id}>{race.name}</div>)}</div>;
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
