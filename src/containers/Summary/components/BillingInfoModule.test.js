import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import BillingInfoModule from './BillingInfoModule';

function getStep(value) {
  return value;
}
describe('BillingInfoModule test', () => {
  const privateBillingInfo = {
    payer:"abc abc",
    phone:"+61412334477",
    email:"abc@gmail.com",
    givenName:"abc",
    lastName:"abc",
    billOption:"Private"
  }
  const institutionBillingInfo = {
    payer:"abc abc",
    phone:"+61412334477",
    email:"abc@gmail.com",
    givenName:"abc",
    lastName:"abc",
    billOption:"Institution"
  }
  const clinicianDetails = {
    "providerNumber":"as","medicalSpecialty":"as","firstName":"John",
    "lastName":"Doe","organisation":"as","phone":"as","email":"as@aca.com","fax":"as",
    "copyToHCP":[{"additionalFirstName":"asdf","additionalLastName":"asdf","additionalOrganisation":"adsf","additionalEmail":"asfd"},
    {"additionalFirstName":"asdf","additionalLastName":"asdf","additionalOrganisation":"adsf","additionalEmail":"asdf"}],
    "copy":false
  }
  const privateProps = {
    billingInfoModule: privateBillingInfo,
    clinicianDetailsModule: clinicianDetails,
    handleOnClick: getStep
  };

  const institutionProps = {
    billingInfoModule: privateBillingInfo,
    clinicianDetailsModule: clinicianDetails,
    handleOnClick: getStep
  };
    
  test('private renders without crashing ', () => {
    const page = renderer.create(React.createElement(BillingInfoModule, privateProps)).toJSON();
    expect(page).toMatchSnapshot();
  });

  test('handleOnClick test', () => {
    var page = TestUtils.renderIntoDocument(
      <BillingInfoModule billingInfoModule={privateBillingInfo} clinicianDetailsModule={clinicianDetails} handleOnClick={getStep}/>
    );
    expect(page.props.handleOnClick('step6')).toEqual('step6');
    expect(page.handleOnClick()).toEqual(6);
  });

  test('institution handleOnClick test', () => {
    var page = TestUtils.renderIntoDocument(
      <BillingInfoModule billingInfoModule={institutionBillingInfo} clinicianDetailsModule={clinicianDetails} handleOnClick={getStep}/>
    );
    expect(page.props.handleOnClick('step6')).toEqual('step6');
    expect(page.handleOnClick()).toEqual(6);
  });

});
