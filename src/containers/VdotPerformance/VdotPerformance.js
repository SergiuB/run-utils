import React, { PropTypes } from 'react';

import RaceSlider from '../../components/RaceSlider';
import TrainingTable from '../../components/TrainingTable';
import { getPerformanceSec, minPerformanceSec, maxPerformanceSec } from '../../services/vdotTable';
import { racePace, racePaceMile } from '../../services/raceCalculator';
import { timeToSec } from '../../services/conversion';

const raceType = PropTypes.shape({
    label: PropTypes.string,
    distance: PropTypes.number
});

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
                <TrainingTable
                    metric={metric}
                    trainingIntensity={performance.trainingIntensity}
                    />
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