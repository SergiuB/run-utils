import React, { PropTypes } from 'react';

import RaceSlider from '../../components/RaceSlider';
import { getPerformanceSec, minPerformanceSec, maxPerformanceSec } from '../../services/vdotTable';
import { raceSpeed, raceTime, racePace } from '../../services/raceCalculator';
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
    }
    render() {
        const { performance, selectedRace } = this.state;
        const races = this.props.races;

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

    componentWillMount() {
      const { baseRace, baseRaceTime} = this.props;
      this.setState({
        selectedRace: baseRace,
        performance: getPerformanceSec(baseRace, timeToSec(baseRaceTime)),
      })
    }
}