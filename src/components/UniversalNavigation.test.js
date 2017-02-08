import React from 'react';
import UniversalNavigation from './UniversalNavigation';
import renderer from 'react-test-renderer';

describe('<UniversalNavigation />', function() {
  it('renders correctly', function() {
    const tree = renderer.create(<UniversalNavigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});