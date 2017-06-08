import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class RacePredictionPage extends Component {
  
  componentWillMount() {
    const { accessToken, fetchRaces } = this.props;
    console.log('cwm', accessToken);
    fetchRaces(accessToken);
  }
  
  render() {
    const { races } = this.props;
    return <div>{races.map(race => <div key={race.id}>{race.name}</div>)}</div>;
  }
}

const mapStateToProps = (state) => ({
  accessToken: state.app.userData && state.app.userData.accessToken,
  races: state.racePrediction.races,
});

export default connect(
  mapStateToProps,
  actions,
)(RacePredictionPage);
