import React from 'react';
import SpeedConversion from './SpeedConversion';
import { shallow } from 'enzyme';
import sinon from 'sinon';

it('renders with default value 10 kph', () => {
  const wrapper = shallow(<SpeedConversion />);
  expect(wrapper.find('input[value=10]')).toHaveLength(1);
});

it('fires onChange in response to input change', () => {
  const onChange = sinon.spy();
  const wrapper = shallow(<SpeedConversion onChange={onChange}/>);
  const input = wrapper.find('input[value=10]');
  input.simulate('change', { target: { value: 1 }} );
  expect(onChange.calledWith(1)).toBe(true);
});
