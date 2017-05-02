import React, { Component } from 'react';
import { 
  Row, 
  Col,
  Glyphicon,
  Button
} from 'react-bootstrap';
import { 
  SummaryHeading,
  SummaryBreakLine,
  SummaryDetails,
  SummaryTitle,
  LastBox
} from '../summaryStyled'; 

/**
* BillingInfoModule summary - UI for summary page to display payer details.
*/
class BillingInfoModule extends Component
{
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.handleOnClick('step6');
    return 6;
  }
  render() {
    return (
      <LastBox>
        <SummaryHeading> 
          {this.props.billingInfoModule.billOption} billing 
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
        {
          this.props.billingInfoModule.billOption !== 'Institution' ?
          <Row>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Payer:  </SummaryTitle>
                {
                  this.props.billingInfoModule.payer === 'Other' ?
                  this.props.billingInfoModule.firstName + ' ' + this.props.billingInfoModule.lastName :
                  this.props.billingInfoModule.payer
                } 
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Mobile:  </SummaryTitle>
                {this.props.billingInfoModule.phone}
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Email:  </SummaryTitle>
                {this.props.billingInfoModule.payerEmail}
              </SummaryDetails>
            </Col>
          </Row>
          :
          <Row>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Payer:  </SummaryTitle>
                {this.props.clinicianDetailsModule.organisation}
              </SummaryDetails>
            </Col>
          </Row>
        }
      </LastBox>
    )
  }
}

export default BillingInfoModule;