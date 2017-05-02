import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import PatientDetailsModule from './PatientDetailsModule';

function getStep(value) {
  return value;
}
describe('PatientDetailsModule test', () => {
  const patientData = {
    "lastName":"abcabc",
    "firstName":"Ngabcuyen",
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
  const clinicalData = {
    clinicalInfo: "",
    consangunity: false,
    consanguinityInfo: "asjhdasbdlkahsdjb",
    familyHistory: "kasdfbljkbfalhfasvfkjabskldfbkjsdfbkdashfvdjhfhb;kfjv;hfv;fjbafhb;akfd",
    relevantInvestigation:"asdkfhgasdlfhabsdlfjhalsfdjh",
    attachments:[{filename:'aaa', preview:null}]
  }
  const props = {
    patientDetails: patientData,
    clinicalInfo: clinicalData,
    handleDetailsClick: getStep,
    handleClinicalInfoClick: getStep
  };
    
  test('renders without crashing ', () => {
    const page = renderer.create(React.createElement(PatientDetailsModule, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleDetailsClick/handleClinicalInfoClick test', () => {
    var page = TestUtils.renderIntoDocument(
      <PatientDetailsModule patientDetails={patientData} clinicalInfo={clinicalData} handleOnClick={getStep}/>
    );
    expect(page.props.handleOnClick('step2')).toEqual('step2');
    expect(page.handleDetailsClick()).toEqual(2);
    expect(page.props.handleOnClick('step3')).toEqual('step3');
    expect(page.handleClinicalInfoClick()).toEqual(3);
  });

  test('displayNotes test', () => {
    var page = TestUtils.renderIntoDocument(
      <PatientDetailsModule patientDetails={patientData} clinicalInfo={clinicalData}/>
    );
    let notes = page.displayNotes(page.props.clinicalInfo.clinicalInfo.split(/\r?\n/));
    expect(notes.length).toEqual(1);
  });
});
