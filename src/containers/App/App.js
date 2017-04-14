import React, { Component } from 'react';
import './App.css';

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
  render() {
    return (
      <div className="App">
        <VdotPerformance
            baseRaceTime={'1:36:33'}
            baseRace={kHalf}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
        />
      </div>
    );
  }
}

export default App;
