import React from 'react';
import ProgressBar from './ProgressBar';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';

describe('ProgressBar', function() {

  var props = {
    route: {
      data: {
      	OrderTest:{},
      	PatientDetails:{
      		lastName: "test",
      		firstName: "test",
      		email: "test@test.com",
      		dob: "1-January-1917"
      	},
      	ClinicalInfo:{
      		clinicalInfo: "test"
      	},
      	ClinicianDetails:{
      		providerNumber: "123",
      		email: "test@test.com",
      		lastName: "test",
      		firstName: "test",
      		medicalSpecialty: "test",
      		organisation: "test"
      	},
      	BillingInfo:{
      		billOption:"test",
      		email: "test@test.com",
      		givenName: "test",
      		lastName: "test"
      	}
      }
    },
    router:['/']
  };

  const view = TestUtils.renderIntoDocument(React.createElement(ProgressBar, props));

  it('renders without crashing', function() {
    const page = renderer.create(React.createElement(ProgressBar, props)).toJSON();
    expect(page).toMatchSnapshot();
  });

  /*it('checkPatientDetails', function() {
  	expect(view.checkPatientDetails(props.route.data)).toBe(true);
  	expect(view.checkPatientDetails({})).toBe(false);
  });

  it('checkClinicalInfo', function() {
  	expect(view.checkClinicalInfo(props.route.data)).toBe(true);
  	expect(view.checkClinicalInfo({})).toBe(false);
  });

  it('checkClinicianDetails', function() {
  	expect(view.checkClinicianDetails(props.route.data)).toBe(true);
  	expect(view.checkClinicianDetails({})).toBe(false);
  });

  it('checkBillingInfo', function() {
  	expect(view.checkBillingInfo(props.route.data)).toBe(true);
  	expect(view.checkBillingInfo({})).toBe(false);
  });
  */
});