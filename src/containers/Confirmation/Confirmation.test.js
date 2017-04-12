import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import Confirmation from './index';

const patientData = {
  "lastName":"abcabc",
  "firstName":"Ngabcuyen",
  "dob":"1/February/1917",
  "medicalRecordNo":"123123",
  "gender":"Male",
  "genderOther":"",
  "ethnicity":"Asian",
  "deceased":false,
  "sampleSource":"",
  "consent":false
}

const familyData = {"familyMembers":[{"familyMemberDetails":{"lastName":"abc@abc.com","firstName":"abc@abc.com","dob":"2/January/1918","medicalRecordNo":"abc@abc.com","gender":"Female","genderOther":"","ethnicity":"","deceased":false,"sampleSource":"","consent":false},"familyMemberClinicalInfo":{"clinicalInfo":"abc@abc.com","affected":true,"relevantInvestigation":"asdasdasd","familyHistory":"asdasdasdasd","consangunity":false}},
  {"familyMemberDetails":{"lastName":"ab.com","firstName":"abcsadkfhkladsfj","dob":"2/January/1918","medicalRecordNo":"abc@abc.com","gender":"Male","genderOther":"","ethnicity":"","deceased":true,"sampleSource":"","consent":false},"familyMemberClinicalInfo":{"clinicalInfo":"abc@abc.com","affected":false,"relevantInvestigation":"asdasdasdasd","familyHistory":"asdasd","consangunity":true}}]};  
const clinicianDetails = {
  "providerNumber":"as","medicalSpecialty":"as","firstName":"John",
  "lastName":"Doe","organisation":"as","phone":"as","email":"asfd@abc.com","fax":"as",
  "copyToHCP":[{"firstName":"asdf","lastName":"asdf","organisation":"adsf","email":"asfd@abc.com"},
  {"firstName":"asdf","lastName":"asdf","organisation":"adsf","email":"asfd@abc.com"}],
  "copy":false
}

const clinicalData = {
  clinicalInfo: "Dissuade ecstatic and properly saw entirely sir why laughter endeavor. In on my jointure horrible margaret suitable he followed speedily. Indeed vanity excuse or mr lovers of on. By offer scale an stuff. Blush be sorry no sight. Sang lose of hour then he left find",
  consangunity: false,
  familyHistory: "kasdfbljkbfalhfasvfkjabskldfbkjsdfbkdashfvdjhfhb;kfjv;hfv;fjbafhb;akfd",
  relevantInvestigation:"asdkfhgasdlfhabsdlfjhalsfdjh"
}

const billingInfo = {
  payer:"abc abc",
  phone:"+61412334477",
  payerEmail:"abc@gmail.com",
  firstName:"abc",
  lastName:"abc",
  billOption:"Private"
}

const testData = {
  test: {
    id:'7052d137-a166-48b0-a52e-e05a167bd176',
    label: 'Consequatur adipisci modi laudantium tenetur ea exercitationem id',
    geneLists:[{
      type: "complete",
      genes: ["GZOW","KIHG","DRCO","DWBY","ZMZY","BMBP","OLZO","PZOA"]
    }]
  }
}

const confirmationData = {
  orderTestModule: testData,
  patientDetailsModule: patientData,
  clinicalInfoModule: clinicalData,
  familyMembersModule: familyData,
  clinicianDetailsModule:clinicianDetails,
  billingInfoModule: billingInfo
}

const props = {
  route: {
    onChange: jest.fn(),
    onClean: jest.fn(),
    data: confirmationData
  },
  router:['/step1']
};

describe('Confirmation test', () => {
  test('Confirmation page renders without crashing', () => {
    const page = renderer.create(React.createElement(Confirmation)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handlePrintRecordButtonClick changes the print state to 1', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(Confirmation, props));
    page.handlePrintRecordButtonClick();
    expect(page.state.print).toEqual(1);
    page.handlePrintButtonClick(2);
    expect(page.state.print).toEqual(2);
  });
  
  test('handlePrintBloodCollectionButtonClick changes the print state to 2', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(Confirmation, props));
    page.handlePrintBloodCollectionButtonClick();
    expect(page.state.print).toEqual(2);
  });

  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(Confirmation, props));                                         
    view.handleRedirect('home');
    expect(view.props.router.pop()).toEqual('/step1');
  });
});
