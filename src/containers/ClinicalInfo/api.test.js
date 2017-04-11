import React from 'react';
import FetchMock from 'fetch-mock';
import { upload } from './api';

describe('ClinicalInfo: api', () => {
  test('upload works', async () => {
    FetchMock.post('*', { data: { id: 1 } });
    await upload()
      .then((json) => {
        expect(json.data.id).toEqual(1);
      });
    FetchMock.restore();
  });
});
