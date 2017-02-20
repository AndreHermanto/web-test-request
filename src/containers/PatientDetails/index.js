import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel,
  Radio
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
import Input from './../../components/Input';
import DatePicker from './../../components/DatePicker';

/**
 * PatientDetails - UI for input patient details.
 */
class PatientDetails extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = initData();
  }
  
  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
  }
  
  handleBack() {
    this.props.router.push('/step1');
  }
  
  handleNext(passValidation) {
    if(!passValidation) return false;
    this.props.route.onChange(this); 
    this.props.router.push('/step3');
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
        <PageHeading>Step 2: Patient Details</PageHeading>
        <Input
          field="lastName"
          label="Surname"
          onChange={this.handleChange}
          onValidate={this.validate()}
          required
        />

        <Input
          field="firstName"
          label="Given Name"
          onChange={this.handleChange}
          onValidate={this.validate()}
          required
        />
        
        <DatePicker
          field="dob"
          label="Date of Birth"
          onChange={this.handleChange}
          onValidate={this.validate()}
          required
        />                      

        <Input
          field="medicalRecordNo"
          label="Medical Record Number"
          onChange={this.handleChange}
          onValidate={this.validate()}
          optional
        />
      
        <FormGroup onChange={this.handleChange}>
          <ControlLabel>Gender</ControlLabel>
          <br />
          <Radio name="gender" value="male" inline>
            Male
          </Radio>
          <Radio name="gender" value="female" inline>
            Female
          </Radio>
          <Radio name="gender" value="unknown" defaultChecked inline>
            Unknown
          </Radio>
          <Radio name="gender" value="other" inline>
            Other
          </Radio>
      
          {(this.state.form.gender === 'other') && (
          <Input
            field="genderOther"
            placeholder="Enter a gender type other than male/female/unknown"
            onChange={this.handleChange}
            style={{ marginTop: 8 }}
          />   
          )}
        </FormGroup>
      
        <Input
          field="ethnicity"
          label="Ethnicity"
          onChange={this.handleChange}
          optional
        />
        
        <FormGroup>
          <ControlLabel>Is this person deceased?</ControlLabel>
          <br />
          <Toggle
            name='deceased'
            onChange={this.handleChange} />
            
          {this.state.form.deceased && (
            <Input
              field="sampleSource"
              label="Sample Source"
              onChange={this.handleChange}
              optional
            />
          )}
        </FormGroup>
            
        <FormGroup>
          <ControlLabel>Consent confirmation</ControlLabel>
          <br />
          <Toggle
            name='consent'
            onChange={this.handleChange} />
            
          {this.state.form.consent && (
            <p style={{ fontSize: 11, fontStyle: 'italic'}}>
            I confirm that the Genome.One Privacy Collection Statement has been provided to the patient and that I have received written informed consent for genomic testing
            </p> 
          )}
        </FormGroup>

        <Input
          field="email"
          label="Email"
          onChange={this.handleChange}
          onValidate={this.validate()}
          optional
        />
      
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

export default PatientDetails;