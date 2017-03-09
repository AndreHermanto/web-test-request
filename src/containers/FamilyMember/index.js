import React, { Component } from 'react';
import {
  Thumbnail,
  Glyphicon,
  Row,
  Col,
  Button,
  Label
} from 'react-bootstrap';
import {
  initData,
  addFamilyMember
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import styled from 'styled-components';

export const BlockButton = styled(Button)`
  margin-left: 6px;
  float: right;
`;

export const Tag = styled(Label)`
  margin-left: 16px;
`;

/**
 * FamilyMember - a hub page to insert, edit and delete family member of the patient.
 */
class FamilyMember extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleAddFamilyMember = this.handleAddFamilyMember.bind(this);
    this.handleDeleteFamilyMember = this.handleDeleteFamilyMember.bind(this);
    this.handleEditFamilyMember = this.handleEditFamilyMember.bind(this);
    this.state = initData(props.route.data);
  }
  
  handleAddFamilyMember() {
    return this.setState(addFamilyMember(this.state, this.state.form.familyMember), () => {
      this.props.route.onChange(this);
      this.props.router.push(`/step4/add/1/${(this.state.form.familyMember.length - 1)}`)
    });
  }
  
  handleDeleteFamilyMember(event) {
    this.props.route.onDelete(event.currentTarget.name);
  }
  
  handleEditFamilyMember(event) {
    this.props.route.onChange(this);
    this.props.router.push(`/step4/edit/1/${event.currentTarget.name}`);
  }
  
  handleBack() {
    this.props.route.onChange(this);
    this.props.router.push('/step3');
  }
  
  handleNext() {
    this.props.route.onChange(this);
    this.props.router.push('/step5');
  }

  render() {
    return (
      <div>
        <PageHeading>Step 4: Family Members</PageHeading>
        <Row>
          <Col md={12}>
            <Thumbnail>
              <label>Patient: </label> {this.props.route.patientData && this.props.route.patientData.firstName + ' ' + this.props.route.patientData.lastName}<br />
              <label>DOB: </label> {this.props.route.patientData && this.props.route.patientData.dob}<br />
              <label>Gender: </label> {this.props.route.patientData && this.props.route.patientData.gender}
            </Thumbnail>
          </Col>
        </Row>
      
        <br /><br />
        <label>Family members associated with this patient:</label>
        <br />
        <Button onClick={this.handleAddFamilyMember} >
          <Glyphicon glyph="plus"/> Add family member       
        </Button>
        <br /><br />
      
        <Row>
        {this.state.form.familyMember.map((member, $index) => {
          return( 
            <Col md={6} key={$index}>
              <Thumbnail>
                {member.FamilyMemberDetails.firstName + ' ' + member.FamilyMemberDetails.lastName}
                <Tag bsStyle={member.FamilyMemberClinicalInfo.affected ? 'danger' : 'success'}>
                  {member.FamilyMemberClinicalInfo.affected ? 'Affected' : 'Unaffected'}
                </Tag>
            
                <BlockButton 
                  bsSize="xsmall"
                  name={$index}
                  onClick={this.handleEditFamilyMember}
                >
                  <Glyphicon glyph="pencil"/> 
                </BlockButton>
            
                <BlockButton 
                  bsSize="xsmall"
                  name={$index}
                  onClick={this.handleDeleteFamilyMember}
                >
                  <Glyphicon glyph="trash"/>
                </BlockButton>
              </Thumbnail>
            </Col>
          )
        })}
  
        {this.state.form.familyMember.length === 0 && (
          <Col md={12}><br /><i>There is no family member associated with this patient. Please select "Add family member" to include a patients family member to be tested.</i><br /></Col>
        )}
        </Row>

        <FormButton 
          bsStyle="warning" 
          onClick={this.handleBack}
          label="Back"
        >
          Back
        </FormButton> 
       
        <FormButton 
          bsStyle="success" 
          type="submit" 
          onClick={this.handleNext}
        >
          Confirm
        </FormButton>
      </div>
    );
  }
}

export default FamilyMember;