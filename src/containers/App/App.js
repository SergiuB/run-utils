import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';

import SpeedConversion from '../../components/SpeedConversion';
import RaceTime from '../../components/RaceTime';
import {
  allRaces,
  FIVEK_DIST,
} from '../../services/raceCalculator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { kph: 11 };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SpeedConversion
          kph={this.state.kph}
          onChange={kph => this.setState({ kph })}
        />
        <div>
          {allRaces.map(({ label, distance }) => (
            <div key={label}>
              <label>{label}</label>
              <RaceTime
                showHour={distance > FIVEK_DIST}
                km={distance}
                kph={this.state.kph}
                onChange={kph => this.setState({ kph })}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
