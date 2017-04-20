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


class App extends Component {
  state = {
    metric: true,
    open: false,
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleMetricToggle = () => this.setState({metric: !this.state.metric})

  handleClose = () => this.setState({open: false})

  doThenClose = (fn) => () => { fn.call(this); this.handleClose(); }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App mui--text-body1">
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={<FlatButton label="Save" />}
            />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({ open })}
            >
            <MenuItem onTouchTap={this.doThenClose(this.handleMetricToggle)}>
              Show {this.state.metric ? 'Miles' : 'Kilometers'}
            </MenuItem>
          </Drawer>
          <VdotPerformance
            metric={this.state.metric}
            baseRaceTime={'1:36:33'}
            baseRace={kHalf}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
            />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
