import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';

import SpeedConversion from '../../components/SpeedConversion';
import RaceTime from '../../components/RaceTime';
import RaceTimeSlider from '../../components/RaceTimeSlider';
import {
  allRaces,
  kMarathon,
  kHalf,
  k10,
  k5,
  kMile,
  k1500,
} from '../../services/constants';

const MIN_KPH = 7;
const MAX_KPH = 36;

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
                showHour={distance > k5.distance}
                km={distance}
                kph={this.state.kph}
                onChange={kph => this.setState({ kph })}
              />
            </div>
          ))}
        </div>
        <div className="App-sliders">
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[k1500]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[kMile]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[k5]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[k10]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[kHalf]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[kMarathon]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
      </div>
      </div>
    );
  }
}

export default App;
