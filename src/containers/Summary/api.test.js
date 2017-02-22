import React from 'react';
import FetchMock from 'fetch-mock';
import { submitTestRequest } from './api';

describe('OrderTest: api', () => {
  test('fetch POST a list of test', async () => {
    FetchMock.post('*', {data: [
      { "id": "test1", "label": "Test1" },
      { "id": "test2", "label": "Test2" },
      { "id": "test3", "label": "Test3" }
    ]});
    await submitTestRequest()
      .then((response) => {
        expect(response.ok).toEqual(true);
      });
    FetchMock.restore();
  });
});
