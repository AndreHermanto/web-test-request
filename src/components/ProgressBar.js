import React, { Component } from 'react';
import styled from 'styled-components';
import { hashHistory } from 'react-router';
import { Row } from 'react-bootstrap';


const Container = styled.div`
  width: 1000px;
  margin: auto; 
`;

const Lists = styled.ul`
  margin: 0;
  padding: 0;
  counter-reset: step;
`;

const Nav = styled.li`
  list-style-type: none;
  width: 14%;
  float: left;
  font-size: 12px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;

  &:before{
    width: 30px;
    height: 30px;
    content: counter(step);
    counter-increment: step;
    line-height: 30px;
    border: 2px solid #7d7d7d;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
  }

  &:after{
    width: 100%;
    height: 2px;
    content: '';
    position: absolute;
    background-color: #7d7d7d;
    top: 15px;
    left: -50%;
    z-index: -1;
  }

  &:first-child:after {
    content: none;
  }
`;

const active = {
  color: "black",
  fontWeight: "bold",
  fontSize: "13px"
};

/*const visited = {
  color: "black"
};*/

export default class ProgressBar extends Component 
{ 
  constructor(props) {
    super(props);
    /*this.checkPatientDetails = this.checkPatientDetails.bind(this);
    this.checkClinicalInfo = this.checkClinicalInfo.bind(this);
    this.checkClinicianDetails = this.checkClinicianDetails.bind(this);
    this.checkBillingInfo = this.checkBillingInfo.bind(this);*/

    this.state = {
      form: props.route.data || {}
    };
  }

  /*checkPatientDetails(form){
    if(form.PatientDetails &&
      form.PatientDetails.email &&
        form.PatientDetails.firstName &&
        form.PatientDetails.lastName &&
        form.PatientDetails.dob) {
        return true;
    }else{
      return false;
    }
  }

  checkClinicalInfo(form){
    if(form.ClinicalInfo &&
      form.ClinicalInfo.clinicalInfo) {
        return true;
    }else{
      return false;
    }
  }

    checkClinicianDetails(form){
    if(form.ClinicianDetails &&
      form.ClinicianDetails.providerNumber &&
      form.ClinicianDetails.email && 
      form.ClinicianDetails.organisation &&
      form.ClinicianDetails.medicalSpecialty &&
      form.ClinicianDetails.firstName &&
      form.ClinicianDetails.lastName) {
        return true;
    }else{
      return false;
    }
  }

  checkBillingInfo(form){
    if(form.BillingInfo &&
      form.BillingInfo.billOption &&
      form.BillingInfo.givenName &&
      form.BillingInfo.lastName &&
      form.BillingInfo.email) {
        return true;
    }else{
      return false;
    }
  }*/

  render() 
  {  
    return(
    <div>
      <Row>
        <Container>
        <Lists>

          <Nav style={hashHistory.getCurrentLocation().pathname === "/step1"? active : {}}>
            Order Test
          </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/step2"? active : {}}>
              Patient Details
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/step3"? active : {}}>
              Clinical Information
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname.includes("/step4") ? active : {}}>
              Family Member
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/step5"? active : {}}>
              Clinician Details
            </Nav>
   
            <Nav style={hashHistory.getCurrentLocation().pathname === "/step6"? active : {}}>
              Billing Info
            </Nav>
         
            <Nav style={hashHistory.getCurrentLocation().pathname === "/summary"? active : {}}>
              Summary
            </Nav> 

          {/*<Nav style={hashHistory.getCurrentLocation().pathname === "/step1"? active : visited}>
            <Link to='step1' activeStyle={{ fontWeight: 'bold' }}>Order Test</Link>
          </Nav>

          { this.state.form.OrderTest ? 
            <Nav style={hashHistory.getCurrentLocation().pathname === "/step2"? active : visited}>
              <Link to='step2' activeStyle={{ fontWeight: 'bold' }}>Patient Details</Link>
            </Nav> : 
            <Nav>Patient Details</Nav> }

          { this.checkPatientDetails(this.state.form) ? 
            <Nav style={hashHistory.getCurrentLocation().pathname === "/step3"? active : visited}>
              <Link to='step3' activeStyle={{ fontWeight: 'bold' }}>Clinical Information</Link>
            </Nav> : 
            <Nav>Clinical Information</Nav> }

          { this.checkClinicalInfo(this.state.form) ? 
            <Nav style={hashHistory.getCurrentLocation().pathname === "/step4"? active : visited}>
              <Link to='step4' activeStyle={{ fontWeight: 'bold' }}>Clinician Details</Link>
            </Nav> : 
            <Nav>Clinician Details</Nav> }

          { this.checkClinicianDetails(this.state.form) ? 
            <Nav style={hashHistory.getCurrentLocation().pathname === "/step5"? active : visited}>
              <Link to='step5' activeStyle={{ fontWeight: 'bold' }}>Billing Info</Link>
            </Nav> : 
            <Nav>Billing Info</Nav> }

          { this.checkBillingInfo(this.state.form) ? 
            <Nav style={hashHistory.getCurrentLocation().pathname === "/summary"? active : visited}>
              <Link to='summary' activeStyle={{ fontWeight: 'bold' }}>Summary</Link>
            </Nav> : 
            <Nav>Summary</Nav> }
          */}
        </Lists>
        </Container>
      </Row>
      <Row>
      {this.props.children}
      </Row>
    </div>
    )
  }
}
