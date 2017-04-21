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
import PerformanceChipList from '../../components/PerformanceChipList';
import {
  kMarathon,
  kHalf,
  k10,
  k5,
  k3,
  kMile,
} from '../../services/constants';
import { getPerformanceSec } from '../../services/vdotTable';
import { timeToSec } from '../../services/conversion';


class App extends Component {
  state = {
    metric: true,
    open: false,
    selectedRace: kHalf,
    performance: getPerformanceSec(kHalf, timeToSec('1:36:33')),
    savedPerformances: [],
    changed: true,
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleMetricToggle = () => this.setState({metric: !this.state.metric})

  handleClose = () => this.setState({open: false})

  doThenClose = (fn) => () => { fn.call(this); this.handleClose(); }

  savePerformance = (performance) => 
    this.setPersistentState( { savedPerformances: [performance, ...this.state.savedPerformances], changed: false } );

  setPersistentState = (state) => this.setState(state, () => this.persistState());

  persistState = () => localStorage.setItem('appState', JSON.stringify(this.state));

  getPersistedState = () => JSON.parse(localStorage.getItem('appState'));


  render() {
    const { metric, selectedRace, performance, open, changed, savedPerformances } = this.state;

    const getVdot = (performance) => (performance.vdot + performance.percentage);

    const isSamePerformanceAs = p1 => p2 => getVdot(p1) === getVdot(p2.performance);

    const getAppBarButtonProps = () => {
      if (changed) {
        return {
          label: "Save",
          onClick: () => this.savePerformance({ selectedRace, performance })
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
          <PerformanceChipList
            performances={savedPerformances}
            onOrderChanged={performances => this.setPersistentState({ savedPerformances: performances })}
            onItemClick={(p) => this.setPersistentState({ performance: p.performance, changed: false })}
            selectedPerformance={performance}
            />
          <VdotPerformance
            metric={metric}
            performance={performance}
            selectedRace={selectedRace}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
            onPerformanceChange={performance => this.setPersistentState({ performance, changed: true })}
            onSelectedRaceChange={selectedRace => this.setPersistentState({ selectedRace })}
            />
        </div>
      </MuiThemeProvider>
    );
  }

  componentDidMount() {
    const state = this.getPersistedState()
    state && this.setState(state);
  }
  
}

export default App;
