import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FamilyMember from './index';

describe('<FamilyMember/>', function() {
  var props = {
    route: {
      onChange: jest.fn()
    },
    patientData:{
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      dob: '1-March-1985'
    },
    data:{},
    router:[]
  };

  test('renders without crashing', () => {
    const page = renderer.create(React.createElement(FamilyMember, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleAddFamilyMember adds an object in familyMember array', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));                                         
    view.handleAddFamilyMember();
    expect(view.state.form.familyMember.length).toEqual(1)
  });
  
  test('handleDeleteFamilyMember adds an object in familyMember array', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));
    view.state.form.familyMember = [{},{}];
    var select = { target: { name: 0 } }
    view.handleDeleteFamilyMember(select);
    expect(view.state.form.familyMember.length).toEqual(1)
  });
  
  test('handleBack works', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));                                         
    view.handleBack();
    expect(view.props.router.pop()).toEqual('/step3')
  });
  
  test('handleNext works', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));                                         
    view.handleNext(true);
    expect(view.props.router.pop()).toEqual('/step5');
  });
});