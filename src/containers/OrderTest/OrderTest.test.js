import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import OrderTest from './index';

describe('OrderTest: index', () => {
  test('renders without crashing - initial state with empty geneList', () => {
    const page = renderer.create(<OrderTest />).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  var testList = { data:[
    {id: 1, label: 'Test1'},
    {id: 2, label: 'Test2'},
    {id: 3, label: 'Test3'}
  ] };
  
  var tests = { data: {id: 2, label: 'Test2', description: 'Test2', genes: ['ABC']} };
  
  test('companyWillMount runs the function getting the test list', async () => {
    const page = TestUtils.renderIntoDocument(<OrderTest />);
    FetchMock.get('*', testList);
    await page.componentWillMount();
    expect(page.state.testList).toEqual(testList.data);
    FetchMock.restore();                           
  });
  
  test('handleTestSelect works - select a test panel', async () => {
    const page = TestUtils.renderIntoDocument(<OrderTest />);
    const selection = { "target": { "value": testList.data[1].id }};
    FetchMock.get('*', tests);
    await page.handleTestSelect(selection);
    expect(page.state.form.test.id).toEqual(2);  
    FetchMock.restore();
  });
  
  test('handleTestSelect works - select a whole genome analysis', () => {
    const page = TestUtils.renderIntoDocument(<OrderTest />);
    const selection = { "target": { "value": "whole" }};
    page.handleTestSelect(selection);
    expect(page.state.form.test.id).toEqual('whole');  
  });  
  
  test('handleConfirm works', () => {
    var props = {
      route: {
        onChange: jest.fn()
      },
      router:[]
    };
    var page = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));                                         
    page.handleConfirm();
    expect(page.props.router[0]).toEqual('/step2')
  });
});
