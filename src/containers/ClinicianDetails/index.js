import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';
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

const HCPButton = styled.label`
  cursor: pointer;
  position: relative;
  padding: 7px 15px;
  border: 1px solid #ccc;
  -webkit-transition: border-color .3s ease,color .3s ease,background-color .3s ease;
  transition: border-color .3s ease,color .3s ease,background-color .3s ease;
  color: #00a6b6;
  margin-top: 10px;
`;

const RemoveLabel = styled.span`
  cursor: pointer;
  position: absolute;
  margin-top: 4px;
  margin-left: 8px;
  font-weight: normal;
  font-size: 11px;
  color: #fff;
  padding: 5px;
  background-color: #5cb85c;
  border-radius: .25em;
  &:hover {
    background:#fff;
    color: black;
    border: 1px solid #5cb85c;
  }
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
  render() {
    return (
        <div>
          <PageHeading>Step 5: Clinician Details</PageHeading>
          <Input
            field="providerNumber"
            label="Provider Number"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
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
              <PageHeading>HCP {index + 1} <RemoveLabel onClick={() => this.handleRemoveHCP(index)}>Remove</RemoveLabel></PageHeading>
              <Input
                field="additionalFirstName"
                label="First Name"
                onChange={(e) => this.handleHCPChange(e, index)}
                formState={form}
              />
              <Input
                field="additionalLastName"
                label="Last Name"
                onChange={(e) => this.handleHCPChange(e, index)}
                formState={form}
              />
              <Input
                field="additionalOrganisation"
                label="Name of organisation, or address of practice"
                onChange={(e) => this.handleHCPChange(e, index)}
                formState={form}
              />
              <Input
                field="additionalEmail"
                label="Email"
                onChange={(e) => this.handleHCPChange(e, index)}
                formState={form}
              />
              </AdditionalFormBox>
            })
          }
          <FormGroup>
            <HCPButton onClick={this.handleAddHCP}>
              Request a copy of report sent to another HCP
            </HCPButton> 
          </FormGroup>
          <FormButton 
          bsStyle="warning" 
          onClick={this.handleBack}>
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

export default ClinicianDetails;
