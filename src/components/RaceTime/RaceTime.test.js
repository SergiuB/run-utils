import React from 'react';
import { shallow } from 'enzyme';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import sinon from 'sinon';

import RaceTime from './RaceTime';

it('renders', () => {
  const wrapper = shallow(<RaceTime kph={10} km={1}/>);
  expect(wrapper.find(TimePicker).props().value.format('HH:mm:ss')).toEqual('00:06:00');
});

it('fires onChange in response to input change', () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<RaceTime km={10} kph={10} onChange={onChange}/>);
  const input = wrapper.find(TimePicker);
  input.simulate('change', moment('00:50:00', 'HH:mm:ss') );
  expect(onChange.calledWith(12)).toBe(true);
});
