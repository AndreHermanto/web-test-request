import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Row, Col } from 'react-bootstrap';
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import { initialState, setFormData } from './reducer';
class ClinicianDetails extends Component {
  constructor() {
    super();
    this.state = initialState();
    this.handleBack = this.handleBack.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleBack() {
    // this.props.router.push('/step4');
    //TODO
  }
  handleConfirm() {
    // this.props.router.push('/step6');
    //TODO
  }
  handleChange(event) {
    this.setState(setFormData(this.state, event.target.name, event.target.value))
  }

  render() {
    return (
        <form>
          <PageHeading>Step 5: Clinician Details</PageHeading>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Provider Number </ControlLabel>
            <FormControl type="text" required name="providerNumber" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Medical Specialty </ControlLabel>
            <FormControl type="text" required name="medicalSpecialty" onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={6}>
                <ControlLabel>First Name </ControlLabel>
                <FormControl type="text" required name="firstName" onChange={this.handleChange}/>
              </Col>
              <Col md={6}>
                <ControlLabel>Last Name </ControlLabel>
                <FormControl type="text" required name="lastName" onChange={this.handleChange}/>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={12}>
                <ControlLabel>Name of organisation, or address of practice </ControlLabel>
                <FormControl type="text" required name="address" onChange={this.handleChange}/>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <Row>
              <Col md={4}>
                <ControlLabel>Phone </ControlLabel>
                <FormControl type="number" required name="phone" onChange={this.handleChange}/>
              </Col>
              <Col md={4}>
                <ControlLabel>Email </ControlLabel>
                <FormControl type="email" value={this.state.form.get('email')} required name="email" onChange={this.handleChange}/>
              </Col>
              <Col md={4}>
                <ControlLabel>Fax(optional)</ControlLabel>
                <FormControl value={this.state.form.get('fax')} type="text" name="fax" onChange={this.handleChange}/>
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
    );
  }
}

export default ClinicianDetails;
