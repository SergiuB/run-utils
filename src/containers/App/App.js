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
    const toSave = {
      vdot,
      race,
      time: getRaceEquivalents(vdot)[race.label],
    };
    this.setPersistentState( { savedPerformances: [toSave, ...this.state.savedPerformances], changed: false } );
  };

  setPersistentState = (state, urlChange = true) => this.setState(state, () => this.persistState(urlChange));

  persistState = (urlChange) => { 
    const strState = JSON.stringify(this.state);
    localStorage.setItem('appState', strState);
    urlChange && this.props.history.push('/' + encodeURI(strState));
  };

  getPersistedState = () => {
    const state = JSON.parse(localStorage.getItem('appState'));
    if (!state.selectedPerformance) {
      // the saved state is not valid (possibly an older version)
      return undefined;
    }
    return state;
  };

  render() {
    const { metric, selectedPerformance, open, changed, savedPerformances } = this.state;
    const { race, vdot } = selectedPerformance;

    const isSamePerformanceAs = p1 => p2 => p1.vdot === p2.vdot;

    const getAppBarButtonProps = () => {
      if (changed) {
        return {
          label: "Save",
          onClick: () => this.savePerformance(selectedPerformance)
        }
      }

      if (R.find(isSamePerformanceAs(performance))(savedPerformances)) {
        return {
          label: "Remove",
          onClick: () => this.setPersistentState({
            savedPerformances: R.reject(isSamePerformanceAs(performance))(savedPerformances),
            changed: true,
          })
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
    const state = this.props.urlState 
      || this.getPersistedState()
      || this.defaultState;
    state && this.setState(state);
  }
  
}

export default App;
