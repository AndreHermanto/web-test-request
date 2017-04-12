import React, { Component } from 'react';
import { FormGroup, Glyphicon, Button } from 'react-bootstrap';
import { 
  initialState, 
  setFormData,  
  addNewHCP, 
  removeHCP, 
  setHCPForm,
  validateClinicianForm
} from './reducer';
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import styled from 'styled-components';
import Input from './../../components/Input';


const AdditionalFormBox = styled.div`
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  padding-top: 10px;
`;

const RemoveLabel = styled(Button)`
  margin-top: -3px;
  position: absolute;
  margin-top: 4px;
  margin-left: 8px;
  color: rgb(221, 102, 102) !important;
`;

/**
* ClinicianDetials form - UI for input clinician details.
* also has UI for requesting copy to other HCP
*/
class ClinicianDetails extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddHCP = this.handleAddHCP.bind(this);
    this.handleHCPChange = this.handleHCPChange.bind(this);
    this.state = initialState(props.route.data);
  }
  
  componentDidMount() {
    if(this.props.route.preventUnvisitedFormAccess) {
      this.props.router.setRouteLeaveHook(this.props.route, this.props.route.preventUnvisitedFormAccess.bind(this));
    }
  }

  handleChange(event) {
    this.setState(setFormData(this.state, event.target))
  }

  handleBack() {
    this.props.route.onChange(this);
    this.props.router.push('/step4');
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
      this.props.router.push('/step6'); 
    }
  }

  handleConfirm() {
    this.setState(validateClinicianForm(this.state), () => {    
      var pass = true;
      for (var field in this.state.validation) {
        if(this.state.validation[field].status === 'error') pass = false;
      }
      
      this.state.validationCopyHCP.forEach((validateCopyHCP) => {
        for (var field in validateCopyHCP) {
          if(validateCopyHCP[field].status === 'error') pass = false;
        }
      });
      
      this.handleNext(pass); 
    });
  }

  handleAddHCP() {
    this.setState(addNewHCP(this.state, this.state.form.copyToHCP));
  }

  handleRemoveHCP(index) {
    this.setState(removeHCP(this.state, this.state.form.copyToHCP, index));
  }

  handleHCPChange(event, index) {
    this.setState(setHCPForm(this.state, this.state.form.copyToHCP, event.target, index))
  }

  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }
  
  // This validation is solely made for copy to HCP fields.
  validateCopyHCP(index) {
    return this.state.validated && this.state.validationCopyHCP[index];
  }

  render() {
    return (
        <div>
          <PageHeading>Step 5: Requesting clinician</PageHeading>
          <Input
            field="providerNumber"
            label="Provider Number"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            optional
          />
          <Input
            field="medicalSpecialty"
            label="Medical Specialty"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />
          <Input
            field="firstName"
            label="First Name"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />
          <Input
            field="lastName"
            label="Last Name"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />
          <Input
            field="organisation"
            label="Name of organisation, or address of practice"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />
          <Input
            field="phone"
            label="Phone"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />
          <Input
            field="email"
            label="Email"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />
          <Input
            field="fax"
            label="Fax"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            optional
          />
          {
            this.state.form.copyToHCP.map((form, index) => {
              return <AdditionalFormBox key={index}> 
              <PageHeading> Copy report to another clinician <RemoveLabel 
                bsSize="xsmall"
                bsStyle="link"
                onClick={() => this.handleRemoveHCP(index)}>
                <Glyphicon glyph="trash"/> Remove</RemoveLabel>
              </PageHeading>
              <Input
                field="firstName"
                label="First Name"
                onChange={(e) => this.handleHCPChange(e, index)}
                onValidate={this.validateCopyHCP(index)}
                formState={form}
                required
              />
              <Input
                field="lastName"
                label="Last Name"
                onChange={(e) => this.handleHCPChange(e, index)}
                onValidate={this.validateCopyHCP(index)}
                formState={form}
                required
              />
              <Input
                field="organisation"
                label="Name of organisation, or address of practice"
                onChange={(e) => this.handleHCPChange(e, index)}
                onValidate={this.validateCopyHCP(index)}
                formState={form}
                required
              />
              <Input
                field="email"
                label="Email"
                onChange={(e) => this.handleHCPChange(e, index)}
                onValidate={this.validateCopyHCP(index)}
                formState={form}
                required
              />
              </AdditionalFormBox>
            })
          }
          <FormGroup>
            <FormButton onClick={this.handleAddHCP}>
              Request a copy of report sent to another clinician
            </FormButton> 
          </FormGroup>
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

export default ClinicianDetails;
