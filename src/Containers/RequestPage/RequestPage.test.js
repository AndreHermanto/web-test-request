import React from 'react';
import ReactDOM from 'react-dom';
import fetchMock from 'fetch-mock';
import renderer from 'react-test-renderer';
import RequestPage from './index';

describe('App testing', () => {
  it('RequestPage renders without crashing', () => {
    fetchMock.get('*', [{id:'1',label:'a'},{id:'2',label:'b'},{id:'3',label:'c'}]);
    const tree = renderer.create(<RequestPage />).toJSON();
    expect(tree).toMatchSnapshot();
    fetchMock.restore();
  });
});
