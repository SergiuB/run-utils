import React, { Component } from 'react';
import R from 'ramda';

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import core from 'modules/core';
const { allRacesObj, kHalf } = core.constants;
const { RaceSlider } = core.components;
const {
    minRaceEquivalents,
    maxRaceEquivalents,
} = core.services.vdotCalculator;


class AddFutureGoalDialog extends Component {
  state = {
    race: kHalf,
    time: 5400,
  }
  render() {
    const {
      onCancel,
      onOk,
    } = this.props;
    const { race, time } = this.state;
    const mapValues = R.compose(
      R.values,
      R.map,
    );
    return (
      <div>
        <SelectField
          value={race.label}
          onChange={(ev, idx, raceLabel) => this.setState({ race: allRacesObj[raceLabel] })}
          style={{ width: 100 }}
        >
          {mapValues(r => (
            <MenuItem key={r.label} value={r.label} primaryText={r.label} />
          ), allRacesObj)}
        </SelectField>
        <RaceSlider
          selected={true}
          race={race}
          seconds={time}
          onChange={seconds => this.setState({ time: seconds })}
          minSec={maxRaceEquivalents[race.label]}
          maxSec={minRaceEquivalents[race.label]}
          showPace={false}
        />
        <RaisedButton label="Ok" primary={true} onTouchTap={() => onOk(race, time)}/>
        <RaisedButton label="Cancel" onTouchTap={onCancel}/>
      </div>
    );
  }
}

export default AddFutureGoalDialog;