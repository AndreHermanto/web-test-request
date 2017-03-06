import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import App from './App';
import OrderTest from './containers/OrderTest';
import FamilyMember from './containers/FamilyMember';

describe('App', () => {
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    router:['/step1']
  };
  
  var familyMemberProps = {
    route: {
      onChange: jest.fn(),
      data: { familyMember: [{ FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} }] }
    },
    params: { id: 0 },
    router:['/step4']
  };
  
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
  test('handleChange works inserting form data into the state', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    const form = TestUtils.renderIntoDocument(React.createElement(OrderTest, props)); 
    form.state.form.name = 'abc';
    form.state.formId = 'OrderTest';
    page.handleChange(form);
    expect(page.state.formInput.OrderTest.name).toEqual('abc');  
  });
  
  test('handleChange take no action if form state is unavailable', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    const form = TestUtils.renderIntoDocument(React.createElement(OrderTest, props));
    form.state = undefined;
    page.handleChange(form);
    expect(page.state.formInput).toEqual({});  
  });
  
  test('handleFamilyMemberChange modifies family member attribute in root state', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    page.state.formInput = { FamilyMember: familyMemberProps.route.data };
    const form = TestUtils.renderIntoDocument(React.createElement(FamilyMember, familyMemberProps));
    page.handleFamilyMemberChange(form);
    expect(page.state.formInput.FamilyMember.familyMember.length).toEqual(1);  
  });  
  
  test('handleFamilyMemberDelete deletes a family member in root state', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    page.state.formInput = { FamilyMember: { familyMember: [{}, {}, {}] }};
    page.handleFamilyMemberDelete(1);
    expect(page.state.formInput.FamilyMember.familyMember.length).toEqual(2);  
  });  
});
