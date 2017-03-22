import React from 'react';
import Footer from './Footer';
import renderer from 'react-test-renderer';

describe('<Footer />', function() {
  it('Match Snapshot', function() {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});