import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';
import moment from 'moment';

import Divider from 'material-ui/Divider';

import core from 'modules/core';
const { RaceSlider } = core.components;

import WorkoutCycle from '../WorkoutCycle';
import half18weeks from '../../programs/half18weeks.json';

const { 
  getVdot,
  minRaceEquivalents,
  maxRaceEquivalents,
  getRaceEquivalents,
} = core.services.vdotCalculator;
const { kHalf } = core.constants;

import './ProgramPage.css';

const program = half18weeks;


class ProgramPage extends Component {
  state = {
    vdot: 48.1,
    raceDate: moment('2017-10-15')
  }
  render() {
    const { metric } = this.props;
    const { vdot, raceDate } = this.state;
    const race = kHalf;
    const raceEquivalents = getRaceEquivalents(vdot);
    const cycleLength = program[0].workouts.length;
    const startDate = raceDate.clone().subtract(program.length * cycleLength, 'days');

    console.log(startDate.format('ddd, DD MMM'),'to', raceDate.format('ddd, DD MMM'));

    const sameCycle = (i1, i2) => Math.floor(i1 / cycleLength) === Math.floor(i2 / cycleLength);
    const datesByCycles = R.compose(
      R.map(R.map(([i, d]) => d)),
      R.groupWith(([i1, d1], [i2, d2]) => sameCycle(i1, i2)),
      R.reverse,
      R.map(i => [i, raceDate.clone().subtract(i, 'days')])
    )(R.range(0, program.length * cycleLength));

    const programWithDates = R.zip(program, datesByCycles);

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
          programWithDates.map(([cycle, dates], index) => (
            <div key={index}>
              {index > 0 && <Divider />}
              <WorkoutCycle
                cycle={cycle}
                dates={dates}
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
