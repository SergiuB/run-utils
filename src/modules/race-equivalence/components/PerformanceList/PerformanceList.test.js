import React from 'react';
import renderer from 'react-test-renderer';
import PerformanceList from './PerformanceList';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('PerformanceList (Snapshot)', () => {
  it('renders correctly with default props', () => {
    const component = renderer.create(<PerformanceList />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders correctly with list of performances and selected performance', () => {
    const component = renderer.create(
      <MuiThemeProvider>
        <PerformanceList
          performances={[{
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
          }
          ]}
          selectedPerformance={{
            race: {
              distance: 10,
              label: "10K",
            },
            time: 2112.78388,
            vdot: 60.48345269028947,
          }}
      />
    </MuiThemeProvider>);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});