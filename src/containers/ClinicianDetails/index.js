import React, { Component } from 'react';
import { FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import Toggle from 'react-toggle';
import { initialState, setFormData, validatedToTrue } from './reducer';
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
class ClinicianDetails extends Component {
  constructor(props) {
    super(props);
    this.state = initialState();
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(setFormData(this.state, event.target))
  }

  handleBack() {
    this.props.router.push('/step2');
  }

  handleNext(passValidation) {
    if(!passValidation) return false;
    this.props.route.onChange(this);
    this.props.router.push('/step6');
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
          <PageHeading>Step 5: Clinician Details</PageHeading>
          <Input
            field="providerNumber"
            label="Provider Number"
            onChange={this.handleChange}
            onValidate={this.validate()}
            required
          />
          <Input
            field="medicalSpecialty"
            label="Medical Specialty"
            onChange={this.handleChange}
            onValidate={this.validate()}
            required
          />
          <Row>
            <Col md={6}>
              <Input
                field="firstName"
                label="First Name"
                onChange={this.handleChange}
                onValidate={this.validate()}
                required
              />
            </Col>
            <Col md={6}>
              <Input
                field="lastName"
                label="Last Name"
                onChange={this.handleChange}
                onValidate={this.validate()}
                required
              />
            </Col>
          </Row>

          <Input
            field="organisation"
            label="Name of organisation, or address of practice"
            onChange={this.handleChange}
            onValidate={this.validate()}
            required
          />
          <Row>
            <Col md={4}>
              <Input
                field="phone"
                label="Phone"
                onChange={this.handleChange}
                onValidate={this.validate()}
                required
              />
            </Col>
            <Col md={4}>
              <Input
                field="email"
                label="Email"
                onChange={this.handleChange}
                onValidate={this.validate()}
                required
              />
            </Col>
            <Col md={4}>
              <Input
                field="fax"
                label="Fax"
                onChange={this.handleChange}
                onValidate={this.validate()}
                optional
              />
            </Col>
          </Row>
          <FormGroup>
            <ControlLabel>Request a copy of report sent to another HCP</ControlLabel> <br/>
            <Toggle
              name='copy'
              onChange={this.handleChange} />
          </FormGroup>
          {
            this.state.form.copy &&
            <AdditionalFormBox> 
            <Row>
              <Col md={6}>
                <Input
                  field="additionalFirstName"
                  label="First Name"
                  onChange={this.handleChange}
                  onValidate={this.validate()}
                  optional
                />
              </Col>
              <Col md={6}>
                <Input
                  field="additionalLastName"
                  label="Last Name"
                  onChange={this.handleChange}
                  onValidate={this.validate()}
                  optional
                />
              </Col>
            </Row>
            <Input
              field="additionalOrganisation"
              label="Name of organisation, or address of practice"
              onChange={this.handleChange}
              onValidate={this.validate()}
              optional
            />
            <Input
              field="additionalEmail"
              label="Email"
              onChange={this.handleChange}
              onValidate={this.validate()}
              optional
            />
            </AdditionalFormBox>
          }
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
