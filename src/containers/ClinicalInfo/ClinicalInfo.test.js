import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import ClinicalInfo from './index';

describe('ClinicalInfo: index', () => {
  var props = {
    route: {
      onChange: jest.fn(),
      data: {
        attachments: [
          { id: 1, filename: 'A' },
          { id: 2, filename: 'B' },
          { id: 3, filename: 'C' }
        ],
        consangunity: false
      }
    },
    router:['/step3']
  };
  
  test('renders without crashing', () => {
    const page = renderer.create(React.createElement(ClinicalInfo, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleChange works - general', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    const selection = { "target": { 
      "value": "abc",
      "name": "clinicalInfo",
      "type": "text"
    }};
    page.handleChange(selection);
    expect(page.state.form.clinicalInfo).toEqual('abc');  
  });
  
  test('handleChange works - checkbox', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    const selection = { "target": { 
      "checked": true,
      "name": "consangunity",
      "type": "checkbox"
    }};
    page.handleChange(selection);
    expect(page.state.form.consangunity).toEqual(true);  
  });
  
  test('handleDrop works and adds attachment', async () => {
    FetchMock.post('*', { data: { id: 1 } });
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    var file = [{ name: 'A', preview: ''}];
    await page.handleDrop(file);
    expect(page.state.form.attachments[3].id).toEqual(1);
    FetchMock.restore();
  });
  
  test('handleRemoveAttachment removes an attachment', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    page.handleRemoveAttachment(0);
    expect(page.state.form.attachments[0].id).toEqual(2);
  });
  
  test('handleBack works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));                                         
    page.handleBack();
    expect(page.props.router.pop()).toEqual('/step2')
  });
  
  test('handleNext works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    page.handleNext(false);
    expect(page.props.router.pop()).toEqual('/step3')
    page.handleNext(true);
    expect(page.props.router.pop()).toEqual('/step4')
  });
  
  test('handleConfirm works', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    page.handleConfirm();
    expect(page.state.validated).toEqual(true);
  });
  
  test('closeDeleteModal hides the modal by setting the deleteModal - display state', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));                                         
    view.closeDeleteModal();
    expect(view.state.deleteModal.display).toEqual(false);
  });
  
  test('openDeleteModal hides the modal by setting the deleteModal - display state', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(ClinicalInfo, props));
    var select = { currentTarget: { name: 0 } }
    view.openDeleteModal(select);
    expect(view.state.deleteModal.display).toEqual(true);
  });
});
