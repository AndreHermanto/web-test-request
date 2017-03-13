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
 * FamilyMemberDetails - UI for input family member details similar to patient details.
 */
class FamilyMemberDetails extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    
    var prefill;
    if(props.route.data) prefill = props.route.data.familyMember[props.params.id].FamilyMemberDetails;
    this.state = initData(prefill);
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
  
  handleNext(passValidation) {
    if(!passValidation) return false;
    this.props.route.onChange(this); 
    this.props.router.push(`/step4/${this.props.params.mode}/2/${this.props.params.id}`);
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
        <PageHeading>Step 4-1: {this.props.params.mode} family member {(this.props.params.mode === 'edit') &&  `(${this.state.form.firstName} ${this.state.form.lastName})`} - member details</PageHeading>
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
      
        <Input
          field="ethnicity"
          label="Ethnicity"
          onChange={this.handleChange}
          optional
        />
        
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
          label="Consent confirmation"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />
            
        <p style={{ fontSize: 11, fontStyle: 'italic', marginTop: -12 }}>
        I confirm that the Genome.One Privacy Collection Statement has been provided to the patient and that I have received written informed consent for genomic testing
        </p> 

        <Input
          field="email"
          label="Email"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />
        {
          this.props.route.isEdited !== true &&
          <FormButton 
            bsStyle="warning" 
            onClick={this.handleCancel}
          >
            Cancel
          </FormButton> 
        }
      
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

export default FamilyMemberDetails;