import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {setTestList} from './../rootReducer';

describe('rootReducer', () => {
  let TestParent;
  let component;
  
  beforeEach(() => {
    TestParent = React.createClass({
      getInitialState() {
          return {};
      },
      render() {
          return <div />;
      }
    });
    component = TestUtils.renderIntoDocument(<TestParent/>);
  });
  
  it('setTestList works', () => {
    const list = ['Test1','Test2','Test3'];
    component.setState(setTestList(list));
    expect(component.state.testList).toEqual(list);
  });
});
