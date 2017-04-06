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
import Input from './../../components/Input';
import Toggle from './../../components/Toggle';
import RadioSet from './../../components/RadioSet';
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
    this.props.router.push('/step1');
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
      this.props.router.push('/step3'); 
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
        <PageHeading>Step 2: Patient Details</PageHeading>
        <Input
          field="lastName"
          label="Surname"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />

        <Input
          field="firstName"
          label="Given Name"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />
        
        <DatePicker
          field="dob"
          label="Date of Birth"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />                      

        <Input
          field="medicalRecordNo"
          label="Medical Record Number"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          optional
        />

        <RadioSet 
          field="gender"
          label="Gender"
          options={['Male', 'Female', 'Unknown', 'Other']}
          onChange={this.handleChange}
          formState={this.state.form}
          inline
          required
        />
            
        {(this.state.form.gender === 'Other') && (
          <Input
            field="genderOther"
            placeholder="Enter a gender type other than male/female/unknown"
            onChange={this.handleChange}
            formState={this.state.form}
            style={{ marginTop: 8 }}
          />   
        )}
      
        <Toggle
          field="deceased"
          label="Is this person deceased?"
          onChange={this.handleChange}
          formState={this.state.form}
          optional
        />
        
        {this.state.form.deceased && (
          <Input
            field="sampleSource"
            label="Sample Source"
            onChange={this.handleChange}
            formState={this.state.form}
            optional
          />
        )}
        
        <Toggle
          field="consent"
          label="Has consent been received?"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          declaration="I confirm that the Genome.One Privacy Collection Statement has been provided to the patient and that I have received written informed consent for genomic testing."
          required
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

export default PatientDetails;