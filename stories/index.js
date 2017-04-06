import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import RaceTimeSlider from '../src/components/RaceTimeSlider';
import {
    allRaces,
    kMarathon,
    k30,
    k25,
    kHalf,
    k10M,
    k15,
    k10,
    k5M,
    k8,
    k5,
    k2M,
    k3,
    kMile,
    k1500,
} from '../src/services/raceCalculator';

class StatefulRaceTimeSlider extends React.Component {
    state = {
        kph: 15,
    }
    render() {
        return (
            <RaceTimeSlider
                kph={this.state.kph}
                onChange={kph => this.setState({ kph })}
                {...this.props}
                />
        );
    }
}

storiesOf('RaceTimeSlider', module)
    .add('basic', () => (
        <div>
            <StatefulRaceTimeSlider
                races={[kMile, k10]}
                minKph={7}
                maxKph={36}
                />
            <StatefulRaceTimeSlider
                races={[kHalf]}
                minKph={7}
                maxKph={36}
                showPace
                />
        </div>
    ));