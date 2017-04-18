import React, { PropTypes } from 'react';
import R from 'ramda';

import RaceSlider from '../../components/RaceSlider';
import { getPerformanceSec, minPerformanceSec, maxPerformanceSec } from '../../services/vdotTable';
import { racePace, racePaceMile } from '../../services/raceCalculator';
import { timeToSec, secToTime } from '../../services/conversion';
import { kEasyPace, kMarathonPace, kMile } from '../../services/constants';


const raceType = PropTypes.shape({
    label: PropTypes.string,
    distance: PropTypes.number
});

function formatIntensity(label, intensity, metric) {
    switch (label) {
        case kEasyPace:
            return metric ? secToTime(intensity) : secToTime(intensity * kMile.distance);
        case kMarathonPace:
            return metric ? secToTime(intensity / kMile.distance) : secToTime(intensity);
        default:
            return secToTime(intensity);
    }
}

export default class VdotPerformance extends React.Component {
    static propTypes = {
        races: PropTypes.arrayOf(raceType).isRequired,
        baseRace: raceType.isRequired,
        baseRaceTime: PropTypes.string.isRequired,
        metric: PropTypes.bool,
    }
    render() {
        const { performance, selectedRace } = this.state;
        const { races, metric } = this.props;

        const paceFn = metric ? racePace : racePaceMile;

        return (
            <div>
                {races.map(race => (
                    <RaceSlider
                        metric={metric}
                        selected={race.label === selectedRace.label}
                        key={race.label}
                        race={race}
                        seconds={performance.equivalents[race.label]}
                        paceDelta={paceFn(performance.equivalents[race.label], race.distance) - paceFn(performance.equivalents[selectedRace.label], selectedRace.distance)}
                        onChange={seconds => {
                            const newPerformance = getPerformanceSec(race, seconds);
                            this.setState({
                                performance: newPerformance,
                                selectedRace: race,
                            })
                        } }
                        minSec={maxPerformanceSec.equivalents[race.label]}
                        maxSec={minPerformanceSec.equivalents[race.label]}
                        showPace
                        />
                ))}
                {R.compose(
                    R.map(([label, intensity]) => (
                        <div key={label}>
                            <div>{label}</div>
                            <div>{formatIntensity(label, intensity, metric)}</div>
                        </div>
                    )),
                    R.filter(([_, intensity]) => intensity !== 0),
                    R.toPairs
                )(performance.trainingIntensity)}
            </div>
        );
    }

    componentWillMount() {
        const { baseRace, baseRaceTime} = this.props;
        this.setState({
            selectedRace: baseRace,
            performance: getPerformanceSec(baseRace, timeToSec(baseRaceTime)),
        })
    }
}