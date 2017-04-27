import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ActionHelp from 'material-ui/svg-icons/action/help-outline';

import { grey400 } from 'material-ui/styles/colors';

import RaceSlider from '../../components/RaceSlider';
import TrainingTable from '../../components/TrainingTable';
import {
    getVdot,
    minRaceEquivalents,
    maxRaceEquivalents,
    getRaceEquivalents,
    getTrainingIntensity,
} from '../../services/vdotTable';
import { racePace, racePaceMile } from '../../services/raceCalculator';

import './VdotPerformance.css';

const raceType = PropTypes.shape({
    label: PropTypes.string,
    distance: PropTypes.number
});

const performanceType = PropTypes.shape({
    race: raceType,
    vdot: PropTypes.number
});

const helpIconStyle = {
    color: grey400,
    width: 24,
    height: 24,
};
const helpBtnStyle = {
    padding: 0,
    width: 36,
    height: 36,
    zIndex: 3
};

const helpVdot = [
    "VDOT is a measure of running ability, a combination of VO2Max and efficiency. It lets you equate a time in one distance against another.",
    "Drag the slider for one distance, and see the equivalent performance for the other distances."
];

export default class VdotPerformance extends React.Component {
    static propTypes = {
        races: PropTypes.arrayOf(raceType).isRequired,
        selectedPerformance: performanceType.isRequired,
        metric: PropTypes.bool,
    }
    render() {
        const { races, metric, onVdotChange, onSelectedRaceChange, selectedPerformance } = this.props;

        const { vdot } = selectedPerformance;
        const selectedRace = selectedPerformance.race;

        const raceEquivalents = getRaceEquivalents(vdot);
        const trainingIntensity = getTrainingIntensity(vdot);

        const paceFn = metric ? racePace : racePaceMile;

        return (
            <div className='vdot-performance'>
                <div className='vdot-value'>
                    <div className="mui--text-display1">{vdot.toFixed(1)}</div>

                    <IconButton
                        tooltip={<div style={{ width: 200, lineHeight: '16px', whiteSpace: 'normal', textAlign: 'left' }}>{helpVdot[0]}<br/>{helpVdot[1]}</div>}
                        iconStyle={helpIconStyle}
                        style={helpBtnStyle}

                        >
                        <ActionHelp />
                    </IconButton>
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
                            seconds={raceEquivalents[race.label]}
                            paceDelta={paceFn(raceEquivalents[race.label], race.distance) - paceFn(raceEquivalents[selectedRace.label], selectedRace.distance)}
                            onChange={seconds => onVdotChange(getVdot(race, seconds))}
                            minSec={maxRaceEquivalents[race.label]}
                            maxSec={minRaceEquivalents[race.label]}
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
                    trainingIntensity={trainingIntensity}
                    />
            </div>
        );
    }
}