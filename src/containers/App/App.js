import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

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
  }
  render() {
    return (
      <MuiThemeProvider>  
        <div className="App mui--text-body1">
          <Toolbar className="toolbar">
            <ToolbarGroup className="unit-system">
              <RaisedButton
                className="button"
                label='KM'
                primary={this.state.metric}
                onClick={() => this.setState({ metric: true})}
                />
              <RaisedButton
                className="button"
                label='Mile'
                primary={!this.state.metric}
                onClick={() => this.setState({ metric: false})}
                />
            </ToolbarGroup>
          </Toolbar>
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
