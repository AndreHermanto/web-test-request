import React from 'react';
import FetchMock from 'fetch-mock';
import { getTestList } from './../Apis';

describe('Apis', () => {
  it('getTestList list out items', async () => {
    FetchMock.get('*', ['Test1','Test2','Test3']);
    await getTestList()
      .then((json) => {
        expect(json.length > 0).toEqual(true); 
      });
  });
});
