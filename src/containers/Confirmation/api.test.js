import React from 'react';
import FetchMock from 'fetch-mock';
import { 
  getTestRequestById
} from './api';

describe('OrderTest: api', () => {
  var mockData = { data: {
    "orderTestModule":{"test":{"id":"58e5a5c21020a1e8075ed311","label":"Atrial Fibrillation","geneLists":[{"type":"complete","genes":["EMD","GJA5","KCNA5","NPPA","NUP155","SCN1B","SCN2B","SCN3B","SCN4B","SCN5A"],"id":"complete","label":"Complete"}]}},"patientDetailsModule":{"lastName":"asdf","firstName":"asdf","dob":"1111-11-11","medicalRecordNo":"","gender":"Unknown","genderOther":"","ethnicity":"","deceased":false,"sampleSource":"","consent":true},"clinicalInfoModule":{"clinicalInfo":"asdfasdf","relevantInvestigation":"","familyHistory":"","consanguinityInfo":"","consanguinity":false},"familyMembersModule":{"familyMembers":[]},"clinicianDetailsModule":{"providerNumber":"","medicalSpecialty":"asdf","firstName":"asdf","lastName":"asdf","organisation":"asdf","phone":"123","email":"a@a.aa","fax":"","copyToHCP":[],"copy":false},"billingInfoModule":{"billOption":"Institution","payer":"asdf","phone":"","firstName":"","lastName":"","payerEmail":"","consent":true,"billPrice":100},"signature":true, "id": 1
  } };
  
  test('fetch GET a list of test', async () => {
    FetchMock.get('*', mockData);
    await getTestRequestById(1)
      .then((data) => {
        expect(data.id).toEqual(1); 
      });
    FetchMock.restore();
  });
});
