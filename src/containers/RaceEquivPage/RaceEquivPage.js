import React, { Component } from 'react';

import VdotPerformance from '../VdotPerformance';
import PerformanceList from '../../components/PerformanceList';
import {
  kMarathon,
  kHalf,
  k10,
  k5,
  k3,
  kMile,
} from '../../services/constants';

class RaceEquivPage extends Component {
  render() {
    const {
      savedPerformances,
      selectedPerformance,
      metric,
      onSavedPerformanceClick,
      onVdotChange,
      onSelectedRaceChange,
    } = this.props;
    return (
      <div>
        <PerformanceList
          performances={savedPerformances}
          selectedPerformance={selectedPerformance}
          onItemClick={onSavedPerformanceClick}
          />
        <VdotPerformance
          metric={metric}
          selectedPerformance={selectedPerformance}
          races={[kMarathon, kHalf, k10, k5, k3, kMile]}
          onVdotChange={onVdotChange}
          onSelectedRaceChange={onSelectedRaceChange}
          />
      </div>
    )
  }
}

export default RaceEquivPage;