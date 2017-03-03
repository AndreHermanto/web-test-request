import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

import Toggle from 'react-toggle';
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
          placeholder="Type or copy and paste clinical notes here. Comprehensive notes increase the chance of a successful diagnosis."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />

        <TextArea
          field="relevantInvestigation"
          label="Provide results from relevant investigations"
          placeholder="Provide notes from genetic tests, imaging results."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          optional
        />
            
        <TextArea
          field="familyHistory"
          label="Family history"
          placeholder="Provide notes on the suspected inheritance model, affected relatives, or drop a scan of a pedigree."
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          optional
        />
        
        <FormGroup>
          <ControlLabel>Consangunity</ControlLabel>
          <br />
          <Toggle
            name="consangunity"
            checked={this.state.form.consangunity === true}
            onChange={this.handleChange} />
        </FormGroup>
            
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
          onClick={this.handleConfirm}
        >
          Confirm
        </FormButton> 
      </div>
    );
  }
}

export default ClinicalInfo;