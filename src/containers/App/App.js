import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';

import SpeedConversion from '../../components/SpeedConversion';
import RaceTime from '../../components/RaceTime';
import RaceTimeSlider from '../../components/RaceTimeSlider';
import {
  allRaces,
  FIVEK_DIST,
  MARATHON_RACE,
  HALF_RACE,
  TENK_RACE,
  FIVEK_RACE,
  MILE_RACE,
  ONEK_RACE,
  EIGHTH_RACE,
  FOURH_RACE,
} from '../../services/raceCalculator';

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
                showHour={distance > FIVEK_DIST}
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
            races={[FOURH_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[EIGHTH_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[ONEK_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[MILE_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[FIVEK_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[TENK_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[HALF_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
          <RaceTimeSlider
            kph={this.state.kph}
            onChange={kph => this.setState({ kph })}
            races={[MARATHON_RACE]}
            minKph={MIN_KPH}
            maxKph={MAX_KPH}
          />
      </div>
      </div>
    );
  }
}

export default App;
