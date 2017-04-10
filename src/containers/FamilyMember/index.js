import React, { Component } from 'react';
import {
  Thumbnail,
  Glyphicon,
  Row,
  Col,
  Button,
  Label,
  Modal,
  Well
} from 'react-bootstrap';
import {
  initData,
  addFamilyMember,
  setDeleteModal,
  setOptFamily,
  validatedToTrue
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import styled from 'styled-components';
import { isoToShortDate } from './../../components/dateConvert';
import RadioSet from './../../components/RadioSet';

export const BlockButton = styled(Button)`
  margin-left: 6px;
  float: right;
`;

export const Tag = styled(Label)`
  margin-left: 16px;
  margin-top: 150px;
`;

export const BlockFamilyContainer = styled(Thumbnail)`
  border-radius: 0px !important;
  background-color: #ffffff !important;
  padding: 0px !important; 
`;

export const OptContainer = styled.div`
  margin-left: 5px;
`;

export const Relationship = styled.p`
  margin-top: -4px;
  font-size: x-small;
  color: #6f6f6f;
  margin-bottom: -4px;
`;

export const RelationshipContainer = styled.span`
  font-weight: bold;
  margin-left: 5px;
  margin-right: 5px;
`;

export const FamilyMemberContainer = styled(Well)`
  border-radius: 0px !important;
  background-color: #eee !important;
  background-image: none !important;
`;

/**
 * FamilyMember - a hub page to insert, edit and delete family member of the patient.
 */
class FamilyMember extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleAddFamilyMember = this.handleAddFamilyMember.bind(this);
    this.handleDeleteFamilyMember = this.handleDeleteFamilyMember.bind(this);
    this.handleEditFamilyMember = this.handleEditFamilyMember.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.handleOptFamilyChange = this.handleOptFamilyChange.bind(this);
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
  
  handleNext(passValidation) {
    if(!passValidation) return false;
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
  
  handleConfirm() {
    return this.setState(validatedToTrue(this.state), () => {    
      var pass = true;
      for (var field in this.state.validation) {
        if(this.state.validation[field].status === 'error') pass = false;
      }
      this.handleNext(pass); 
    });
  }

  closeDeleteModal() {
    this.setState(setDeleteModal(this.state, false, null));
  }

  openDeleteModal(event) {
    this.setState(setDeleteModal(this.state, true, event.currentTarget.name));
  }

  handleOptFamilyChange(event){
    this.setState(setOptFamily(this.state,event.target.value))
  }

  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }

  render() {
    return (
      <div>
        <PageHeading>Step 4: Family Members</PageHeading>
        <RadioSet
          label="Are there any family members who will also provide samples?"
          field="optFamily"
          options={['Yes', 'No']}
          formState={this.state.form}
          onChange={this.handleOptFamilyChange}
          onValidate={this.validate()}
          inline={true}
        />

        {this.state.form.optFamily === 'Yes'? 
        <FamilyMemberContainer>
        <br />
        <label>Family members who are to be tested:</label>
        <br />
      
        <Row>
        {this.state.form.familyMembers.map((member, $index) => {
          return( 
            <Col md={12} key={$index}>
              <BlockFamilyContainer>
                <Row>
                  <Col md={6}>
                    {'(' + member.familyMemberDetails.relationship + ') - ' + member.familyMemberDetails.firstName + ' ' + member.familyMemberDetails.lastName }
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

        <FormButton 
          onClick={this.handleAddFamilyMember}
        >
          <Glyphicon glyph="plus"/> Add family member       
        </FormButton>
        
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
        </FamilyMemberContainer>
        : null}

        {this.state.validation.familyMembers.status === "error" && this.state.validation.optFamily.status === null ? 
        <p> {this.state.validation.familyMembers.feedback} </p> : 
        null}
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
          onClick={this.handleConfirm}
        >
          Next
        </FormButton>
      </div>
    );
  }
}

export default FamilyMember;