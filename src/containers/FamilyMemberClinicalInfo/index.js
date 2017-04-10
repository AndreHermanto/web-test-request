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
import RadioSet from './../../components/RadioSet';

/**
 * FamilyMemberClinicalInfo - UI for input patient details.
 */
class FamilyMemberClinicalInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    
    var prefill, prefillClinical;
    if(props.route.data) prefill = props.route.data.familyMembers[props.params.id].familyMemberClinicalInfo;
    if(props.route.clinicalInfoData) prefillClinical = props.route.clinicalInfoData.familyHistory
    this.state = initData(prefill, prefillClinical);
  }
  
  componentDidMount() {
    if(this.props.route.preventUnvisitedFormAccess) {
      this.props.router.setRouteLeaveHook(this.props.route, this.props.route.preventUnvisitedFormAccess.bind(this));
    }
  }
  
  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
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
        <PageHeading>Step 4-2: {this.props.params.mode} family member {(this.props.params.mode === 'edit') &&  `(${this.props.route.data.familyMembers[this.props.params.id].familyMemberDetails.firstName} ${this.props.route.data.familyMembers[this.props.params.id].familyMemberDetails.lastName})`} - clinical info</PageHeading>
 
        <RadioSet
          label="Is the family member affected?"
          field="affected"
          options={[true, false]}
          formState={this.state.form}
          onChange={this.handleChange}
        />

        <TextArea
          field="clinicalInfo"
          label="Provide Clinical Information"
          helper="Type or copy and paste clinical notes and the diagnosis here. Comprehensive notes increase the chance of a successful diagnosis."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required={this.state.form.affected}
          optional={!this.state.form.affected}
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

export default FamilyMemberClinicalInfo;