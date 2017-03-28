import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import ClinicianDetailsModule from './ClinicianDetailsModule';

function getStep(value) {
  return value;
}
describe('ClinicianDetailsModule test', () => {
  const clinicianDetails = {
    "providerNumber":"as","medicalSpecialty":"as","firstName":"John",
    "lastName":"Doe","organisation":"as","phone":"as","email":"as@aca.com","fax":"as",
    "copyToHCP":[{"firstName":"asdf","lastName":"asdf","organisation":"adsf","email":"asfd"},
    {"firstName":"asdf","lastName":"asdf","organisation":"adsf","email":"asdf"}],
    "copy":false
  }
  const props = {
    clinicianDetailsModule: clinicianDetails,
    handleOnClick: getStep
  };
    
  test('renders without crashing ', () => {
    const page = renderer.create(React.createElement(ClinicianDetailsModule, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleOnClick test', () => {
    var page = TestUtils.renderIntoDocument(
      <ClinicianDetailsModule clinicianDetailsModule={clinicianDetails} handleOnClick={getStep}/>
    );
    expect(page.props.handleOnClick('step5')).toEqual('step5');
    expect(page.handleOnClick()).toEqual(5);
  });
});
