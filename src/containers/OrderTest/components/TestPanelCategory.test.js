import React from 'react';
import TestPanelCategory from './TestPanelCategory';
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

describe('TestPanelCategory', function() {
  test('TestPanelCategory overall renders well', async function() {
    const page = renderer.create(React.createElement(TestPanelCategory, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  test('handleOnClick calls the props handleClick function', async function() {
    const page = TestUtils.renderIntoDocument(React.createElement(TestPanelCategory, props));
    page.handleOnClick();
    expect(page.props.handleClick).toHaveBeenCalled();
  });
});