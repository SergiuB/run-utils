import React from 'react';
import { shallow } from 'enzyme';
import TimePicker from 'rc-time-picker';

import RaceTime from './RaceTime';

it('renders', () => {
  const wrapper = shallow(<RaceTime kph={10} km={1}/>);
  expect(wrapper.find(TimePicker).props().value.format('HH:mm:ss')).toEqual('00:06:00');
});
