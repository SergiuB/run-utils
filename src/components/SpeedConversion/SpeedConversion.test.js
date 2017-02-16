import React from 'react';
import SpeedConversion from './SpeedConversion';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('renders with default value 10 kph', () => {
  const wrapper = shallow(<SpeedConversion />);
  expect(wrapper.find('input.kph[value=10]')).toHaveLength(1);
  expect(wrapper.find('input.minKm[value="06:00"]')).toHaveLength(1);
  expect(wrapper.find('input.minMile[value="09:40"]')).toHaveLength(1);
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
  const input = wrapper.find('input.minKm[value="06:00"]');
  input.simulate('change', { target: { value: "05:00" }} );
  expect(onChange.calledWith(12)).toBe(true);
});

it('fires onChange in response to min/mile input change', () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<SpeedConversion onChange={onChange}/>);
  const input = wrapper.find('input.minMile[value="09:40"]');
  input.simulate('change', { target: { value: "08:02" }} );
  expect(onChange.calledWith(12.019996680497925)).toBe(true);
});
