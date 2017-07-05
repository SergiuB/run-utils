import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import Divider from 'material-ui/Divider';

import core from 'modules/core';
const { RaceSlider } = core.components;

import WorkoutCycle from '../WorkoutCycle';
import half18weeks from '../../programs/half18weeks.json';

const {
  calculate,
  mergeWorkoutData,
  pointTable
} = core.services.workoutCalculator;
const { 
  getVdot,
  getTrainingPaces,
  minRaceEquivalents,
  maxRaceEquivalents,
  getRaceEquivalents,
} = core.services.vdotCalculator;
const { minToTime, oneDecimal } = core.services.conversion;
const { kHalf } = core.constants;

import './ProgramPage.css';

const program = half18weeks;


class ProgramPage extends Component {
  state = {
    vdot: 48.1
  }
  render() {
    const { metric } = this.props;
    const { vdot } = this.state;
    const race = kHalf;
    const raceEquivalents = getRaceEquivalents(vdot);

    return (
      <div className='program-page'>
        <RaceSlider
          metric={metric}
          selected={true}
          race={race}
          seconds={raceEquivalents[race.label]}
          onChange={seconds => this.setState({ vdot: getVdot(race, seconds) })}
          minSec={maxRaceEquivalents[race.label]}
          maxSec={minRaceEquivalents[race.label]}
          showPace
          />
        {
          program.map((cycle, index) => (
            <div>
              {index > 0 && <Divider />}
              <WorkoutCycle
                key={index}
                cycle={cycle}
                index={index}
                vdot={vdot}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export default connect()(ProgramPage);
