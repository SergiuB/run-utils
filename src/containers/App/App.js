import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan700 } from 'material-ui/styles/colors';

import * as appActions from '../../actions/app';

import './App.css';
import 'muicss/dist/css/mui-noglobals.min.css';

class App extends Component {

  doThenClose = (fn) => () => { fn.call(this); this.props.openMenu(false); }

  render() {
    const { metric, isMenuOpen, openMenu, setMetric, children } = this.props;
    console.log(children);
    const childrenWithProps = React.Children.map(children,
     child => React.cloneElement(child, { metric })
    );
    const subappMenuItems = React.Children.map(children,
      child => <MenuItem key={child.props.id}>{child.props.title}</MenuItem>
    );
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
          {subappMenuItems}
        </Drawer>

        <div className='row'>
          {childrenWithProps}
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
