import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import RaceSlider from '../src/components/RaceSlider';
import VdotPerformance from '../src/containers/VdotPerformance';
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
} from '../src/services/constants';

class StatefulRaceSlider extends React.Component {
    state = {
        kph: 15,
    }
    render() {
        return (
            <RaceSlider
                kph={this.state.kph}
                onChange={kph => this.setState({ kph })}
                {...this.props}
                />
        );
    }
}

storiesOf('RaceSlider', module)
    .add('basic', () => (
        <div>
            <StatefulRaceSlider
                race={kMile}
                minKph={7}
                maxKph={36}
                />
            <StatefulRaceSlider
                race={kHalf}
                minKph={7}
                maxKph={36}
                showPace
                />
        </div>
    ));

storiesOf('VdotPerformance', module)
    .add('basic', () => (
        <VdotPerformance
            baseRaceTime={'1:36:33'}
            baseRace={kHalf}
            races={[kMarathon, kHalf, k10, k5, k3, kMile]}
        />
    ));