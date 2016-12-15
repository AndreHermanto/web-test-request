import React from 'react';
import FetchMock from 'fetch-mock';
import { getTestList, getGeneList } from './../Apis';

describe('Apis', () => {
  it('fetch GET a list of test', async () => {
    FetchMock.get('*', ['Test1','Test2','Test3']);
    await getTestList()
      .then((testList) => {
        expect(testList.length > 0).toEqual(true); 
      });
    FetchMock.restore();
  });
  
  it('fetch GET a test object containing a gene list', async () => {
    FetchMock.get('*', {
      "id": "test1",
      "form": {
          "name": "Hello world"
      },
      "genelists": [{
          "disorder": "xxx1",
          "genes": ["gene1", "gene2"]	
          }, {
          "disorder": "xxx2",
          "genes": ["gene1", "gene2"]	
      }]
    });
    await getGeneList()
      .then((geneList) => {
        expect(geneList.length > 0).toEqual(true); 
      });
    FetchMock.restore();
  });
});
