import React, { Component } from 'react';
import { connect } from 'react-redux';

import VdotPerformance from '../VdotPerformance';
import PerformanceList from '../../components/PerformanceList';
import {
  kMarathon,
  kHalf,
  k10,
  k5,
  k3,
  kMile,
} from '../../services/constants';
import { getRaceEquivalents } from '../../services/vdotTable';


import * as raceEquivActions from '../../actions/raceEquiv';

import './RaceEquivPage.css';

class RaceEquivPage extends Component {
  render() {
    const {
      metric, selectedPerformance, changed, savedPerformances,
      savePerformance, removePerformance, selectPerformance, changeVdot, changeRace
    } = this.props;

    return (
      <div className='race-equiv-page'>
        <div className='page-content'>
          <PerformanceList
            performances={savedPerformances}
            selectedPerformance={selectedPerformance}
            onItemClick={selectPerformance}
            onItemRemove={removePerformance}
            />
          <VdotPerformance
            metric={metric}
            selectedPerformance={selectedPerformance}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
            onVdotChange={changeVdot}
            onSave={savePerformance}
            changed={changed}
            onSelectedRaceChange={changeRace}
            />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.raceEquiv,
  savedPerformances: state.raceEquiv.savedPerformances.map(({ race, vdot }) => ({
    race,
    vdot,
    time: getRaceEquivalents(vdot)[race.label],
  }))
});

export default connect(
  mapStateToProps,
  raceEquivActions,
)(RaceEquivPage);
