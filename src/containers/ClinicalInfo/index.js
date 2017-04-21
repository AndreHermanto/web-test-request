import React, { Component } from 'react';
import {
  Button,
  Glyphicon,
  Modal
} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import {
  initData,
  setFormData,
  setIsUploading,
  addAttachment,
  removeAttachment,
  setDeleteModal,
  validatedToTrue
} from './reducer'
import { upload } from './api'
import { 
  PageHeading,
  FormButton,
  Helper,
  FileList,
  FileLink,
  SubLabel
} from './../../components/SharedStyle';
import TextArea from './../../components/TextArea';
import Toggle from './../../components/Toggle';
import styled from 'styled-components';
import './spin.css';

const FileRemove = styled(Button)`
  color: #d66 !important; 
  float: right;
  margin-top: 8px;
  padding-left: 18px;
`;

const SpinningLogo = styled(Glyphicon)`
  margin-left: 16px;
  -webkit-animation: spin 1000ms infinite linear;
  animation: spin 1000ms infinite linear;  
`;

const AttachmentHeader = styled.label`
  display: inline-block;
  max-width: 100%;
  font-weight: bold;
`;

/**
 * PatientDetails - UI for input patient details.
 */
class ClinicalInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleRemoveAttachment = this.handleRemoveAttachment.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.openFileSelect = this.openFileSelect.bind(this);
    this.state = initData(props.route.data);
  }
  
  componentDidMount() {
    if(this.props.route.preventUnvisitedFormAccess) {
      this.props.router.setRouteLeaveHook(this.props.route, this.props.route.preventUnvisitedFormAccess.bind(this));
    }
  }
  
  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
  }
  
  handleDrop(acceptedFiles) {
    this.setState(setIsUploading(this.state, true));
    
    return upload(acceptedFiles[0])
      .then((json) => {
        this.setState(addAttachment(this.state, acceptedFiles[0], json.data.id), 
          () => this.setState(setIsUploading(this.state, false)));
      })
  }

  handleRemoveAttachment() {
    this.setState(removeAttachment(this.state, this.state.deleteModal.fileId),
    () => this.closeDeleteModal());
  }
  
  handleBack() {
    this.props.route.onChange(this);
    this.props.router.push('/step2');
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
      this.props.router.push('/step4'); 
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
  
  openFileSelect() {
    this.refs.dropzone.open();
  }
  
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }
  
  render() {
    return (
      <div>
        <PageHeading>Step 3: Clinical Information</PageHeading>
        <TextArea
          field="clinicalInfo"
          label="Provide Clinical Information"
          helper="Type or copy and paste clinical notes and the diagnosis here. Comprehensive notes increase the chance of a successful diagnosis."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />

        <TextArea
          field="relevantInvestigation"
          label="Provide results from relevant investigations"
          helper="Provide notes from genetic tests, imaging results, etc."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          optional
        />
            
        <TextArea
          field="familyHistory"
          label="Family History"
          helper="Please describe the family history."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          optional
        />
        
        <AttachmentHeader>Attachments<SubLabel>Optional</SubLabel></AttachmentHeader>
        <Helper style={{ margin: '0 0 4px 0' }}>Please upload any relevant attachments e.g. a scanned pedigree</Helper>
        <Dropzone 
          onDrop={this.handleDrop} 
          disableClick={true}
          ref="dropzone"
          style={{
            width: '100%',
            padding: 16,
            marginBottom: 24,
            border: '1px dashed #aaa'       
          }}
        >
          
          {
            (this.state.form.attachments.length > 0) &&
            <div style={{ marginBottom: 24 }}>
              { 
                this.state.form.attachments.map((attachment, $index) => {
                  return <FileList key={$index}>
                    <FileLink bsStyle="link" onClick={() => window.open(attachment.preview, '_blank')}>
                      <Glyphicon glyph="file"/> {attachment.filename}
                    </FileLink>

                    <FileRemove 
                      bsSize="xsmall" 
                      bsStyle="link"
                      name={$index}
                      onClick={this.openDeleteModal}
                    >
                      <Glyphicon glyph="trash"/> Remove
                    </FileRemove>
                  </FileList>
                })
              }
            </div>
          }
          
          <FormButton style={{ margin: '12px 0' }} onClick={this.openFileSelect}>
            Upload Attachment
          </FormButton>
            
          {
            this.state.isUploading && 
              <span>
                <SpinningLogo glyph="refresh" /> Uploading...
              </span>
          }
        </Dropzone>
        
        <Modal show={this.state.deleteModal.display} onHide={this.closeDeleteModal} style={{ paddingRight: 12 }}>
          <Modal.Header closeButton>
            <Modal.Title>
              Remove attachment ({
                (this.state.form.attachments[this.state.deleteModal.fileId]) && (
                  this.state.form.attachments[this.state.deleteModal.fileId].filename
                )
              })
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to remove this attachment?
          </Modal.Body>
          <Modal.Footer>
            <FormButton onClick={this.closeDeleteModal} back>Cancel</FormButton>
            <FormButton
              onClick={this.handleRemoveAttachment}
              cancel
            >
              <Glyphicon glyph="trash" /> Delete
            </FormButton>
          </Modal.Footer>
        </Modal>    
            
        <Toggle
          field="consanguinity"
          label="Consanguinity"
          onChange={this.handleChange}
          checked={this.state.form.consanguinity === true}
          formState={this.state.form}
        />

        {this.state.form.consanguinity && (
          <TextArea
            field="consanguinityInfo"
            helper="Please provide details"
            onChange={this.handleChange}
            formState={this.state.form}
          />
        )}

        {
          this.props.route.isEdited !== true &&
          <FormButton 
            onClick={this.handleBack}
            disabled={this.state.isUploading}
            label="Back"
            back
          >
            Back
          </FormButton> 
        }
      
        <FormButton  
          type="submit" 
          onClick={this.handleConfirm}
          disabled={this.state.isUploading}
        >
          Next
        </FormButton> 
      </div>
    );
  }
}

export default ClinicalInfo;