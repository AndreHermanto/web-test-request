import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import BillingInfo from './index';

describe('<BillingInfo/>', function() {
  const patientData = {
    "lastName":"abc",
    "firstName":"bdf",
    "dob":"1-February-1917",
    "medicalRecordNo":"123123",
    "gender":"Male",
    "genderOther":"",
    "ethnicity":"Asian",
    "deceased":false,
    "sampleSource":"",
    "consent":false,
    "email":"abc@abc.gmail.com"
  }
  var props = {
    route: {
      onChange: jest.fn(),
      data: {},
      clinicianData: { firstName:'aa' },
      patientData: patientData
    },
    router:[]
  };

  var emptyClinicianDataProps = {
    route: {
      onChange: jest.fn(),
      data: {},
      clinicianData: {}
    },
    router:[]
  };


  test('handleChange test case: ', () => {
    const view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));

    const firstName = { "target": { 
      "value": "aa",
      "name": "givenName",
      "type": "text"
    }};
    view.handleChange(firstName);
    expect(view.state.form.givenName).toEqual('aa');  

    const consent = { "target": { 
      "name": "consent",
      "type": "checkbox",
      checked:true
    }};
    view.handleChange(consent);
    expect(view.state.form.consent).toEqual(true); 

  });

  test('handleSelectChange works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props)); 
    const select = {
      value: 'payer'
    };                              
    view.handleSelectChange(select);
    expect(view.state.form.payer).toEqual('payer');
  });

  test('handlePhoneChange works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));
    const phone = +61411335466;                              
    view.handlePhoneChange(phone);
    expect(view.state.form.phone).toEqual(phone.toString());
  });

  test('getPayers works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));
    const options = [{"label": "bdf abc", "value": "bdf abc"}, {"label": "Other", "value": "Other"}];
    const payers = view.getPayers();
    expect(payers).toEqual(options);
  });

  test('handleConfirm works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));                                         
    view.handleConfirm();
    expect(view.state.validated).toEqual(true)
  });
 
  test('handleBack works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));                                         
    view.handleBack();
    expect(view.props.router.pop()).toEqual('/step5')
  });
  
  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));                                         
    view.handleNext(true);
    expect(view.props.router.pop()).toEqual('/summary');
    const fail = view.handleNext(false);
    expect(fail).toEqual(false);
  });
});