import React, { Component } from 'react';
import {
  initData,
  setFormData,
  validatedToTrue
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import TextArea from './../../components/TextArea';
import Toggle from './../../components/Toggle';

/**
 * FamilyMemberClinicalInfo - UI for input patient details.
 */
class FamilyMemberClinicalInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    
    var prefill, prefillClinical;
    if(props.route.data) prefill = props.route.data.familyMember[props.params.id].FamilyMemberClinicalInfo;
    if(props.route.clinicalInfoData) prefillClinical = props.route.clinicalInfoData.familyHistory
    this.state = initData(prefill, prefillClinical);
  }
  
  componentWillMount() {
    if(!this.props.route.data) this.props.router.push('/step4');
  }
  
  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
  }
  
  handleCancel() {
    if(this.props.params.mode === 'add') this.props.route.onDelete(this.props.params.id);
    this.props.router.push('/step4');
  }
  
  handleBack() {
    this.props.route.onChange(this);
    this.props.router.push(`/step4/${this.props.params.mode}/1/${this.props.params.id}`);
  }
  
  handleNext(passValidation) {
    if(!passValidation) return false;
    this.props.route.onChange(this);
    this.props.router.push('/step4');
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
  
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }
  
  render() {
    return (
      <div>
        <PageHeading>Step 4-2: {this.props.params.mode} family member {(this.props.params.mode === 'edit') &&  `(${this.props.route.data.familyMember[this.props.params.id].FamilyMemberDetails.firstName} ${this.props.route.data.familyMember[this.props.params.id].FamilyMemberDetails.lastName})`} - clinical info</PageHeading>
        <TextArea
          field="clinicalInfo"
          label="Provide Clinical Information"
          helper="Type or copy and paste clinical notes here. Comprehensive notes increase the chance of a successful diagnosis."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />
            
        <Toggle
          field="affected"
          label="Affected"
          onChange={this.handleChange}
          formState={this.state.form}
        />

        <TextArea
          field="relevantInvestigation"
          label="Provide results from relevant investigations"
          helper="Provide notes from genetic tests, imaging results."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          optional
        />
            
        <TextArea
          field="familyHistory"
          label="Family history"
          helper="Provide notes on the suspected inheritance model and affected relatives."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          optional
        />
            
        <Toggle
          field="consanguinity"
          label="Consanguinity"
          onChange={this.handleChange}
          formState={this.state.form}
        />
            
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
        {
          this.props.route.isEdited !== true &&
          <FormButton  
            onClick={this.handleCancel}
            back
          >
            Cancel
          </FormButton> 
        }
      
        <FormButton  
          type="submit" 
          onClick={this.handleConfirm}
        >
          Confirm
        </FormButton> 
      </div>
    );
  }
}

export default FamilyMemberClinicalInfo;