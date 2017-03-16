import React from 'react';
import FetchMock from 'fetch-mock';
import { 
  getInvoice
} from './api';

describe('Invoice API', () => {
  test('fetch GET an invoice', async () => {
    let Invoice = [
    {
      "id": "test",
      "description": "Dicta qui animi aut sit maxime."
    },
    {
      "id": "test2",
      "description": "Dicta qui animi aut sit maxime."
    },
    {
      "id": "test3",
      "description": "Dicta qui animi aut sit maxime."
    }
    ];

    FetchMock.get('*',Invoice);
    await getInvoice({user: "test"})
      .then((response) => { 
        expect(response).toEqual(Invoice.data);
      }).catch(function(e) {
        console.log(e);
      });
    FetchMock.restore();
  });
});