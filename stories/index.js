import React from 'react';
import { storiesOf, action } from '@kadira/storybook';

import RaceTimeSlider from '../src/components/RaceTimeSlider';
import {
    allRaces,
    FIVEK_DIST,
    MARATHON_RACE,
    HALF_RACE,
    TENK_RACE,
    FIVEK_RACE,
    MILE_RACE,
    ONEK_RACE,
    EIGHTH_RACE,
    FOURH_RACE,
} from '../src/services/raceCalculator';

let state = {
    kph: 8,
};

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
        <StatefulRaceTimeSlider
            races={[FOURH_RACE, MILE_RACE]}
            minKph={7}
            maxKph={36}
            />
    ));