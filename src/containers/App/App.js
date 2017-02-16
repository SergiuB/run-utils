import React, { Component } from 'react';
import logo from '../../assets/logo.svg';
import './App.css';

import SpeedConversion from '../../components/SpeedConversion';

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
      </div>
    );
  }
}

export default App;
