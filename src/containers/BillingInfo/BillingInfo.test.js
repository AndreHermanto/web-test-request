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
      orderTestData: {
        "id": "58c74b7c1020a1eb58e9dfb6",
        "label": "Left Ventricular Noncompaction (LVNC), Extended Panel",
        "geneLists": [{
          type: 'core',
          genes: ["MIB1"]
        }]
      },
      clinicianData: { firstName:'aa' },
      patientData: patientData,
      familyMemberData: { familyMember: [] }
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
      "name": "firstName",
      "type": "text"
    }};
    view.handleChange(firstName);
    expect(view.state.form.firstName).toEqual('aa');  

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

  test('getPayers works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(BillingInfo, props));
    const options = [{ "label": "bdf abc (Patient)", "value": "bdf abc"}, {"label": "Other", "value": "Other"}];
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