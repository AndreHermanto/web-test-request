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

const ConfirmationBox = styled.div`
  box-shadow: 0 0 5px rgb(227, 231, 241);  
  width: 80%;
  padding: 20px;
  margin-bottom: 10px;
  margin-left: 10%;
`;

const ConfirmationBreakLineXS = styled.div`
  border-style: dotted dashed dotted;
  border-width: 2px;
  border-color: #ABC6CA;
  width: 80%;
  margin-left:10%;
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
const Circle = styled.span`
  border: 2px solid #ABC6CA;
  border-radius: 12px;
  padding-right: 14px;
`;

const CircleRight = styled.span`
  border: 2px solid #ABC6CA;
  float:right;
  padding-top: 16px;
  border-radius: 10px;
  padding-left: 14px;
`;

const PrintRecordButton = styled.label`
    cursor: pointer;
    padding: 17px 15px;
    border: 1px solid #00a6b6;
    color: #00a6b6;
    margin-top: 10px;
    width: 100%;
    text-align: center;
`;

/*const PrintBloodCollectionButton = styled.label`
  cursor: pointer;
  padding: 7px 15px;
  border: 1px solid #00a6b6;
  color: #00a6b6;
  margin-top: 10px;
  text-align: center;
`;*/

/**
* Confirmation - UI for ordering type of tests, selecting disorder and related genes for testing.
*/
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.handlePrintRecordButtonClick = this.handlePrintRecordButtonClick.bind(this);
    this.handlePrintBloodCollectionButtonClick = this.handlePrintBloodCollectionButtonClick.bind(this);
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
  
  render() {
    return (
      <div>
        <ConfirmationBox className="noPrint">
          <Circle/>
          <CircleRight/>
          <ConfirmationBreakLineXS/>
            <ConfirmationHeading> Thank you!</ConfirmationHeading>
          <ConfirmationBreakLineXS/>
            <ConfirmationNote> 
              We've sent you an email with all the details of your order!
            </ConfirmationNote>
            <ConfirmationNote>
              You can now:
            </ConfirmationNote>
            <Row>
              <Col md={12}>
                <PrintRecordButton onClick={this.handlePrintRecordButtonClick}>
                  Print out form for your records
                </PrintRecordButton>
              </Col>
      {/*}<Col md={6}>
                <PrintBloodCollectionButton onClick={this.handlePrintBloodCollectionButtonClick}>
                  Print out Blood Collection forms for your patient(s)
                </PrintBloodCollectionButton>
              </Col>{*/}
            </Row>
        </ConfirmationBox>
                  
        <div className="printMe">
          {(this.state.print === 1) && 
            <PrintRecord orderTestModule={this.props.route.data.OrderTest}
              patientDetails={this.props.route.data.PatientDetails} clinicalInfo={this.props.route.data.ClinicalInfo}
              familyMember={this.props.route.data.FamilyMember} clinicianDetails={this.props.route.data.ClinicianDetails}
              billingInfo={this.props.route.data.BillingInfo}
            />
          }
          {(this.state.print === 2) && <PrintBloodCollection />}
        </div>
      </div>
    );
  }
}

export default Confirmation;