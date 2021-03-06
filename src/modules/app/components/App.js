import R from 'ramda';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router';
import { push } from 'react-router-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { cyan500, white } from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';

import core from 'modules/core';
const { firebase } = core.services;

import * as appActions from '../actions';

import './App.css';
import 'muicss/dist/css/mui-noglobals.min.css';

const AppBarMenu = ({ toggleMetric, metric, userData, login, logout, isAuthenticating, isLoggingOut }) => (
  <div className='app-bar-menu'>
    {!userData && !isAuthenticating &&
      <FlatButton label="Login" style={{ color: white }} onClick={login}/>
    }
    {userData && !isLoggingOut &&
      <FlatButton label="Logout" style={{ color: white }} onClick={logout}/>
    }
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
  </div>
);

// Export dumb component for testing purposes
export class App extends Component {

  doThenClose = (fn) => () => { fn.call(this); this.props.openMenu(false); }

  componentWillMount () {
    const { authSuccess, authFail, notAuth, requestAuth } = this.props;
    
    firebase.init({ authSuccess, authFail, notAuth, requestAuth });
  }

  render() {
    const {
      metric,
      isMenuOpen,
      openMenu,
      setMetric,
      children,
      push,
      userData,
      login,
      location,
      isAuthenticating,
      logout,
      isLoggingOut,
    } = this.props;
    const appBarMenuProps = {
      toggleMetric: () => setMetric(!metric),
      metric,
      userData,
      login,
      isAuthenticating,
      logout,
      isLoggingOut,
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

    const currentSubappId = location && location.pathname && location.pathname.split('/')[1];
    const currentSubapp = childrenWithProps.find(R.pathEq(['props', 'id'], currentSubappId));
    const title = currentSubapp ? currentSubapp.props.title : '';

    return (
      <div className="App mui--text-body1 container">

        <div className='row'>
          <AppBar
            title={title}
            style={{ backgroundColor: cyan500 }}
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
});

const mapDispatchToProps = {
  push,
  ...appActions,
}

const enhance = R.compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(App);
