import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import Summary from './index';

describe('Summary: index', () => {
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
    router:['/summary']
  };
  
  var tests = { data: {id: 2, label: 'Test2', description: 'Test2', genes: ['ABC']} };
  
  test('renders without crashing - initial state with empty geneList', () => {
    const page = renderer.create(React.createElement(Summary, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleBack works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));                                         
    page.handleBack();
    expect(page.props.router.pop()).toEqual('/step6')
  });
  
  test('handleSubmit works', async () => {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));
    FetchMock.mock('*', 200);
    
    await page.handleSubmit().then((response) => {
      expect(response).toEqual(true)
    });
    
    FetchMock.restore();  
    FetchMock.mock('*', 404);
    
    await page.handleSubmit().then((response) => {
      expect(response).toEqual(false)
    });
    
    FetchMock.restore();
  });
});
