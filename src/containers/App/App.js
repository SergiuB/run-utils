import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan700 } from 'material-ui/styles/colors';

import RaceEquivPage from '../RaceEquivPage';
import { getRaceEquivalents } from '../../services/vdotTable';

import * as appActions from '../../actions/app';
import * as raceEquivActions from '../../actions/raceEquiv';

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

class App extends Component {

  handleClose = () => this.props.openMenu(false)

  doThenClose = (fn) => () => { fn.call(this); this.handleClose(); }

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
    const {
      metric, selectedPerformance, menuOpen, changed, savedPerformances,
      savePerformance, removePerformance, openMenu, setMetric, selectPerformance, changeVdot, changeRace
    } = this.props;
    return (
      <div className="App mui--text-body1 container">

        <div className='row'>
          <AppBar
            style={{ backgroundColor: cyan700 }}
            onLeftIconButtonTouchTap={() => openMenu(true)}
            />
        </div>
        <Drawer
          docked={false}
          width={200}
          open={menuOpen}
          onRequestChange={(open) => openMenu(open)}
          >
          <MenuItem onTouchTap={this.doThenClose(() => setMetric(!metric))}>
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
              onSavedPerformanceClick={selectPerformance}
              onVdotChange={changeVdot}
              onSelectedRaceChange={changeRace}
              changed={changed}
              onSavePerformance={savePerformance}
              onRemovePerformance={removePerformance}
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

const mapStateToProps = (state) => {
  const newState = {
    ...state.app,
    ...state.raceEquiv,
    savedPerformances: state.raceEquiv.savedPerformances.map(({ race, vdot }) => ({
      race,
      vdot,
      time: getRaceEquivalents(vdot)[race.label],
    }))
  }
  return newState;
}

export default connect(
  mapStateToProps,
  {
    ...appActions,
    ...raceEquivActions,
  },
)(App);
