import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import RequestPage from './../index';

describe('RequestPage', () => {
  it('renders without crashing - initial state with empty geneList', () => {
    const tree = renderer.create(
      <RequestPage 
        testList={['test1','test2','test3']}
        geneList={[]}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it('renders without crashing - after a test is selected, geneList defined', () => {
    const tree = renderer.create(
      <RequestPage 
        testList={['test1','test2','test3']}
        geneList={[
          {
            "disorder": "xxx1",
            "genes": ["gene1", "gene2"]	
          }, 
          {
            "disorder": "xxx2",
            "genes": ["gene1", "gene2"]	
          }]
        }
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
