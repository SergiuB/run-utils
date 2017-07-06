import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, select, number, boolean, text } from '@storybook/addon-knobs';
import R from 'ramda';
import moment from 'moment';
import { scaleLinear } from 'd3-scale';
import { rgb } from 'd3-color';
import { interpolateHcl } from 'd3-interpolate';

import programBuilder from '../src/modules/program-builder';

const {
  getPhases,
} = programBuilder.services.phasing;

const stories = storiesOf('ProgramOverview', module);
stories.addDecorator(withKnobs);

const ProgramOverview = ({ raceDate, cycleLength, cycleCount, excludeP1 }) => {
    const formatDate = m => m.format('DD MMM');
    const raceDateM = moment(raceDate);

    const sameCycle = (i1, i2) => Math.floor(i1 / cycleLength) === Math.floor(i2 / cycleLength);
    const datesByCycles = R.compose(
      R.filter((cycle) => moment().isBefore(cycle[0])),
      R.map(R.map(([i, d]) => d)),
      R.groupWith(([i1, d1], [i2, d2]) => sameCycle(i1, i2)),
      R.reverse,
      R.map(i => [i, raceDateM.clone().subtract(i, 'days')])
    )(R.range(0, cycleCount * cycleLength));

    const phases = getPhases(datesByCycles.length, { excludeP1 })
    
    const tapLog = R.tap(console.log);
    const getPhase = (cycleIndex) => {
        // console.log(cycleIndex);
        const containsCycle = phase => phase.findIndex(ci => ci === cycleIndex + 1) !== -1;
        const phase = phases.findIndex(containsCycle);
        return (phase !== -1) ? phase + 1 : null;
    }

    const getBackgroundColor = (cycleIndex) => {
        const phase = getPhase(cycleIndex);
        return !phase ? 'white': color(phase);
    };

    const color = scaleLinear().domain([1,4])
      .interpolate(interpolateHcl)
      .range([rgb("#007AFF"), rgb('#FFF500')]);

    return (
        <div className='program-overview'>
        {datesByCycles.map((cycleDates, i) => {
            const [firstDate, lastDate] = [cycleDates[0], R.last(cycleDates)];

            return (
                <div
                    key={i}
                    className='cycle'
                    style={{ backgroundColor: getBackgroundColor(i)}}
                >
                    {i+1} {formatDate(firstDate)} - {formatDate(lastDate)}
                </div>
            )
        })}
        </div>
    )
}



stories
    // .addDecorator(withKnobs)
    .add('basic', () => {
        const cycleLengthValue = select('Cycle length', [7, 9], 7);
        const cycleCountValue = number('Cycle count', 24, {
            range: true,
            min: 1,
            max: 24,
            step: 1,
        });

        const excludeP1Value = boolean('Exclude Phase 1', false);

        const raceDateValue = text('Race date', '2017-10-15');

        console.log(cycleLengthValue);

        return (
            <ProgramOverview
                raceDate={raceDateValue}
                cycleLength={cycleLengthValue}
                cycleCount={cycleCountValue}
                excludeP1={excludeP1Value}
            />
        )
    });
