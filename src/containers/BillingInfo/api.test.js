import React from 'react';
import FetchMock from 'fetch-mock';
import { getPricing } from './api';

describe('OrderTest: api', () => {
  test('fetch GET a pricing breakdown', async () => {
    FetchMock.get('*', {
      "data": {
        "panelId": "58c8d11eaaa0a30c0d56a07d",
        "payer": "St Vincent's Hospital, Darlinghurst NSW",
        "familyExtras": 3,
        "breakdown": [
          {
            "description": "Hypertrophic Cardiomyopathy (HCM), Core Panel",
            "price": 2300
          },
          {
            "description": "Extra Family Member",
            "price": 2000
          },
          {
            "description": "Extra Family Member",
            "price": 2000
          },
          {
            "description": "Extra Family Member",
            "price": 2000
          },
          {
            "description": "TOTAL PRICE",
            "price": 8300
          }
        ]
      }
    });
    await getPricing()
      .then((response) => {
        expect(response.breakdown.length > 0).toEqual(true); 
      });
    FetchMock.restore();
  });
});
