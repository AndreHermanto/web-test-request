import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import {
  initData,
  setPrintType 
} from './reducer';
import PrintRecord from './components/PrintRecord';
import PrintBloodCollection from './components/PrintBloodCollection';
import './print.css'
import { 
  FormButton
} from './../../components/SharedStyle';

const ConfirmationBox = styled.div`
  box-shadow: 0 0 5px rgb(227, 231, 241);  
  width: 80%;
  padding: 20px;
  margin-bottom: 10px;
  margin-left: 10%;
  background-color: #fff;
`;

const ConfirmationHeading = styled.h1`
  text-align:center;
  color: rgba(51, 51, 51, 0.75);
`;
const ConfirmationNote = styled.h4`
  font-weight: 200;
  text-align:center;
  margin-top: 10px;
`;

/**
* Confirmation - UI for ordering type of tests, selecting disorder and related genes for testing.
*/
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.handlePrintRecordButtonClick = this.handlePrintRecordButtonClick.bind(this);
    this.handlePrintBloodCollectionButtonClick = this.handlePrintBloodCollectionButtonClick.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.state = initData();
  }
  
  handlePrintButtonClick(type) {
    this.setState(setPrintType(this.state, type));
    setTimeout(() => {
      window.print();
    }, 200);
  }
  
  handlePrintRecordButtonClick() {
    this.handlePrintButtonClick(1);
  }
  
  handlePrintBloodCollectionButtonClick() {
    this.handlePrintButtonClick(2);
  }

  handleRedirect(place) {
    if(place === 'home') {
      this.props.route.onClean();
      this.props.router.push('/step1'); 
    }
    else {
      window.location.replace('https://www.genome.one/'); 
    }
  }
  
  render() {
    return (
      <div>
        <ConfirmationBox className="noPrint">
            <ConfirmationHeading> Thank you!</ConfirmationHeading>
            <ConfirmationNote>
              You can now:
            </ConfirmationNote>
            <Row>
              <Col md={6}>
                <FormButton onClick={this.handlePrintRecordButtonClick} style={{marginLeft: '20%'}}>
                  Print out form for your records
                </FormButton>
              </Col>
              <Col md={6}>
                <FormButton onClick={this.handlePrintBloodCollectionButtonClick} style={{marginRight: '20%'}}>
                  Print out Blood Collection forms for your patient(s)
                </FormButton>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormButton onClick={() => this.handleRedirect('genome')} style={{marginLeft: '20%', width: '78.26%'}}>
                  Back to Genome.One
                </FormButton>
              </Col>
              <Col md={6}>
                <FormButton onClick={() => this.handleRedirect('home')} style={{marginRight: '20%', width:'80%'}}>
                  Order new Test
                </FormButton>
              </Col>
            </Row>

        </ConfirmationBox>

        <div className="printMe">
          {(this.state.print === 1) && 
            <PrintRecord 
              orderTestModule={this.props.route.data.orderTestModule}
              patientDetails={this.props.route.data.patientDetailsModule}
              clinicalInfo={this.props.route.data.clinicalInfoModule}
              familyMember={this.props.route.data.familyMembersModule}
              clinicianDetails={this.props.route.data.clinicianDetailsModule}
              billingInfo={this.props.route.data.billingInfoModule}
            />
          }
          {(this.state.print === 2) &&
            <PrintBloodCollection 
              orderTestModule={this.props.route.data.orderTestModule}
              patientDetails={this.props.route.data.patientDetailsModule}
              clinicalInfo={this.props.route.data.clinicalInfoModule}
              familyMember={this.props.route.data.familyMembersModule}
              clinicianDetails={this.props.route.data.clinicianDetailsModule}
              billingInfo={this.props.route.data.billingInfoModule}
            />
          }
        </div>
      </div>
    );
  }
}

export default Confirmation;