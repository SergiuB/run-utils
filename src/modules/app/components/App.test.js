import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { App } from './App';
import Subapp from './Subapp';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

jest.mock('modules/core');
jest.mock('react-router');

const mountComponent = ({ metric = true, isMenuOpen = false, userData = null, isAuthenticating = false, subapps = [] } = {}) => mount(
  <MuiThemeProvider>
    <App
      metric={metric}
      isMenuOpen={isMenuOpen}
      userData={userData}
      isAuthenticating={isAuthenticating}
    >
    {subapps}
    </App>
  </MuiThemeProvider>
);

describe('App (Snapshot)', () => {

  it('renders correctly without subapps', () => {
    const component = mountComponent();
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders correctly with logged in Strava user', () => {
    const component = mountComponent({ userData: {
      uid: 'strava:1',
      displayName: 'Johnny',
      email: 'johnny@gmail.com',
      photoURL: 'large.jpg',
      accessToken: 'token'
    }});
    expect(toJson(component)).toMatchSnapshot();
  });


  it('renders correctly with subapps', () => {
    const RenderNothing = () => null;

    const component = mountComponent({ subapps: [
      <Subapp key="1" isDefault title='Race Equivalence' id='raceEquivalence' component={RenderNothing} />,
      <Subapp key="2" title='Program Builder' id='programBuilder' component={RenderNothing}/>
    ]});
    expect(toJson(component)).toMatchSnapshot();
  });
});