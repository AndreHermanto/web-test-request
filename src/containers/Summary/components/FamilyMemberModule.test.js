import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';
import FamilyMemberModule from './FamilyMemberModule';

function getStep(value) {
  return value;
}
describe('FamilyMemberModule test', () => {
  const member = {
      "FamilyMemberDetails":{"lastName":"abc@abc.com","firstName":"abc@abc.com","dob":"2-January-1918","medicalRecordNo":"abc@abc.com","gender":"Female","genderOther":"","ethnicity":"","deceased":false,"sampleSource":"","consent":false,"email":"abc@abc.com"},
      "FamilyMemberClinicalInfo":{"clinicalInfo":"abc@abc.com","affected":true,"relevantInvestigation":"asdasdasd","familyHistory":"asdasdasdasd","consangunity":false,     consanguinityInfo: "asjhdasbdlkahsdjb"}
  };  

  const props = {
    familyMemberDetails: member.FamilyMemberDetails,
    familyMemberClinicalInfo: member.FamilyMemberClinicalInfo,
    handleOnClick: getStep
  };
    
  test('renders without crashing ', () => {
    const page = renderer.create(React.createElement(FamilyMemberModule, props)).toJSON();
    expect(page).toMatchSnapshot();
  });
  
  test('handleOnClick test', () => {
    var page = TestUtils.renderIntoDocument(
      <FamilyMemberModule familyMemberDetails={member.FamilyMemberDetails} familyMemberClinicalInfo={member.FamilyMemberClinicalInfo}
              handleOnClick={getStep}/>
    );
    expect(page.props.handleOnClick('step4')).toEqual('step4');
    expect(page.handleOnClick()).toEqual(4);
  });
});
