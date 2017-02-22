import React from 'react';
import FetchMock from 'fetch-mock';
import { 
  getTestList, 
  getTest
} from './api';

describe('OrderTest: api', () => {
  test('fetch GET a list of test', async () => {
    FetchMock.get('*', {data: [
      { "id": "test1", "label": "Test1" },
      { "id": "test2", "label": "Test2" },
      { "id": "test3", "label": "Test3" }
    ]});
    await getTestList()
      .then((response) => {
        expect(response.length > 0).toEqual(true); 
      });
    FetchMock.restore();
  });
});
