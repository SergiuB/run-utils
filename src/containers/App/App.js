import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan700 } from 'material-ui/styles/colors';

import RaceEquivPage from '../RaceEquivPage';
import ProgramPage from '../ProgramPage';

import * as appActions from '../../actions/app';

import './App.css';
import 'muicss/dist/css/mui-noglobals.min.css';

// const performancesToUri = R.compose(
//   encodeURI,
//   JSON.stringify,
//   R.map(({ race, vdot, time }) => [race.label, vdot, time]),
// );

// const performancesFromUri = R.compose(
//   x => x.length ? x : undefined,
//   R.map(([raceLabel, vdot, time]) => ({
//     race: allRacesObj[raceLabel],
//     vdot,
//     time,
//   })),
//   JSON.parse,
//   x => R.isNil(x) || x === 'undefined' ? '[]' : x,
//   decodeURI
// );

class App extends Component {

  doThenClose = (fn) => () => { fn.call(this); this.props.openMenu(false); }

  render() {
    const { metric, isMenuOpen, openMenu, setMetric } = this.props;
    return (
      <div className="App mui--text-body1 container">

        <div className='row'>
          <AppBar
            style={{ backgroundColor: cyan700 }}
            onLeftIconButtonTouchTap={() => openMenu(true)}
            />
        </div>
        <Drawer
          docked={false}
          width={200}
          open={isMenuOpen}
          onRequestChange={(open) => openMenu(open)}
          >
          <MenuItem onTouchTap={this.doThenClose(() => setMetric(!metric))}>
            Show {metric ? 'Miles' : 'Kilometers'}
          </MenuItem>
        </Drawer>

        <div className='row'>
          <Route path='/raceEquivalence' render={({ match, location }) => {
            //const { savedPerformances: urlPerformances } = queryString.parse(location.search);
            return <RaceEquivPage metric={metric}/>
          } } />

          <Route path='/programBuilder' render={() => <ProgramPage metric={metric}/>}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.app;

export default connect(
  mapStateToProps,
  appActions,
)(App);
