import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import './App.css';
import 'muicss/dist/css/mui-noglobals.min.css';

import VdotPerformance from '../../containers/VdotPerformance';
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
    this.setState( { savedPerformances: [performance, ...this.state.savedPerformances], changed: false } );

  render() {
    const { metric, selectedRace, performance, open, changed } = this.state;
    return (
      <MuiThemeProvider>
        <div className="App mui--text-body1">
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={changed && <FlatButton label="Save" onClick={() => this.savePerformance({ selectedRace, performance })}/>}
            />
          <Drawer
            docked={false}
            width={200}
            open={open}
            onRequestChange={(open) => this.setState({ open })}
            >
            <MenuItem onTouchTap={this.doThenClose(this.handleMetricToggle)}>
              Show {metric ? 'Miles' : 'Kilometers'}
            </MenuItem>
          </Drawer>
          <VdotPerformance
            metric={metric}
            performance={performance}
            selectedRace={selectedRace}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
            onPerformanceChange={performance => this.setState({ performance, changed: true })}
            onSelectedRaceChange={selectedRace => this.setState({ selectedRace })}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
