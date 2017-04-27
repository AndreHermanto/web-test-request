import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import PrintBloodCollection from './PrintBloodCollection';

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

  const familyData = {"familyMembers":[{"familyMemberDetails":{"lastName":"abc@abc.com","firstName":"abc@abc.com","dob":"2/January/1918","medicalRecordNo":"abc@abc.com","gender":"Female","genderOther":"","ethnicity":"","deceased":false,"sampleSource":"","consent":false},"familyMemberClinicalInfo":{"clinicalInfo":"abc@abc.com","affected":true,"relevantInvestigation":"asdasdasd","familyHistory":"asdasdasdasd","consangunity":false, consanguinityInfo: "asjhdasbdlkahsdjb"}},
    {"familyMemberDetails":{"lastName":"ab.com","firstName":"abcsadkfhkladsfj","dob":"2/January/1918","medicalRecordNo":"abc@abc.com","gender":"Male","genderOther":"","ethnicity":"","deceased":true,"sampleSource":"","consent":false},"familyMemberClinicalInfo":{"clinicalInfo":"abc@abc.com","affected":false,"relevantInvestigation":"asdasdasdasd","familyHistory":"asdasd","consangunity":true, consanguinityInfo: "asjhdasbdlkahsdjb"}}]};  
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
    consanguinityInfo: "asjhdasbdlkahsdjb",
    familyHistory: "kasdfbljkbfalhfasvfkjabskldfbkjsdfbkdashfvdjhfhb;kfjv;hfv;fjbafhb;akfd",
    relevantInvestigation:"asdkfhgasdlfhabsdlfjhalsfdjh"
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

test('PrintBloodCollection renders without crashing ', () => {
  const page = renderer.create(<PrintBloodCollection 
    orderTestModule={testData}
    patientDetails={patientData} clinicalInfo={clinicalData}
    familyMember={familyData} clinicianDetails={clinicianDetails}
  />).toJSON();
  expect(page).toMatchSnapshot();
});

