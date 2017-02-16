import React from 'react';
import SpeedConversion from './SpeedConversion';
import { shallow, mount, render } from 'enzyme';

it('renders with default value 10 kph', () => {
  const wrapper = shallow(<SpeedConversion />);
  expect(wrapper.find('input[value=10]')).toHaveLength(1);
});
