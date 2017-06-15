import React, { Component } from 'react';
import { connect } from 'react-redux';
import R from 'ramda';

import core from 'modules/core';
const { RaceSlider } = core.components;

const { calculate, mergeWorkoutData, pointTable } = core.services.workoutCalculator;
const { 
    getVdot,
    // getTrainingPaces,
    minRaceEquivalents,
    maxRaceEquivalents,
    getRaceEquivalents,
} = core.services.vdotCalculator;
const { minToTime } = core.services.conversion;
const { kHalf } = core.constants;

import './ProgramPage.css';

const program = [
  [
    "120'E",
    "8kmE",
    "2kmE+2*(200mR/200m+200mR/400m+400mR/200m+4'E)+1kmE",
    "8kmE",
    "8kmE",
    "2kmE+4*1miT/1'+4*200mR/200m+2kmE",
    "8kmE",
  ],
  [
    "120'E",
    "8kmE",
    "2kmE+10*200mR/200m+2kmE",
    "8kmE",
    "8kmE",
    "2kmE+2*2miT/2'+4*200mR/200m+2kmE",
    "8kmE",
  ],
  [
    "120'E",
    "8kmE",
    "8kmE",
    "2kmE+4*1000mI/3'+2kmE",
    "2kmE+4*1miT/1'+4*200mR/200m+2kmE",
    "8kmE",
    "8kmE",
  ],
  [
    "2kmE+4miM+2kmE",
    "8kmE",
    "8kmE",
    "2kmE+4*5'I/4'+2kmE",
    "2kmE+20'T+4*200mR/200m+2kmE",
    "8kmE",
    "8kmE",
  ],
  [
    "110'E",
    "8kmE",
    "8kmE",
    "2kmE+4*5'T/1'+2kmE",
    "8kmE",
    "8kmE",
    "2kmE+60'M+2kmE",
  ],
  [
    "8kmE",
    "8kmE",
    "8kmE",
    "2kmE+2*10'T/2'+2*5'T/1'+2kmE",
    "8kmE",
    "8kmE",
    "90'E",
  ],
  [
    "45'E",
    "45'E",
    "2kmE+3*1miT/2'+2kmE",
    "45'E",
    "30'E",
    "30'E",
    "2kmE+21kmT+2kmE",
  ]
]

const addPaces = vdot => {
  // const paces = getTrainingPaces(vdot);
  return workout => workout
    // .replace(/E/g, `@${minToTime(paces.E)}`)
    // .replace(/M/g, `@${minToTime(paces.M)}`)
    // .replace(/T/g, `@${minToTime(paces.T)}`)
    // .replace(/I/g, `@${minToTime(paces.I)}`)
    // .replace(/R/g, `@${minToTime(paces.R)}`);
}

const formatPercentage = perc => perc * 100

const processCycleTotals = ({ distance, time, points, zones }) => {
  return ({
  distance,
  time: minToTime(time),
  points,
  zones: R.map(zone => ({
    ...zone,
    pDistance: formatPercentage(zone.distance / distance),
    pTime: formatPercentage(zone.time / time),
    pPoints: formatPercentage(zone.points / points),
  }))(zones)
})};

class ProgramPage extends Component {
  state = {
    vdot: 47
  }
  render() {
    const { metric } = this.props;
    const { vdot } = this.state;
    const calc = calculate(vdot);
    const formatWorkout = addPaces(vdot);
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
          program.map((cycle, ci) => {
            let wData = R.zip(cycle.map(formatWorkout), cycle.map(w => calc(w)));
            const totals = R.compose(
              processCycleTotals,
              R.reduce(mergeWorkoutData, {}),
              R.map(R.prop(1))
            )(wData);
            return (
              <div className='cycle mui--text-caption' key={ci}>
                {wData.map(([name, data], wi) => {
                  return (
                    <div className='workout' key={wi}>
                      <div>{name}</div>
                      <div className='workout-numbers'>
                        <div className='workout-col'>
                          <div>{data.distance.toFixed(1)}</div>
                        </div>
                        <div className='workout-col'>
                          <div>{minToTime(data.time)}</div>
                        </div>
                        <div className='workout-col'>
                          <div>{data.points.toFixed(1)}</div>
                        </div>
                      </div>
                    </div>
                  )}
                )}
                <div className='cycle-totals mui--text-menu'>
                  <div className='workout'>
                    <div></div>
                    <div className='workout-numbers'>
                      <div className='workout-col'>
                        <div>{totals.distance.toFixed(1)}</div>
                      </div>
                      <div className='workout-col'>
                        <div>{totals.time}</div>
                      </div>
                      <div className='workout-col '>
                        <div>{totals.points.toFixed(1)}</div>
                      </div>
                    </div>
                  </div>
                  <div className='pace-distribution'>
                  {R.compose(
                    R.map(([zone, data]) => <div className={`zone-${zone}`} style={{ flexGrow: Math.min(data.pDistance, 50), height: 10 }} key={zone}></div>),
                    R.sortBy(([zone, data]) => pointTable[zone]),
                    R.toPairs,
                  )(totals.zones)}
                  </div>
                </div>
              </div>
            )}
          )
        }
      </div>
    )
  }
}

export default connect()(ProgramPage);