import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FetchMock from 'fetch-mock';
import Confirmation from './index';
import { NotificationManager } from 'react-notifications';

const data = {
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
    "signature": false
}


const confirmationData = {
  id:1,
  orderTestModule: data.orderTestModule,
  patientDetailsModule: data.patientDetailsModule,
  clinicalInfoModule: data.clinicalInfoModule,
  familyMembersModule: data.familyMembersModule,
  clinicianDetailsModule:data.clinicianDetailsModule,
  billingInfoModule: data.billingInfoModule
}

const props = {
  route: {
    onChange: jest.fn(),
    onClean: jest.fn(),
    isReSubmit: false,
    data: confirmationData
  },
  params: { id: 1 },
  router:['/step1']
};

const resubmitProps = {
  route: {
    onChange: jest.fn(),
    onClean: jest.fn(),
    isReSubmit: true,
    data: confirmationData
  },
  params: { id: 1 },
  router:['/step1']
};

describe('Confirmation test', () => {
  NotificationManager.addListener = jest.fn();
  test('Confirmation page renders without crashing', () => {
    const page = renderer.create(React.createElement(Confirmation, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('componentWillMount', async () => {
    const page = TestUtils.renderIntoDocument(React.createElement(Confirmation, resubmitProps));
    expect(NotificationManager.addListener).toHaveBeenCalled();
  });
  
  test('handlePrintRecordButtonClick changes the print state to 1', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(Confirmation, props));
    page.state.form = confirmationData;
    page.handlePrintRecordButtonClick();
    expect(page.state.print).toEqual(1);
    page.handlePrintButtonClick(2);
    expect(page.state.print).toEqual(2);
  });
  
  test('handlePrintBloodCollectionButtonClick changes the print state to 2', () => {
    const page = TestUtils.renderIntoDocument(React.createElement(Confirmation, props));
    page.state.form = confirmationData;
    page.handlePrintBloodCollectionButtonClick();
    expect(page.state.print).toEqual(2);
  });

  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(Confirmation, props));                                         
    view.handleRedirect('home');
    expect(view.props.router.pop()).toEqual('/step1');
    expect(view.handleRedirect('genome')).toEqual('genome');    
  });
});
