import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import SpeedConversion from './SpeedConversion';

it('renders with default value 10 kph', () => {
  const wrapper = shallow(<SpeedConversion />);
  expect(wrapper.find('input.kph[value=10]')).toHaveLength(1);
  expect(wrapper.find(TimePicker).at(0).props().value.format('mm:ss')).toEqual('06:00');
  expect(wrapper.find(TimePicker).at(1).props().value.format('mm:ss')).toEqual('09:40');
});

it('renders with default value 10 kph', () => {
  const wrapper = shallow(<SpeedConversion kph={19.35483870967742}/>);
  expect(wrapper.find(TimePicker).at(0).props().value.format('mm:ss')).toEqual('03:07');
  expect(wrapper.find(TimePicker).at(1).props().value.format('mm:ss')).toEqual('05:00');
});

it('fires onChange in response to kph input change', () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<SpeedConversion onChange={onChange}/>);
  const input = wrapper.find('input.kph[value=10]');
  input.simulate('change', { target: { value: 1 }} );
  expect(onChange.calledWith(1)).toBe(true);
});

it('fires onChange in response to min/km input change', () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<SpeedConversion onChange={onChange}/>);
  const input = wrapper.find(TimePicker).at(0);
  input.simulate('change', moment('00:05:00', 'HH:mm:ss') );
  expect(onChange.calledWith(12)).toBe(true);
});

it('fires onChange in response to min/mile input change', () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<SpeedConversion onChange={onChange}/>);
  const input = wrapper.find(TimePicker).at(1);
  input.simulate('change', moment('00:08:02', 'HH:mm:ss') );
  expect(onChange.calledWith(12.019996680497925)).toBe(true);
});
