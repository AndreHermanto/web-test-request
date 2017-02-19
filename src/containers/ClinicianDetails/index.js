import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Row, Col } from 'react-bootstrap';
import Toggle from 'react-toggle';
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import styled from 'styled-components';
import { initialState, setFormData } from './reducer';

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
  handleBack() {
    this.props.router.push('/step2');
    //TODO
  }
  handleConfirm() {
    this.props.route.onChange(this);
    // this.props.router.push('/step6');
    //TODO
  }
  handleChange(event) {
    this.setState(setFormData(this.state, event.target))
  }

  render() {
    return (
        <form>
          <PageHeading>Step 5: Clinician Details</PageHeading>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Provider Number </ControlLabel>
            <FormControl type="text" name="providerNumber" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Medical Specialty </ControlLabel>
            <FormControl type="text" name="medicalSpecialty" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={6}>
                <ControlLabel>First Name </ControlLabel>
                <FormControl type="text" name="firstName" onChange={this.handleChange}/>
              </Col>
              <Col md={6}>
                <ControlLabel>Last Name </ControlLabel>
                <FormControl type="text" name="lastName" onChange={this.handleChange}/>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={12}>
                <ControlLabel>Name of organisation, or address of practice </ControlLabel>
                <FormControl type="text" name="address" onChange={this.handleChange}/>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={4}>
                <ControlLabel>Phone </ControlLabel>
                <FormControl type="number" name="phone" onChange={this.handleChange}/>
              </Col>
              <Col md={4}>
                <ControlLabel>Email </ControlLabel>
                <FormControl type="email" name="email" onChange={this.handleChange}/>
              </Col>
              <Col md={4}>
                <ControlLabel>Fax(optional)</ControlLabel>
                <FormControl type="text" name="fax" onChange={this.handleChange}/>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Request a copy of report sent to another HCP</ControlLabel> <br/>
            <Toggle
              name='copy'
              onChange={this.handleChange} />
          </FormGroup>
          {
            this.state.form.copy &&
            <AdditionalFormBox> 
            <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={6}>
                <ControlLabel>First Name </ControlLabel>
                <FormControl type="text" name="additionalFirstName" onChange={this.handleChange}/>
              </Col>
              <Col md={6}>
                <ControlLabel>Last Name </ControlLabel>
                <FormControl type="text" name="additionalLastName" onChange={this.handleChange}/>
              </Col>
            </Row>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={12}>
                <ControlLabel>Name of organisation, or address of practice </ControlLabel>
                <FormControl type="text" name="additionalAddress" onChange={this.handleChange}/>
              </Col>
            </Row>
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={12}>
                <ControlLabel> Email </ControlLabel>
                <FormControl type="text" name="additionalEmail" onChange={this.handleChange}/>
              </Col>
            </Row>
            </FormGroup>
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
      </form>
    );
  }
}

export default ClinicianDetails;
