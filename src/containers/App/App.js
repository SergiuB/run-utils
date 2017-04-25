import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import R from 'ramda';

import './App.css';
import 'muicss/dist/css/mui-noglobals.min.css';

import VdotPerformance from '../../containers/VdotPerformance';
import PerformanceList from '../../components/PerformanceList';
import {
  kMarathon,
  kHalf,
  k10,
  k5,
  k3,
  kMile,
} from '../../services/constants';
import { getVdot, getRaceEquivalents } from '../../services/vdotTable';
import { timeToSec } from '../../services/conversion';
import { allRacesObj } from '../../services/constants';

const performancesToUri = R.compose(
  encodeURI,
  JSON.stringify,
  R.map(({ race, vdot, time }) => [ race.label, vdot, time ]),
);

const performancesFromUri = R.compose(
  R.map(([ raceLabel, vdot, time ]) => ({
    race: allRacesObj[raceLabel],
    vdot,
    time,
  })),
  JSON.parse,
  decodeURI,
);

const isSamePerformanceAs = p1 => p2 => p1.vdot === p2.vdot;

class App extends Component {
  defaultState = {
    metric: true,
    open: false,
    selectedPerformance: {
      race: kHalf,
      vdot: getVdot(kHalf,timeToSec('1:36:33')),
    },
    savedPerformances: [],
    changed: true,
  }

  handleToggle = () => this.setPersistentState({open: !this.state.open})

  handleMetricToggle = () => this.setPersistentState({metric: !this.state.metric})

  handleClose = () => this.setState({open: false})

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
    this.setState( { savedPerformances, changed: false } );
    this.props.history.push('/' + performancesToUri(savedPerformances));
  };
    
  removePerformance = (performance) => {
    const savedPerformances = R.reject(isSamePerformanceAs(performance))(this.state.savedPerformances);
    this.setState( { savedPerformances, changed: true } );
    this.props.history.push('/' + performancesToUri(savedPerformances));
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

    const getAppBarButtonProps = () => {
      if (changed) {
        return {
          label: "Save",
          onClick: () => this.savePerformance(selectedPerformance)
        }
      }

      if (R.find(isSamePerformanceAs(selectedPerformance))(savedPerformances)) {
        return {
          label: "Remove",
          onClick: () => this.removePerformance(selectedPerformance)
        }
      }
    }

    const appButtonProps = getAppBarButtonProps();

    return (
      <MuiThemeProvider>
        <div className="App mui--text-body1">
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={appButtonProps 
              ? <FlatButton {...appButtonProps}/>
              : <div />
            }
            />
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
          <PerformanceList
            performances={savedPerformances}
            onItemClick={performance => this.setPersistentState({ selectedPerformance: performance, changed: false })}
            selectedPerformance={selectedPerformance}
            />
          <VdotPerformance
            metric={metric}
            selectedPerformance={selectedPerformance}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
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
            />
        </div>
      </MuiThemeProvider>
    );
  }

  componentWillMount() {
    const state = this.getPersistedState()
      || this.defaultState;
    if (this.props.savedPerformances) {
      state.savedPerformances = performancesFromUri(this.props.savedPerformances);
    }
    this.setState(state);
  }
  
}

export default App;
