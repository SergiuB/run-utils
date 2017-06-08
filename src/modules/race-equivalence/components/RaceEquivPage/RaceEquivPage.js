import React, { Component } from 'react';
import { connect } from 'react-redux';

import VdotPerformance from '../VdotPerformance';
import PerformanceList from '../PerformanceList';

import core from '../../../core';
const {
  kMarathon,
  kHalf,
  k10,
  k5,
  k3,
  kMile,
} = core.constants;
const { getRaceEquivalents } = core.services.vdotCalculator;

import * as raceEquivActions from '../../actions';

import './RaceEquivPage.css';

// exporting dumb component for testing purposes
export class RaceEquivPage extends Component {
  render() {
    const {
      metric, selectedPerformance, changed, savedPerformances, saveEnabled,
      savePerformance, removePerformance, selectPerformance, changeVdot, changeRace
    } = this.props;

    return (
      <div className='race-equiv-page'>
        <div className='page-content'>
          {saveEnabled && !!savedPerformances.length &&
            <PerformanceList
              performances={savedPerformances}
              selectedPerformance={selectedPerformance}
              onItemClick={selectPerformance}
              onItemRemove={removePerformance}
            />
          }
          <VdotPerformance
            metric={metric}
            selectedPerformance={selectedPerformance}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
            onVdotChange={changeVdot}
            onSave={savePerformance}
            saveEnabled={saveEnabled}
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
  saveEnabled: !!state.app.userData,
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
