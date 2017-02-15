import React, { Component } from 'react';
import { FormGroup, Row, Col } from 'react-bootstrap';
import { FormBox, InputContainer, Label, InputText } from './styledForm';

class ClinicianDetails extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <FormBox>
        <form>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={6}>
                <InputContainer >
                  <InputText type="text" required />
                  <Label htmlFor="provider-number">Provider Number</Label>
                </InputContainer>
              </Col>
              <Col md={6}>
                <InputContainer >
                  <InputText type="text" required/>
                  <Label htmlFor="medical-specialty">Medical Specialty</Label>
                </InputContainer>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={6}>
                <InputContainer >
                  <InputText type="text" required/>
                  <Label htmlFor="first-name">First Name</Label>
                </InputContainer>
              </Col>
              <Col md={6}>
                <InputContainer >
                  <InputText type="text" required/>
                  <Label htmlFor="last-name">Last Name</Label>
                </InputContainer>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={12}>
                <InputContainer >
                  <InputText type="text" required/>
                  <Label htmlFor="address">Name of organisation, or address of practice</Label>
                </InputContainer>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={4}>
                <InputContainer >
                  <InputText type="text" required/>
                  <Label htmlFor="phone">Phone</Label>
                </InputContainer>
              </Col>
              <Col md={4}>
                <InputContainer >
                  <InputText type="text" required/>
                  <Label htmlFor="email">Email</Label>
                </InputContainer>
              </Col>
              <Col md={4}>
                <InputContainer >
                  <InputText type="text" required/>
                  <Label htmlFor="fax">Fax (Optional)</Label>
                </InputContainer>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </FormBox>
    );
  }
}

export default ClinicianDetails;
