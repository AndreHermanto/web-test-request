import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'react-bootstrap';
import { FormBox, InputContainer, Label, RequiredInput, RequiredField, OptionalInput} from './styledForm';
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
class ClinicianDetails extends Component {
  constructor() {
    super();
    this.state = { 
      form: {},
      fax: ''
    };
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleBack() {
    //TODO
  }
  handleConfirm() {
    //TODO
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {

    return (
      <FormBox>
        <form>
          <PageHeading>Step 4: Clinician Details</PageHeading>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={6}>
                <InputContainer >
                  <RequiredInput type="text" name="providerNumber" required/>
                  <Label htmlFor="provider-number">Provider Number <RequiredField>*</RequiredField>
                  </Label>
                </InputContainer>
              </Col>
              <Col md={6}>
                <InputContainer >
                  <RequiredInput type="text" required/>
                  <Label htmlFor="medical-specialty">Medical Specialty <RequiredField>*</RequiredField></Label>
                </InputContainer>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={6}>
                <InputContainer >
                  <RequiredInput type="text" required/>
                  <Label htmlFor="first-name">First Name <RequiredField>*</RequiredField></Label>
                </InputContainer>
              </Col>
              <Col md={6}>
                <InputContainer >
                  <RequiredInput type="text" required/>
                  <Label htmlFor="last-name">Last Name <RequiredField>*</RequiredField></Label>
                </InputContainer>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={12}>
                <InputContainer >
                  <RequiredInput type="text" required/>
                  <Label htmlFor="address">Name of organisation, or address of practice <RequiredField>*</RequiredField></Label>
                </InputContainer>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={4}>
                <InputContainer >
                  <RequiredInput type="text" required/>
                  <Label htmlFor="phone">Phone <RequiredField>*</RequiredField></Label>
                </InputContainer>
              </Col>
              <Col md={4}>
                <InputContainer >
                  <RequiredInput type="text" required/>
                  <Label htmlFor="email">Email <RequiredField>*</RequiredField></Label>
                </InputContainer>
              </Col>
              <Col md={4}>
                <InputContainer>
                  <OptionalInput value={this.state.fax} type="text" name="fax" onChange={(e) => this.handleChange(e)}/>
                  <Label htmlFor="fax">Fax(optional)</Label>
                </InputContainer>
              </Col>
            </Row>
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
        </form>
      </FormBox>
    );
  }
}

export default ClinicianDetails;
