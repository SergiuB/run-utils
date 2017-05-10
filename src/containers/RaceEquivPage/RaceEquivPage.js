import React, { Component } from 'react';
import { connect } from 'react-redux';

import R from 'ramda';

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import { cyan500, white } from 'material-ui/styles/colors';

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

    const isSamePerformanceAs = p1 => p2 => p1.vdot === p2.vdot;
    const getAppBarButtonProps = () => {
      if (changed) {
        return {
          label: "Save",
          onClick: () => savePerformance(selectedPerformance)
        }
      } else if (R.find(isSamePerformanceAs(selectedPerformance))(savedPerformances)) {
        return {
          label: "Remove",
          onClick: () => removePerformance(selectedPerformance)
        }
      }
    }

    const appButtonProps = getAppBarButtonProps();

    return (
      <div className='race-equiv-page'>
        <Toolbar style={{ backgroundColor: cyan500 }}>
          <ToolbarGroup>
            <ToolbarTitle
              style={{ color: white }}
              text="Race Equivalence"
            />
          </ToolbarGroup>
          <ToolbarGroup>
            {appButtonProps && <FlatButton
              style={{ color: white }}
              {...appButtonProps}
            />}
          </ToolbarGroup>
        </Toolbar>
        <div className='page-content'>
          <PerformanceList
            performances={savedPerformances}
            selectedPerformance={selectedPerformance}
            onItemClick={selectPerformance}
            />
          <VdotPerformance
            metric={metric}
            selectedPerformance={selectedPerformance}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
            onVdotChange={changeVdot}
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
