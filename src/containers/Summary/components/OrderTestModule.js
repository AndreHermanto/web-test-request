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
  Gene,
  GeneLabel
} from '../summaryStyled'; 
/**
* OrderTestModule summary - UI for summary page to display all genes data.
*/
class OrderTestModule extends Component
{
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick() {
    this.props.handleOnClick('step1');
    return 1;
  }
  render() {
    return (
      <SummaryBox>
        <SummaryHeading> 
          Test ordered 
          <Button
            bsStyle="link"
            onClick={this.handleOnClick}
          >
            <Glyphicon glyph="pencil"/> Edit
          </Button>
        </SummaryHeading>
        <SummaryBreakLine/>
        <Row>
          <Col md={12}>
              <SummaryDetails> <strong>{this.props.orderTestModule.test.label}</strong></SummaryDetails>
          </Col>
          <Col md={12}>
            {
              this.props.orderTestModule.genes && 
              <SummaryDetails> Total number of genes available: 
                <Gene>
                  {this.props.orderTestModule.genes.length} 
                </Gene> 
              </SummaryDetails>
            }
            {
              this.props.orderTestModule.genes && (
              <div>
              {
                this.props.orderTestModule.genes.map((gene, $index) => {
                  return <GeneLabel key={$index}>{gene}</GeneLabel> 
                })
              }
              </div>
            )}
          </Col>
        </Row>
      </SummaryBox>
    )
  }
}

export default OrderTestModule;