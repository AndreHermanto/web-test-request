import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'react-bootstrap';
import { initialState, setFormData, validatedToTrue, addNewHCP, removeHCP, setHCPForm } from './reducer';
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
`;

const RemoveLabel = styled.span`
  cursor: pointer;
  position: absolute;
  margin-top: 4px;
  margin-left: 8px;
  font-weight: normal;
  font-size: 11px;
  color: #fff;
  background: #bbb;
  padding: 5px;
  background-color: #5cb85c;
  border-radius: .25em;
  &:hover {
    background:#fff;
    color: black;
    border: 1px solid #5cb85c;
  }
`;


class ClinicianDetails extends Component {
  constructor(props) {
    super(props);
    this.state = initialState();
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hanldeAddHCP = this.hanldeAddHCP.bind(this);
    this.handleHCPChange = this.handleHCPChange.bind(this);
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
    this.setState(validatedToTrue(this.state), () => {    
      var pass = true;
      for (var field in this.state.validation) {
        if(this.state.validation[field].status === 'error') pass = false;
      }
      this.handleNext(pass); 
    });
  }

  hanldeAddHCP() {
    this.setState(addNewHCP(this.state));
  }

  handleRemoveHCP(index) {
    this.setState(removeHCP(this.state, index));
  }

  handleHCPChange(event, index) {
    this.setState(setHCPForm(this.state, event.target, index))
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
            <HCPButton onClick={this.hanldeAddHCP}>
              Request a copy of report sent to another HCP
            </HCPButton> 
          </FormGroup>
          {
            this.state.additionalForm.get('body').map((form, index) => {
              return <AdditionalFormBox key={index}> 
              <PageHeading>HCP {index + 1} <RemoveLabel onClick={() => this.handleRemoveHCP(index)}>Remove</RemoveLabel></PageHeading>
              <Row>
                <Col md={6}>
                  <Input
                    field="additionalFirstName"
                    label="First Name"
                    onChange={(e) => this.handleHCPChange(e, index)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    field="additionalLastName"
                    label="Last Name"
                    onChange={(e) => this.handleHCPChange(e, index)}
                  />
                </Col>
              </Row>
              <Input
                field="additionalOrganisation"
                label="Name of organisation, or address of practice"
                onChange={(e) => this.handleHCPChange(e, index)}
              />
              <Input
                field="additionalEmail"
                label="Email"
                onChange={(e) => this.handleHCPChange(e, index)}
              />
              </AdditionalFormBox>
            })
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
