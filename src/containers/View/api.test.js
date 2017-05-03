import React from 'react';
import FetchMock from 'fetch-mock';
import { 
  getTestRequestById,
  getTestRequestByPatientInfo
} from './api';

var mockData = [
  {id: 1, patientDetailsModule: { firstName: 'AA', lastName: 'BB', dob: '1111-11-11' }},
  {id: 3, patientDetailsModule: { firstName: 'AA', lastName: 'BB', dob: '1111-11-11' }},
  {id: 4, patientDetailsModule: { firstName: 'AA', lastName: 'BB', dob: '1111-11-11' }}
]

describe('View: api', () => {
  test('getTestRequestById retrieves one particular test request', async () => {
    FetchMock.get('*', { "data": mockData[1] });
    await getTestRequestById(3, 'admin', 'secret')
      .then((response) => {
        expect(response.patientDetailsModule.firstName).toEqual('AA'); 
      });
    FetchMock.restore();
  });
  
  test('getTestRequestByPatientInfo retrieves a list of related test requests', async () => {
    FetchMock.get('*', { "data": mockData });
    await getTestRequestByPatientInfo('AA', 'BB', '1111-11-11', 'admin', 'secret')
      .then((response) => {
        expect(response.length).toEqual(3); 
      });
    FetchMock.restore();
  });
});
