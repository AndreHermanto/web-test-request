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
 * PatientDetails - UI for input patient details.
 */
class ClinicalInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
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
          label="Family history"
          helper="Please describe the family history, or attach a scanned pedigree."
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
          Confirm
        </FormButton> 
      </div>
    );
  }
}

export default ClinicalInfo;