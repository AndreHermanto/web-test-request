import React from 'react';
import ClinicianDetails from './index';
import renderer from 'react-test-renderer';

describe('<ClinicianDetails />', function() {
  it('renders correctly', function() {
    const tree = renderer.create(<ClinicianDetails />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});