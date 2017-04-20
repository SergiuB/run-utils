import React from 'react';
import PropTypes from 'prop-types';

import RaceSlider from '../../components/RaceSlider';
import TrainingTable from '../../components/TrainingTable';
import { getPerformanceSec, minPerformanceSec, maxPerformanceSec } from '../../services/vdotTable';
import { racePace, racePaceMile } from '../../services/raceCalculator';

import './VdotPerformance.css';

const raceType = PropTypes.shape({
    label: PropTypes.string,
    distance: PropTypes.number
});

export default class VdotPerformance extends React.Component {
    static propTypes = {
        races: PropTypes.arrayOf(raceType).isRequired,
        selectedRace: raceType.isRequired,
        performance: PropTypes.object.isRequired,
        metric: PropTypes.bool,
    }
    render() {
        const { races, metric, onPerformanceChange, onSelectedRaceChange, performance, selectedRace } = this.props;

        const paceFn = metric ? racePace : racePaceMile;

        return (
            <div className='vdot-performance'>
                <div className='vdot-value'>
                    <div className="mui--text-headline">{(performance.vdot + performance.percentage).toFixed(1)}</div>
                </div>
                {races.map(race => (
                    <div
                       className='slider-wrapper'
                       key={race.label}
                        >
                        <RaceSlider
                            metric={metric}
                            selected={race.label === selectedRace.label}
                            race={race}
                            seconds={performance.equivalents[race.label]}
                            paceDelta={paceFn(performance.equivalents[race.label], race.distance) - paceFn(performance.equivalents[selectedRace.label], selectedRace.distance)}
                            onChange={seconds => onPerformanceChange(getPerformanceSec(race, seconds))}
                            minSec={maxPerformanceSec.equivalents[race.label]}
                            maxSec={minPerformanceSec.equivalents[race.label]}
                            showPace
                            />
                        {race.label !== selectedRace.label && (
                            <div
                                onClick={() => onSelectedRaceChange(race)}
                                className='slider-overlay'>
                            </div>
                        )}
                    </div>
                ))}

                <p className="mui--text-subhead mui--text-dark-secondary">Training Paces</p>
                <TrainingTable
                    metric={metric}
                    trainingIntensity={performance.trainingIntensity}
                    />
            </div>
        );
    }
}