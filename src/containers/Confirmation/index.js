import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { getTestRequestById } from './api';
import {
  initData,
  setRetrievedData,
  setPrintType 
} from './reducer';
import PrintRecord from './components/PrintRecord';
import PrintBloodCollection from './components/PrintBloodCollection';
import './print.css'
import { 
  FormButton
} from './../../components/SharedStyle';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const ConfirmationBox = styled.div`
  width: 80%;
  padding: 20px;
  margin-bottom: 10px;
  margin-left: 10%;
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

const ConfirmationButton = styled(FormButton)`
  border: ${props => props.main ? '' : '1px solid #00a6b6'};
  background-color: ${props => props.main ? '#00a6b6' : '#fff'};
  color: ${props => props.main ? '#fff' : '#333'};
  width: 80%;
  &:hover {
    border-color: #00c9dc;
    color: #fff;
  }
`;


/**
* Confirmation - UI for ordering type of tests, selecting disorder and related genes for testing.
*/
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handlePrintRecordButtonClick = this.handlePrintRecordButtonClick.bind(this);
    this.handlePrintBloodCollectionButtonClick = this.handlePrintBloodCollectionButtonClick.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.state = initData();
  }
  
  componentWillMount() {
    if(!this.props.route.isReSubmit) {
      setTimeout(function() { 
        NotificationManager.success('Your request has been submitted successfully', 'Success', 6000);
      }, 100);
    }
    else {
      setTimeout(function() { 
        NotificationManager.warning('Your request has already been submitted', 'Already been submitted', 6000);
      }, 100);
    }
    return getTestRequestById(this.props.params.id)
      .then((data) => {
        this.setState(setRetrievedData(this.state, data));
    });
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
                <ConfirmationButton main onClick={this.handlePrintRecordButtonClick} style={{marginLeft: '20%'}}>
                  Print out form for your records
                </ConfirmationButton>
              </Col>
              <Col md={6}>
                <ConfirmationButton main onClick={this.handlePrintBloodCollectionButtonClick} style={{marginRight: '20%'}}>
                  Print out Blood Collection forms for your patient(s)
                </ConfirmationButton>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ConfirmationButton onClick={() => this.handleRedirect('genome')} style={{marginLeft: '20%'}}>
                  Go back to Genome.One
                </ConfirmationButton>
              </Col>
              <Col md={6}>
                <ConfirmationButton onClick={() => this.handleRedirect('home')} style={{marginRight: '20%'}}>
                  Order new Test
                </ConfirmationButton>
              </Col>
            </Row>

        </ConfirmationBox>

        <div className="printMe">
          {(this.state.print === 1) && 
            <PrintRecord
              showId={this.state.form.id}
              showDate={this.state.form.createdDateTime}
              orderTestModule={this.state.form.orderTestModule}
              patientDetails={this.state.form.patientDetailsModule}
              clinicalInfo={this.state.form.clinicalInfoModule}
              familyMember={this.state.form.familyMembersModule}
              clinicianDetails={this.state.form.clinicianDetailsModule}
              billingInfo={this.state.form.billingInfoModule}
            />
          }
          {(this.state.print === 2) &&
            <PrintBloodCollection
              showId={this.state.form.id}
              showDate={this.state.form.createdDateTime}
              orderTestModule={this.state.form.orderTestModule}
              patientDetails={this.state.form.patientDetailsModule}
              clinicalInfo={this.state.form.clinicalInfoModule}
              familyMember={this.state.form.familyMembersModule}
              clinicianDetails={this.state.form.clinicianDetailsModule}
              billingInfo={this.state.form.billingInfoModule}
            />
          }
        </div>
        <NotificationContainer/>
      </div>
    );
  }
}

export default Confirmation;