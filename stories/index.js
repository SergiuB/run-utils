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
} from '../src/services/constants';

import { timeToSec } from '../src/services/conversion';
import { getPerformanceSec, minPerformanceSec, maxPerformanceSec } from '../src/services/vdotTable';
import { raceSpeed, raceTime } from '../src/services/raceCalculator';

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

class VdotPerformance extends React.Component {
    state = {
        performance: getPerformanceSec(kHalf, timeToSec('1:36:33'))
    }
    render() {
        const { performance } = this.state;
        const races = [
            kMarathon,
            kHalf,
            k10,
            k5,
            k3,
            kMile,
        ];
        return (
            <div>
                {races.map(race => (
                    <RaceTimeSlider
                        key={race.label}
                        races={[race]}
                        kph={raceSpeed(performance.equivalents[race.label], race.distance)}
                        onChange={kph => {
                            const newPerformance = getPerformanceSec(race, raceTime(kph, race.distance));
                            this.setState({
                                performance: newPerformance
                            })
                        }}
                        minKph={raceSpeed(minPerformanceSec.equivalents[race.label], race.distance)}
                        maxKph={raceSpeed(maxPerformanceSec.equivalents[race.label], race.distance)}
                        showPace
                        />
                ))}

            </div>
        );
    }
}

storiesOf('VdotPerformance', module)
    .add('basic', () => (
        <VdotPerformance />
    ));