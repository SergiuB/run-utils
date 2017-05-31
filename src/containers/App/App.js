import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { push } from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan700, white } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

import * as appActions from '../../actions/app';

import './App.css';
import 'muicss/dist/css/mui-noglobals.min.css';

const AppBarMenu = ({ toggleMetric, metric }) => (
  <IconMenu
    iconStyle={{ color: white }}
    touchTapCloseDelay={10}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem onTouchTap={toggleMetric}>
      Show {metric ? 'Miles' : 'Kilometers'}
    </MenuItem>
  </IconMenu>
);

class App extends Component {

  doThenClose = (fn) => () => { fn.call(this); this.props.openMenu(false); }

  render() {
    const { metric, isMenuOpen, openMenu, setMetric, children, push } = this.props;
    const appBarMenuProps = {
      toggleMetric: () => setMetric(!metric),
      metric,
    };
    const childrenWithProps = React.Children.map(children,
     child => React.cloneElement(child, { metric })
    );

    const defaultChild = childrenWithProps.find(R.pathEq(['props', 'isDefault'], true));
    const defaultRoute = defaultChild && <Route key='default' exact path='/' render={() => <Redirect to={`/${defaultChild.props.id}`} />} />;

    const subappMenuItems = React.Children.map(children, ({ props }) => (
      <MenuItem key={props.id} onTouchTap={this.doThenClose(() => push(`${props.id}`))}>
        {props.title}
      </MenuItem>
    ));
    return (
      <div className="App mui--text-body1 container">

        <div className='row'>
          <AppBar
            style={{ backgroundColor: cyan700 }}
            onLeftIconButtonTouchTap={() => openMenu(true)}
            iconElementRight={<AppBarMenu {...appBarMenuProps}/>}
            />
        </div>
        <Drawer
          docked={false}
          width={200}
          open={isMenuOpen}
          onRequestChange={(open) => openMenu(open)}
          >
          {subappMenuItems}
        </Drawer>

        <div className='row'>
          {childrenWithProps}
          {defaultRoute}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.app,
  location: state.router.location,
});

export default connect(
  mapStateToProps,
  {
    push,
    ...appActions,
  },
)(App);
