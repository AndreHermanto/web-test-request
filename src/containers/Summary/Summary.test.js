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
      geneLists:[{
        type: "complete",
        genes: ["GZOW","KIHG","DRCO","DWBY","ZMZY","BMBP","OLZO","PZOA"]
      }]
    }
  }
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
    email:"abc@gmail.com",
    givenName:"abc",
    lastName:"abc",
    billOption:"Private"
  }
  
  var props = {
    route: {
      isEdited: true,
      onChange: jest.fn(),
      onFormState: jest.fn(),
      testRequest: {
        orderTestModule: testData,
        patientDetailsModule: patientData,
        clinicalInfoModule: {clinicalInfo:'abacbascs'},
        familyMembersModule: familyData,
        clinicianDetailsModule: clinicianDetails,
        billingInfoModule: billingInfo
      }
    },
    router:['/summary']
  };

  var resubmitProps = {
    route: {
      isSubmitted: true,
      lastestRequestID: 1,
      isEdited: true,
      onChange: jest.fn(),
      onFormState: jest.fn(),
      testRequest: {
        orderTestModule: testData,
        patientDetailsModule: patientData,
        clinicalInfoModule: {clinicalInfo:'abacbascs'},
        familyMembersModule: familyData,
        clinicianDetailsModule: clinicianDetails,
        billingInfoModule: billingInfo
      }
    },
    router:['/summary']
  };

  var state = {
    form: {
      props
    },
    validationRule: {
      signature: 'signatureTrue',
    },
    validated: false,
    submitStatus:''
  }
  
  test('componentWillMount calls onEdit', () => {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));                                         
    page.componentWillMount();
    expect(page.props.route.onFormState).toHaveBeenCalled();
  });
  
  test('priceChange calls onChange in props', async () => {
    FetchMock.mock('*', {
      "data": {
        "panelId": "58e5a5c21020a1e8075ed313",
        "payer": "asdf",
        "breakdown": [
          {
            "description": "Catecholaminergic Polymorphic Ventricular Tachycardia (CPVT)",
            "price": 40
          },
          {
            "description": "TOTAL PRICE",
            "price": 40
          }
        ]
      }
    });
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));                                         
    await page.priceChange();
    expect(page.props.route.onChange).toHaveBeenCalled();
    FetchMock.restore(); 
  });
  
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
    FetchMock.mock('*', { data: { id: 1 } });
    await page.handleSubmit().then((response) => {
      expect(response.data.id).toEqual(1);
    });
    FetchMock.restore();  
    FetchMock.mock('*', 404);
    
    await page.handleSubmit().then((response) => {
       expect(response).toEqual(false);
       expect(page.state.submitStatus).toEqual('');
    });
    
    FetchMock.restore();
  });

  test('reSubmit test', async () => {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, resubmitProps));

    page.handleSubmit();
    expect(page.props.route.onFormState).toHaveBeenCalled();
    // await page.handleSubmit().then((response) => {
    //    expect(page.props.route.onFormState).toHaveBeenCalled();
    // });
    
    // FetchMock.restore();
  });
  
  test('handleValidateSubmit works', () =>  {
    var page = TestUtils.renderIntoDocument(React.createElement(Summary, props));   
    page.state.validation = [{ status: null }, { status: null }];
    page.handleValidateSubmit();
    expect(page.state.submitStatus).toEqual('loading');
  });
});
