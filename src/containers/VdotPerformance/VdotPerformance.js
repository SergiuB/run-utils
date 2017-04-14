import React, { PropTypes } from 'react';

import RaceSlider from '../../components/RaceSlider';
import { getPerformanceSec, minPerformanceSec, maxPerformanceSec } from '../../services/vdotTable';
import { raceSpeed, raceTime, racePace, racePaceMile } from '../../services/raceCalculator';
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
                        kph={raceSpeed(performance.equivalents[race.label], race.distance)}
                        paceDelta={paceFn(performance.equivalents[race.label], race.distance) - paceFn(performance.equivalents[selectedRace.label], selectedRace.distance)}
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