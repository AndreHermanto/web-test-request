import React, { Component } from 'react';
import {
  Thumbnail,
  Glyphicon,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import {
  initData,
  setFamilyMemberArray
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
    this.state = initData(props.route.data);
  }
  
  handleAddFamilyMember() {
    var arr = this.state.form.familyMember.slice();
    arr.push({});
    return this.setState(setFamilyMemberArray(this.state, arr));
  }
  
  handleDeleteFamilyMember(event) {
    var arr = this.state.form.familyMember.slice();
    arr.splice(parseInt(event.target.name, 8), 1);
    return this.setState(setFamilyMemberArray(this.state, arr));
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
        <Button
          className="pull-right"
          onClick={this.handleAddFamilyMember}
        >
          <Glyphicon glyph="plus"/> Add family member       
        </Button>
        <br /><br />
      
        <Row>
        {this.state.form.familyMember.map((q, $index) => {
          return( 
            <Col md={4} key={$index}>
              <Thumbnail>
                Family Member
                <BlockButton bsSize="xsmall">
                  <Glyphicon glyph="pencil"/> 
                </BlockButton>
            
                <BlockButton 
                  bsSize="xsmall"
                  name={$index}
                  onClick={this.handleDeleteFamilyMember}
                >
                  <Glyphicon glyph="trash" name={$index}/>
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