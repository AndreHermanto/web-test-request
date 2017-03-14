import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import Summary from './index';

describe('Summary: index', () => {
  const testData = {
    test: {
    id:'7052d137-a166-48b0-a52e-e05a167bd176',
    label: 'Consequatur adipisci modi laudantium tenetur ea exercitationem id',
    genes:["GZOW","KIHG","DRCO","DWBY","ZMZY","BMBP","OLZO","PZOA"]
    },
    genes:["GZOW","KIHG","DRCO","DWBY","ZMZY","BMBP","OLZO","PZOA"]
  }
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

  const familyData = {"familyMember":[{"FamilyMemberDetails":{"lastName":"abc@abc.com","firstName":"abc@abc.com","dob":"2-January-1918","medicalRecordNo":"abc@abc.com","gender":"Female","genderOther":"","ethnicity":"","deceased":false,"sampleSource":"","consent":false,"email":"abc@abc.com"},"FamilyMemberClinicalInfo":{"clinicalInfo":"abc@abc.com","affected":true,"relevantInvestigation":"asdasdasd","familyHistory":"asdasdasdasd","consangunity":false}},
    {"FamilyMemberDetails":{"lastName":"ab.com","firstName":"abcsadkfhkladsfj","dob":"2-January-1918","medicalRecordNo":"abc@abc.com","gender":"Male","genderOther":"","ethnicity":"","deceased":true,"sampleSource":"","consent":false,"email":"abc@abc.com"},"FamilyMemberClinicalInfo":{"clinicalInfo":"abc@abc.com","affected":false,"relevantInvestigation":"asdasdasdasd","familyHistory":"asdasd","consangunity":true}}]};  
  const clinicianDetails = {
    "providerNumber":"as","medicalSpecialty":"as","firstName":"John",
    "lastName":"Doe","organisation":"as","phone":"as","email":"as@aca.com","fax":"as",
    "copyToHCP":[{"additionalFirstName":"asdf","additionalLastName":"asdf","additionalOrganisation":"adsf","additionalEmail":"asfd"},
    {"additionalFirstName":"asdf","additionalLastName":"asdf","additionalOrganisation":"adsf","additionalEmail":"asdf"}],
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
    email:"abc@gmail.com",
    givenName:"abc",
    lastName:"abc",
    billOption:"Private"
  }
  
  var props = {
    route: {
      onChange: jest.fn(),
      onEdit: jest.fn(),
      data: {
        OrderTest: testData,
        PatientDetails: patientData,
        ClinicalInfo: {clinicalInfo:'abacbascs'},
        FamilyMember: familyData,
        ClinicianDetails: clinicianDetails,
        BillingInfo: billingInfo
      }
    },
    router:['/summary']
  };

  var state = {
    form: {
      props,
      signature:false
    },
    validationRule: {
      signature: 'signatureTrue',
    },
    validated: false,
    submitStatus:''
  }
  
  test('handleBack works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));                                         
    page.handleBack();
    expect(page.props.router.pop()).toEqual('/step6')
  });

  test('handleChange works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props)); 
    let event = {
      target: {
        name:'signature',
        type: 'checkbox',
        checked: true
      } 
    }                         
    page.handleChange(event);
    expect(page.state.form.signature).toEqual(true); 
  });
  test('handleEdit works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));                                     
    page.handleEdit('step1');
    expect(page.props.router.pop()).toEqual('step1');
  });

  
  test('handleSubmit works', async () => {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));
    FetchMock.mock('*', 200);
    await page.handleSubmit().then((response) => {
      expect(response).toEqual(true);
    });
    FetchMock.restore();  
    FetchMock.mock('*', 404);
    
    await page.handleSubmit().then((response) => {
       expect(response).toEqual(false);
    });
    
    FetchMock.restore();
  });
});
