import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import Confirmation from './index';

describe('Confirmation test', () => {
  test('Confirmation page renders without crashing', () => {
    const page = renderer.create(React.createElement(Confirmation)).toJSON();
    expect(page).toMatchSnapshot();
  });
});
