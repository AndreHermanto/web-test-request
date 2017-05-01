import React from 'react';
import ConfirmationModal from './ConfirmationModal';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
// import FetchMock from 'fetch-mock';

describe('ConfirmationModal', function() {  
  test('the button and modal renders correctly', function() {
    const component = renderer.create(<ConfirmationModal />).toJSON();
    expect(component).toMatchSnapshot();
  });
  
  var props = {
    handleValidateSubmit: jest.fn()
  };
  var component = TestUtils.renderIntoDocument(React.createElement(ConfirmationModal, props));
  
  test('opens the modal', function() {
    component.open();
    expect(component.state.showModal).toEqual(true);
  });
  
  test('close the modal', function() {
    component.close();
    expect(component.state.showModal).toEqual(false);
  });
  
});