import React, { Component } from 'react';
import {
  Thumbnail,
  Glyphicon,
  Row,
  Col,
  Button,
  Label,
  Modal
} from 'react-bootstrap';
import {
  initData,
  addFamilyMember,
  setDeleteModal
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

export const BlockFamilyContainer = styled(Thumbnail)`
  border-radius: 0px !important;
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
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.state = initData(props.route.data);
  }
  
  componentDidMount() {
    if(this.props.route.preventUnvisitedFormAccess) {
      this.props.router.setRouteLeaveHook(this.props.route, this.props.route.preventUnvisitedFormAccess.bind(this));
    }
  }
  
  handleAddFamilyMember() {
    return this.setState(addFamilyMember(this.state, this.state.form.familyMembers), () => {
      this.props.route.onChange(this);
      this.props.router.push(`/step4/add/1/${(this.state.form.familyMembers.length - 1)}`)
    });
  }
  
  handleDeleteFamilyMember() {
    this.props.route.onDelete(this.state.deleteModal.familyMemberId);
    this.closeDeleteModal();
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
    if(this.props.route.isEdited === true)
    {
      this.props.route.onChange(this);
      this.props.router.push('/summary')
    }
    else {
      this.props.route.onChange(this);
      this.props.router.push('/step5');
    }
  }
  
  closeDeleteModal() {
    this.setState(setDeleteModal(this.state, false, null));
  }

  openDeleteModal(event) {
    this.setState(setDeleteModal(this.state, true, event.currentTarget.name));
  }

  render() {
    return (
      <div>
        <PageHeading>Step 4: Add Family Members who will also provide samples</PageHeading>
        <Row>
          <Col md={12}>
            <BlockFamilyContainer>
              <label>Patient: </label> {this.props.route.patientData && this.props.route.patientData.firstName + ' ' + this.props.route.patientData.lastName}<br />
              <label>DOB: </label> {this.props.route.patientData && this.props.route.patientData.dob}<br />
              <label>Gender: </label> {this.props.route.patientData && this.props.route.patientData.gender}
            </BlockFamilyContainer>
          </Col>
        </Row>
      
        <br /><br />
        <label>Family members associated with this patient:</label>
        <br />
        <FormButton 
          onClick={this.handleAddFamilyMember}
        >
          <Glyphicon glyph="plus"/> Add family member       
        </FormButton>
        <br /><br />
      
        <Row>
        {this.state.form.familyMembers.map((member, $index) => {
          return( 
            <Col md={12} key={$index}>
              <BlockFamilyContainer>
                <Row>
                  <Col md={6}>
                    {member.familyMemberDetails.firstName + ' ' + member.familyMemberDetails.lastName}
                    <Tag bsStyle={member.familyMemberClinicalInfo.affected ? 'danger' : 'success'}>
                      {member.familyMemberClinicalInfo.affected ? 'Affected' : 'Unaffected'}
                    </Tag>
                  </Col>
            
                  <Col md={6}>
                    <BlockButton 
                      bsSize="xsmall"
                      bsStyle="link"
                      name={$index}
                      onClick={this.handleEditFamilyMember}
                    >
                      <Glyphicon glyph="pencil"/> Edit
                    </BlockButton>

                    <BlockButton 
                      bsSize="xsmall"
                      bsStyle="link"
                      name={$index}
                      style={{ color: '#d66' }}
                      onClick={this.openDeleteModal}
                    >
                      <Glyphicon glyph="trash"/> Remove
                    </BlockButton>
                  </Col>
                </Row>
              </BlockFamilyContainer>
            </Col>
          )
        })}
  
        {this.state.form.familyMembers.length === 0 && (
          <Col md={12}><br />There is no family member associated with this patient. Please select "Add family member" to include a patients family member to be tested.<br /></Col>
        )}
        </Row>
        
        <Modal show={this.state.deleteModal.display} onHide={this.closeDeleteModal} style={{ paddingRight: 12 }}>
          <Modal.Header closeButton>
            <Modal.Title>
              Remove family member ({
                (this.state.form.familyMembers[this.state.deleteModal.familyMemberId]) && (
                  this.state.form.familyMembers[this.state.deleteModal.familyMemberId].familyMemberDetails.firstName + ' ' +
                  this.state.form.familyMembers[this.state.deleteModal.familyMemberId].familyMemberDetails.lastName
                )
              })
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this family member?
          </Modal.Body>
          <Modal.Footer>
            <FormButton onClick={this.closeDeleteModal} back>Cancel</FormButton>
            <FormButton
              onClick={this.handleDeleteFamilyMember}
              cancel
            >
              <Glyphicon glyph="trash" /> Delete
            </FormButton>
          </Modal.Footer>
        </Modal>

        {
          this.props.route.isEdited !== true &&
          <FormButton  
            onClick={this.handleBack}
            label="Back"
            back
          >
            Back
          </FormButton> 
        }
       
        <FormButton  
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