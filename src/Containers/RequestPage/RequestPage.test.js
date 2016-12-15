import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import RequestPage from './index';

describe('RequestPage', () => {
  it('renders without crashing', () => {
    const tree = renderer.create(
      <RequestPage testList={['test1','test2','test3']} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
