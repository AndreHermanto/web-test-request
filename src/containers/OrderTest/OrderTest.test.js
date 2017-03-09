import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import OrderTest from './index';

describe('OrderTest: index', () => {
  var testList = { data:[
    {id: 1, label: 'Test1'},
    {id: 2, label: 'Test2'},
    {id: 3, label: 'Test3'}
  ] };
  
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    router:['/step1']
  };
  
  var tests = { data: {id: 2, label: 'Test2', description: 'Test2', genes: ['ABC']} };
  
  test('renders without crashing - initial state with empty geneList', () => {
    const page = renderer.create(React.createElement(OrderTest, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('companyWillMount runs the function getting the test list', async () => {
    const page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    FetchMock.get('*', testList);
    await page.componentWillMount();
    expect(page.state.testList[1].id).toEqual(2);
    FetchMock.restore();                           
  });
  
  test('handleTestSelect works - select a test panel', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.testList = testList.data;
    const selection = { "target": { "value": testList.data[1].id }};
    page.handleTestSelect(selection);
    expect(page.state.form.test.id).toEqual(2);  
  });
  
  test('handleConfirm works without selection', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));                                         
    page.handleConfirm();
    expect(page.props.router.pop()).toEqual('/step1')
  });
  
  test('handleConfirm works after selection', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.testList = testList.data;
    const selection = { "target": { "value": testList.data[1].id }};
    page.handleTestSelect(selection);
    page.handleConfirm();
    expect(page.props.router.pop()).toEqual('/step2')
  });
  
  test('handleConfirm works after selection in edit mode', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.testList = testList.data;
    page.props.route.isEdited = true;
    const selection = { "target": { "value": testList.data[1].id }};
    page.handleTestSelect(selection);
    page.handleConfirm();
    expect(page.props.router.pop()).toEqual('/summary')
  });
  
  test('displayGenes shows a list of genes', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    page.state.form.genes = ['AAAA', 'BBBB', 'CCCC']
    expect(page.displayGenes().length).toEqual(3)
  });
  
});
