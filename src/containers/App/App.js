import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import R from 'ramda';
import queryString from 'query-string';

import { Route } from 'react-router';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaceEquivPage from '../RaceEquivPage';

import { cyan700 } from 'material-ui/styles/colors';

import {
  kHalf,
} from '../../services/constants';
import { getVdot, getRaceEquivalents } from '../../services/vdotTable';
import { timeToSec } from '../../services/conversion';
import { allRacesObj } from '../../services/constants';

import './App.css';
import 'muicss/dist/css/mui-noglobals.min.css';

// const performancesToUri = R.compose(
//   encodeURI,
//   JSON.stringify,
//   R.map(({ race, vdot, time }) => [race.label, vdot, time]),
// );

// const performancesFromUri = R.compose(
//   x => x.length ? x : undefined,
//   R.map(([raceLabel, vdot, time]) => ({
//     race: allRacesObj[raceLabel],
//     vdot,
//     time,
//   })),
//   JSON.parse,
//   x => R.isNil(x) || x === 'undefined' ? '[]' : x,
//   decodeURI
// );
const isSamePerformanceAs = p1 => p2 => p1.vdot === p2.vdot;

class App extends Component {
  defaultState = {
    metric: true,
    open: false,
    selectedPerformance: {
      race: kHalf,
      vdot: getVdot(kHalf, timeToSec('1:36:33')),
    },
    savedPerformances: [],
    changed: true,
  }

  handleToggle = () => this.setPersistentState({ open: !this.state.open })

  handleMetricToggle = () => this.setPersistentState({ metric: !this.state.metric })

  handleClose = () => this.setState({ open: false })

  doThenClose = (fn) => () => { fn.call(this); this.handleClose(); }

  savePerformance = (performance) => {
    const { race, vdot } = performance;
    const savedPerformances = [
      {
        vdot,
        race,
        time: getRaceEquivalents(vdot)[race.label],
      },
      ...this.state.savedPerformances,
    ];
    this.setPersistentState({ savedPerformances, changed: false });
   // this.props.dispatch(push(`/raceEquivalence?savedPerformances=${performancesToUri(savedPerformances)}`));
  };

  removePerformance = (performance) => {
    const savedPerformances = R.reject(isSamePerformanceAs(performance))(this.state.savedPerformances);
    this.setPersistentState({ savedPerformances, changed: true });
    //this.props.dispatch(push(`/raceEquivalence?savedPerformances=${performancesToUri(savedPerformances)}`));
  };

  setPersistentState = (state) => this.setState(state, () => this.persistState());

  persistState = () => {
    const strState = JSON.stringify(this.state);
    localStorage.setItem('appState', strState);
  };

  getPersistedState = () => {
    const state = JSON.parse(localStorage.getItem('appState'));
    if (!state || !state.selectedPerformance) {
      // the saved state is not valid (possibly an older version)
      return undefined;
    }
    return state;
  };

  render() {
    const { metric, selectedPerformance, open, changed, savedPerformances } = this.state;
    const { race, vdot } = selectedPerformance;
    return (
      <div className="App mui--text-body1 container">

        <div className='row'>
          <AppBar
            style={{ backgroundColor: cyan700 }}
            onLeftIconButtonTouchTap={this.handleToggle}
            />
        </div>
        <Drawer
          docked={false}
          width={200}
          open={open}
          onRequestChange={(open) => this.setPersistentState({ open })}
          >
          <MenuItem onTouchTap={this.doThenClose(this.handleMetricToggle)}>
            Show {metric ? 'Miles' : 'Kilometers'}
          </MenuItem>
        </Drawer>

        <div className='row'>
          <Route path='/raceEquivalence' render={({ match, location }) => {
            //const { savedPerformances: urlPerformances } = queryString.parse(location.search);
            return <RaceEquivPage
              selectedPerformance={selectedPerformance}
              savedPerformances={/*performancesFromUri(urlPerformances) ||*/ savedPerformances}
              metric={metric}
              onSavedPerformanceClick={performance => this.setPersistentState({ selectedPerformance: performance, changed: false })}
              onVdotChange={newVdot => this.setPersistentState({
                selectedPerformance: {
                  vdot: newVdot,
                  race,
                },
                changed: true
              }, false)}
              onSelectedRaceChange={selectedRace => this.setPersistentState({
                selectedPerformance: {
                  vdot,
                  race: selectedRace,
                }
              })}
              changed={changed}
              onSavePerformance={performance => this.savePerformance(performance)}
              onRemovePerformance={performance => this.removePerformance(performance)}
              />
          } } />

        </div>
      </div>
    );
  }

  componentWillMount() {
    const state = this.getPersistedState()
      || this.defaultState;
    this.setState(state);
  }

}

export default connect()(App);
