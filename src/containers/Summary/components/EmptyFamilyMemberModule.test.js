import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import EmptyFamilyMemberModule from './EmptyFamilyMemberModule';

function getStep(value) {
  return value;
}
describe('EmptyFamilyMemberModule test', () => {
  const props = {
    handleOnClick: getStep
  };
    
  test('renders without crashing ', () => {
    const page = renderer.create(React.createElement(EmptyFamilyMemberModule, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleOnClick test', () => {
    var page = TestUtils.renderIntoDocument(
      <EmptyFamilyMemberModule
              handleOnClick={getStep}/>
    );
    expect(page.props.handleOnClick('step4')).toEqual('step4');
    expect(page.handleOnClick()).toEqual(4);
  });
});
