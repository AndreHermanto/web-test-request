import React from 'react';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FamilyMember from './index';

describe('<FamilyMember/>', function() {
  var props = {
    route: {
      onChange: jest.fn(),
      onDelete: jest.fn()
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
  
  test('handleDeleteFamilyMember deletes the appointed object in familyMember array and closes the modal', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));
    view.state.form.familyMember = [
      { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} },
      { FamilyMemberDetails: {}, FamilyMemberClinicalInfo: {} }
    ];
    var select = { currentTarget: { name: 0 } }
    view.handleDeleteFamilyMember(select);
    expect(view.state.deleteModal.familyMemberId).toEqual(null);
    expect(view.state.deleteModal.display).toEqual(false);
  });
  
  test('handleEditFamilyMember redirects correctly', () =>  {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));
    var select = { currentTarget: { name: 3 }}
    view.handleEditFamilyMember(select);
    expect(view.props.router.pop()).toEqual('/step4/edit/1/3')
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
  
  test('closeDeleteModal hides the modal by setting the deleteModal - display state', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));                                         
    view.closeDeleteModal();
    expect(view.state.deleteModal.display).toEqual(false);
  });
  
  test('openDeleteModal hides the modal by setting the deleteModal - display state', () => {
    var view = TestUtils.renderIntoDocument(React.createElement(FamilyMember, props));
    var select = { currentTarget: { name: 0 } }
    view.openDeleteModal(select);
    expect(view.state.deleteModal.display).toEqual(true);
  });
});