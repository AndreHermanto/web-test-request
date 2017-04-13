import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import View from './index';

var mockData = [
  {
  "orderTestModule": {
        "test": {
            "id": "58c74b7c1020a1eb58e9dfac",
            "label": "Dilated Cardiomyopathy (DCM), Core Panel",
            "geneLists": []
        }
    },
    "patientDetailsModule": {
        "lastName": "Agudo",
        "firstName": "Joshua",
        "dob": "2020-02-02",
        "medicalRecordNo": "",
        "gender": "Male",
        "genderOther": "",
        "ethnicity": "Filipino",
        "deceased": false,
        "sampleSource": "",
        "consent": true
    },
    "clinicalInfoModule": {
        "clinicalInfo": "Here is some clinical information",
        "affected": false,
        "consanguinityInfo": "asjhdasbdlkahsdjb",
        "familyHistory": "kasdfbljkbfalhfasvfkjabskldfbkjsdfbkdashfvdjhfhb;kfjv;hfv;fjbafhb;akfd",
        "relevantInvestigation":"asdkfhgasdlfhabsdlfjhalsfdjh",
        "consanguinity": false
    },
    "familyMembersModule": {
        "familyMembers": [
            {
                "familyMemberDetails": {
                    "lastName": "Blah",
                    "firstName": "Mother",
                    "dob": "2020-02-02",
                    "medicalRecordNo": "adsa",
                    "gender": "Female",
                    "genderOther": "",
                    "ethnicity": "",
                    "deceased": false,
                    "sampleSource": "",
                    "consent": true
                },
                "familyMemberClinicalInfo": {
                    "clinicalInfo": "adssda",
                    "affected": true,
                    "consanguinityInfo": "asjhdasbdlkahsdjb",
                    "familyHistory": "kasdfbljkbfalhfasvfkjabskldfbkjsdfbkdashfvdjhfhb;kfjv;hfv;fjbafhb;akfd",
                    "relevantInvestigation":"asdkfhgasdlfhabsdlfjhalsfdjh",
                    "consanguinity": false
                }
            }
        ]
    },
    "clinicianDetailsModule": {
        "providerNumber": "123123",
        "medicalSpecialty": "IBD",
        "firstName": "Boaty",
        "lastName": "McBoatFace",
        "organisation": "Garvan Institute",
        "phone": "12390098123",
        "email": "slkjs@alkjs.com",
        "fax": "",
        "copy": false,
        "copyToHCP": [
                {
                    "firstName": "Hello",
                    "lastName": "World",
                    "organisation": "Some organisation",
                    "email": "hello@world.com"
                }
        ],
    },
    "billingInfoModule": {
        "billOption": "Private",
        "payer": "Joshua Agudo",
        "phone": "1231232131",
        "firstName": "Joshua",
        "lastName": "Agudo",
        "payerEmail": "joshua.agudo@genome.one",
        "consent": true
    },
    "signature": false,
    "id": 1
  }
];

describe('View test', () => {
  test('View page renders without crashing', () => {
    const page = renderer.create(React.createElement(View)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleChange works', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(View));
    const selection = { "target": { 
      "value": 1,
      "name": "testRequestId"
    }};
    page.handleChange(selection);
    expect(page.state.form.testRequestId).toEqual(1);
    expect(page.state.testRequestList.length).toEqual(0); 
  });
  
  test('handleSearchById search for one test request', async () => {
    FetchMock.get('*', { "data": mockData[0]  });
    const page = TestUtils.renderIntoDocument(React.createElement(View));
    const selection = { "target": { 
      "value": 1,
      "name": "testRequestId"
    }};
    page.handleChange(selection);
    await page.handleSearchById();
    expect(page.state.testRequestList[0].id).toEqual(1);
    FetchMock.restore();
  });
  
  test('handleSearchById search fails occur when no input is done', async () => {
    FetchMock.get('*', { "data": mockData[0]  });
    const page = TestUtils.renderIntoDocument(React.createElement(View));
    await page.handleSearchById();
    expect(page.state.testRequestList.length).toEqual(0);
    FetchMock.restore();
  });
  
  test('handleSearchByPatientDetails search for one test request', async () => {
    FetchMock.get('*', { "data": mockData  });
    const page = TestUtils.renderIntoDocument(React.createElement(View));
    const selection1 = { "target": { 
      "value": "Joshua",
      "name": "firstName"
    }};
    const selection2 = { "target": { 
      "value": "Agudo",
      "name": "lastName"
    }};
    const selection3 = { "target": { 
      "value": "2020-02-02",
      "name": "dob"
    }};
    page.handleChange(selection1);
    page.handleChange(selection2);
    page.handleChange(selection3);
    await page.handleSearchByPatientDetails();
    expect(page.state.testRequestList.length).toEqual(1);
    FetchMock.restore();
  });
  
  test('handleSearchByPatientDetails search fails occur when no input is done', async () => {
    FetchMock.get('*', { "data": mockData  });
    const page = TestUtils.renderIntoDocument(React.createElement(View));
    await page.handleSearchByPatientDetails();
    expect(page.state.testRequestList.length).toEqual(0);
    FetchMock.restore();
  });
})