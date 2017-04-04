import React from 'react';
import TestPanel from './TestPanel';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';

var props = {
  handleClick: jest.fn(),
  options: [
    { id: 'p1', label: 'p1', genes: ['AAA','BBB','CCC'] },
    { id: 'p2', label: 'p2', genes: ['DDD','EEE'] },
    { id: 'p3', label: 'p3', genes: ['FFF'] }
  ]
}

describe('TestPanel', function() {
  test('TestPanel overall renders well', async function() {
    const page = renderer.create(React.createElement(TestPanel, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
});