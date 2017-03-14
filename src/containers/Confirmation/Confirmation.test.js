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
  
  test('handlePrintRecordButtonClick changes the print state to 1', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(Confirmation));
    page.handlePrintRecordButtonClick();
    expect(page.state.print).toEqual(1);
    page.handlePrintButtonClick(2);
    expect(page.state.print).toEqual(2);
  });
  
  test('handlePrintBloodCollectionButtonClick changes the print state to 2', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(Confirmation));
    page.handlePrintBloodCollectionButtonClick();
    expect(page.state.print).toEqual(2);
  });
});
