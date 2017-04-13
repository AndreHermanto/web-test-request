import React, { Component } from 'react';
import { 
  Row, 
  Col,
  Glyphicon,
  Button 
} from 'react-bootstrap';
import { 
  SummaryBox,
  SummaryHeading,
  SummaryBreakLine,
  SummaryDetails,
  SummaryTitle
} from '../summaryStyled'; 

/**
* ClinicianDetailsModule summary - UI for summary page to display all clinician details data.
* also display copy to other clinicians
*/
class ClinicianDetailsModule extends Component
{
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.handleOnClick('step5');
    return 5;
  }
  render() {
    return (
      <SummaryBox>
        <SummaryHeading> 
          Clinician - {this.props.clinicianDetailsModule.firstName + ' ' + this.props.clinicianDetailsModule.lastName}
          {this.props.handleOnClick &&
            <Button 
              bsStyle="link"
              onClick={this.handleDetailsClick}
            >
              <Glyphicon glyph="pencil"/> Edit
            </Button>
          }
        </SummaryHeading>
        <SummaryBreakLine/>
        <Row>
          <Col md={12}>
            <SummaryDetails>
              <SummaryTitle> Organisation/Address of practice:  </SummaryTitle>
              {this.props.clinicianDetailsModule.organisation}
            </SummaryDetails>
          </Col>
          {
            this.props.clinicianDetailsModule.providerNumber !== '' &&
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Provider number:  </SummaryTitle>
                {this.props.clinicianDetailsModule.providerNumber}
              </SummaryDetails>
            </Col>
          }
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Medical specialty:  </SummaryTitle>
              {this.props.clinicianDetailsModule.medicalSpecialty}
            </SummaryDetails>
          </Col>
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Phone:  </SummaryTitle>
              {this.props.clinicianDetailsModule.phone}
            </SummaryDetails>
          </Col>
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Email:  </SummaryTitle>
              {this.props.clinicianDetailsModule.email}
            </SummaryDetails>
          </Col>
          {
            this.props.clinicianDetailsModule.fax !== '' &&
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Fax:  </SummaryTitle>
                {this.props.clinicianDetailsModule.fax}
              </SummaryDetails>
            </Col>
          }
        </Row>
        {
          this.props.clinicianDetailsModule.copyToHCP.length > 0 && 
          this.props.clinicianDetailsModule.copyToHCP.map((c, i) => {
            return <Row key={i}>
              <Col md={12}>
                <SummaryBreakLine/>
                <SummaryHeading> 
                  Copy of report to - {c.firstName} {c.lastName}
                </SummaryHeading>
              </Col>
              <Col md={12}>
                <SummaryDetails>
                  <SummaryTitle> Organisation/Address of practice:  </SummaryTitle>
                  {c.organisation}
                </SummaryDetails>
              </Col>
              <Col md={12}>
                <SummaryDetails> 
                  <SummaryTitle> Email: </SummaryTitle>
                  {c.email}
                </SummaryDetails>
              </Col>
            </Row>
          })
        }
      </SummaryBox>
    )
  }
}

export default ClinicianDetailsModule;