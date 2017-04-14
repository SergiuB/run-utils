import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import RaceSlider from '../src/components/RaceSlider';
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
import { raceSpeed, raceTime, racePace } from '../src/services/raceCalculator';

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

class VdotPerformance extends React.Component {
    state = {
        performance: getPerformanceSec(kHalf, timeToSec('1:36:33')),
        selectedRace: kHalf,
    }
    render() {
        const { performance, selectedRace } = this.state;
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
                    <RaceSlider
                        selected={race.label === selectedRace.label}
                        key={race.label}
                        race={race}
                        kph={raceSpeed(performance.equivalents[race.label], race.distance)}
                        paceDelta={racePace(performance.equivalents[race.label], race.distance) - racePace(performance.equivalents[selectedRace.label], selectedRace.distance)}
                        onChange={kph => {
                            const newPerformance = getPerformanceSec(race, raceTime(kph, race.distance));
                            this.setState({
                                performance: newPerformance,
                                selectedRace: race,
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