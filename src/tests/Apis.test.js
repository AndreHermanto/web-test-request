import React from 'react';
import FetchMock from 'fetch-mock';
import { 
  getTestList, 
  getGeneList,
  submitForm
} from './../Apis';

describe('Apis', () => {
  it('fetch GET a list of test', async () => {
    FetchMock.get('*', { "data": ['Test1','Test2','Test3'] });
    await getTestList()
      .then((response) => {
        expect(response.length > 0).toEqual(true); 
      });
    FetchMock.restore();
  });
  
  it('fetch GET a test object containing a gene list', async () => {
    FetchMock.get('*', {
      "data": {
        "id": "test1",
        "form": {
            "name": "Hello world"
        },
        "geneLists": [{
            "disorder": "xxx1",
            "genes": ["gene1", "gene2"]	
            }, {
            "disorder": "xxx2",
            "genes": ["gene1", "gene2"]	
        }]
      }
    });
    await getGeneList()
      .then((response) => {
        expect(response.length > 0).toEqual(true); 
      });
    FetchMock.restore();
  });


  it('fetch POST the test request form to get a successful response - json with ID', async () => {
    FetchMock.mock('*', { data: { "id": "ABC" } });
  
    await submitForm({ "form": { "name": "Hello world" } })
      .then((response) => {
        expect(response.id).toEqual('ABC'); 
      });
    FetchMock.restore();
  });
  
  it('fetch POST the test request form but failed', async () => {
    FetchMock.mock('*', 406);
  
    await submitForm({ "form": { "name": "Hello world" } })
      .then((response) => {
        expect(response).toEqual(undefined); 
      });
    FetchMock.restore();
  });
});
