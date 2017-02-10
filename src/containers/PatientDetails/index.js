import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Radio
} from 'react-bootstrap';

import Toggle from 'react-toggle';
import {
  initData,
  setFormData
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
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
  
  handleConfirm() {
    this.props.route.onChange(this);
    this.props.router.push('/step3');
  }
  
  render() {
    return (
      <div>
        <PageHeading>Step 2: Patient Details</PageHeading>
        <FormGroup required>
          <ControlLabel>Surname</ControlLabel>
          <FormControl
            type="text"
            name="lastName"
            placeholder="Enter the surname"
            onChange={this.handleChange}
          />
        </FormGroup>
        
        <FormGroup required>
          <ControlLabel>Given Name</ControlLabel>
          <FormControl
            type="text"
            name="firstName"
            placeholder="Enter the given name"
            onChange={this.handleChange}
          />
        </FormGroup>
        
        <FormGroup required>
          <ControlLabel>Date of Birth</ControlLabel>
          <DatePicker
            name="dob"
            onChange={this.handleChange}  
          />                      
        </FormGroup>
          
        <FormGroup>
          <ControlLabel>Medical Record Number</ControlLabel>
          <FormControl
            type="text"
            name="medicalRecordNo"
            placeholder="Enter the medical record number"
            onChange={this.handleChange}
          />
        </FormGroup>
      
        <FormGroup onChange={this.handleChange}>
          <ControlLabel>Gender</ControlLabel>
          <br />
          <Radio name="gender" value="male" inline>
            Male
          </Radio>
          <Radio name="gender" value="female" inline>
            Female
          </Radio>
          <Radio name="gender" value="unknown" inline>
            Unknown
          </Radio>
          <Radio name="gender" value="other" inline>
            Other
          </Radio>
      
          {(this.state.form.gender === 'other') && (
          <FormControl
            type="text"
            name="genderOther"
            placeholder="Enter a gender type other than male/female/unknown"
            onChange={this.handleChange}
            style={{ marginTop: 8 }}
          />   
          )}
        </FormGroup>
      
        <FormGroup>
          <ControlLabel>Ethnicity</ControlLabel>
          <FormControl
            type="text"
            name="ethnicity"
            placeholder="Enter the ethnicity"
            onChange={this.handleChange}
          />
        </FormGroup>
      
        <FormGroup>
          <ControlLabel>Is this person deceased?</ControlLabel>
          <br />
          <Toggle
            name='deceased'
            onChange={this.handleChange} />
            
          {this.state.form.deceased && (
            <FormGroup>
              <ControlLabel>Sample Source</ControlLabel>
              <FormControl
                type="text"
                name="sampleSource"
                placeholder="Enter the sample source"
                onChange={this.handleChange}
              />
            </FormGroup>
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

        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            name="email"
            placeholder="Enter the email"
            onChange={this.handleChange}
          />
        </FormGroup>
      
        <FormButton 
          bsStyle="warning" 
          onClick={this.handleBack}
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