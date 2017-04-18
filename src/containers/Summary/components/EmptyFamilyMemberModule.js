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
  SummaryDetails
} from '../summaryStyled';

/**
* EmptyFamilyMemberModule summary - UI for summary page to display all family member details/clinical info data.
*/
class EmptyFamilyMemberModule extends Component
{
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.handleOnClick('step4');
    return 4;
  }

  render() {
    return(
      <SummaryBox>
        <SummaryHeading> 
          Family Member 
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
            <SummaryDetails> 
              No family member is included for this test.
            </SummaryDetails>
          </Col>
        </Row>
      </SummaryBox>
    )
  }
}

export default EmptyFamilyMemberModule;