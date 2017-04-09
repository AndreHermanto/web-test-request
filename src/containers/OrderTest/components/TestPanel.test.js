import React from 'react';
import TestPanel from './TestPanel';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';

var props = {
  handleClick: jest.fn(),
  preSelect: {
    id: 'p2',
    label: 'p2',
    geneLists: [
      {
        type: 'core',
        genes: ['FFF']
      }
    ]
  },
  options: [
    {
      id: 'p1',
      label: 'p1',
      geneLists: [
        {
          type: 'complete',
          genes: ['AAA','BBB','CCC']
        },
        {
          type: 'core',
          genes: ['BBB']
        }
      ] 
    },
    {
      id: 'p2',
      label: 'p2',
      geneLists: [
        {
          type: 'complete',
          genes: ['DDD','EEE','FFF']
        },
        {
          type: 'core',
          genes: ['FFF']
        }
      ] 
    }
  ]
}

describe('TestPanel', function() {
  test('TestPanel overall renders well', async function() {
    const page = renderer.create(React.createElement(TestPanel, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleOnClick calls the props handleClick function', async function() {
    const page = TestUtils.renderIntoDocument(React.createElement(TestPanel, props));
    page.handleOnClick();
    expect(page.props.handleClick).toHaveBeenCalled();
  });
});