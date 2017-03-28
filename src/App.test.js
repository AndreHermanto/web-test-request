import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import { NotificationManager } from 'react-notifications';
import App from './App';
import OrderTest from './containers/OrderTest';
import FamilyMember from './containers/FamilyMember';

describe('App', () => {
  NotificationManager.addListener = jest.fn(); // This prevents the test to overload with NotificationManager's event listeners causing potential memory leak.
  
  var props = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    location:{ pathname: '/step1' },
    router:['/step1']
  };
  
  var familyMemberProps = {
    route: {
      onChange: jest.fn(),
      data: { familyMembers: [{ familyMemberDetails: {}, familyMemberClinicalInfo: {} }] }
    },
    params: { id: 0 },
    location:{ pathname: '/step4' },
    router:['/step4']
  };
  
  var BillingProps = {
    route: {
      onChange: jest.fn(),
      data: {}
    },
    location:{ pathname: '/step6' },
    router:['/step6']
  };
  
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
  test('componentDidMount ensure window.onbeforeunload is added', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    page.componentDidMount();
    expect(window.onbeforeunload().length).toBeGreaterThan(0);
  })
  
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
    page.state.formInput = { familyMembersModule: familyMemberProps.route.data };
    const form = TestUtils.renderIntoDocument(React.createElement(FamilyMember, familyMemberProps));
    page.handleFamilyMemberChange(form);
    expect(page.state.formInput.familyMembersModule.familyMembers.length).toEqual(1);  
  });  
  
  test('handleFamilyMemberDelete deletes a family member in root state', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    page.state.formInput = { familyMembersModule: { familyMembers: [{}, {}, {}] }};
    page.handleFamilyMemberDelete(1);
    expect(page.state.formInput.familyMembersModule.familyMembers.length).toEqual(2);  
  });
  
  test('handleEdit', () => {
    const page = TestUtils.renderIntoDocument(<App />);
    page.handleEdit();
    expect(page.state.isEdited).toEqual(true);  
  });
  
  test('preventUnvisitedFormAccess prevents access to later steps when the current step has not been completed.', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(App, props));
    page.props.router.replace = jest.fn();
    
    // From step1 skipping to step4.
    var access = page.preventUnvisitedFormAccess({ pathname: '/step4' });
    expect(access).toEqual(false);
  });
  
  test('preventUnvisitedFormAccess enable backing a step and go to next step given that passing the validation', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(App, familyMemberProps));
    page.props.router.replace = jest.fn();
    
    // Backing from step4 to step3.
    var access = page.preventUnvisitedFormAccess({ pathname: '/step3' });
    expect(access).toEqual(true);
    
    // Nexting from step4 to step5.
    page.state.validation = { a: { status: null } };                         
    access = page.preventUnvisitedFormAccess({ pathname: '/step5' });
    expect(access).toEqual(true);
  });
  
  test('preventUnvisitedFormAccess prevents accessing next step when failing the validation', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(App, familyMemberProps));
    page.state.validation = { a: { status: 'error' } };
    page.props.router.replace = jest.fn();
    
    // Nexting from step4 to step5 with failed validation.
    var access = page.preventUnvisitedFormAccess({ pathname: '/step5' });
    expect(access).toEqual(false);
  });
  
  test('preventUnvisitedFormAccess enable accessing Summary page once step6 passes validation', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(App, BillingProps));
    
    // Nexting from step6 to summary
    page.state.validation = { a: { status: null } };                         
    var access = page.preventUnvisitedFormAccess({ pathname: '/summary' });
    expect(access).toEqual(true);
  });
  
  test('preventUnvisitedFormAccess enable accessing Summary from any other steps when isEdit is true', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(App, props));
    
    // Nexting from step1 to summary with isEdit = true
    page.state.validation = { a: { status: null } };
    page.props.route.isEdited = true;
    var access = page.preventUnvisitedFormAccess({ pathname: '/summary' });
    expect(access).toEqual(true);
  });
});
