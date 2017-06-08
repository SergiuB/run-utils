import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { RaceEquivPage } from './RaceEquivPage';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const savedPerformances = [{
  race: {
    distance: 21.0975, 
    label: "Half",
  },
  time: 6230.93078,
  vdot: 43.30983337421054,
}, {
  race: {
    distance: 10,
    label: "10K",
  },
  time: 2112.78388,
  vdot: 60.48345269028947,
}];
const selectedPerformance = {
  race: {
    distance: 10,
    label: "10K",
  },
  time: 2112.78388,
  vdot: 60.48345269028947,
};

const mountComponent = ({ metric = true, changed = true, saveEnabled = true, savedPerf = savedPerformances, selectedPerf = selectedPerformance  } = {}) => mount(
  <MuiThemeProvider>
    <div style={{ width: 300, height: 800}}>
      <RaceEquivPage
        metric={metric}
        changed={changed}
        saveEnabled={saveEnabled}
        savedPerformances={savedPerf}
        selectedPerformance={selectedPerf}
      />
    </div>
  </MuiThemeProvider>
);

describe('RaceEquivPage (Snapshot)', () => {

  it('renders correctly metric == true, changed == false, saveEnabled == false', () => {
    const component = mountComponent({ metric: true, changed: false, saveEnabled: false });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders correctly metric == true, changed == false, saveEnabled == true', () => {
    const component = mountComponent({ metric: true, changed: false, saveEnabled: true });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders correctly metric == true, changed == true, saveEnabled == false', () => {
    const component = mountComponent({ metric: true, changed: true, saveEnabled: false });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders correctly metric == false, changed == true, saveEnabled == true', () => {
    const component = mountComponent({ metric: false, changed: true, saveEnabled: true });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders correctly for max VDOT', () => {
    const component = mountComponent({ selectedPerf: {
      race: {
        distance: 1.609344,
        label: "Mile",
      },
      vdot: 85,
    }});
    expect(toJson(component)).toMatchSnapshot();
  });

  it('renders correctly for min VDOT', () => {
    const component = mountComponent({ selectedPerf: {
      race: {
        distance: 5,
        label: "5K",
      },
      vdot: 30,
    }});
    expect(toJson(component)).toMatchSnapshot();
  });
});