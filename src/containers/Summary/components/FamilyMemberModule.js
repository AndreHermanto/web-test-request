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
  SummaryTitle,
  SummaryDetails,
  SummaryNotes,
  SectionHeading,
  Tag
} from '../summaryStyled'; 

/**
* FamilyMemberModule summary - UI for summary page to display all family member details/clinical info data.
*/
class FamilyMemberModule extends Component
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
          <Row>
            <Col md={12}>
              Family Member ({this.props.familyMemberDetails.relationship}) - {this.props.familyMemberDetails.firstName + ' ' + this.props.familyMemberDetails.lastName}
            </Col>
            <Col md={12}>
              <Button 
                bsStyle="link"
                onClick={this.handleOnClick}
              >
                <Glyphicon glyph="pencil"/> Edit
              </Button>
              <Tag bsStyle={this.props.familyMemberClinicalInfo.affected ? 'danger' : 'success'}>
                {this.props.familyMemberClinicalInfo.affected ? 'Affected' : 'Unaffected'}
              </Tag>
            </Col>
          </Row>
        </SummaryHeading>
        <SummaryBreakLine/>
        <Row>
          <Col md={12}>
            <SectionHeading> 
              Details
            </SectionHeading>
          </Col>
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Date of Birth:  </SummaryTitle>
              {this.props.familyMemberDetails.dob}
            </SummaryDetails>
          </Col>
          {
            this.props.familyMemberDetails.medicalRecordNo !== '' && 
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Medical record number:  </SummaryTitle>
                  {this.props.familyMemberDetails.medicalRecordNo}
                </SummaryDetails>
            </Col>
          }
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Gender:  </SummaryTitle>
              {
                this.props.familyMemberDetails.gender === 'Other' ?
                this.props.familyMemberDetails.genderOther + ' (Other)' :
                this.props.familyMemberDetails.gender
              } 
            </SummaryDetails>
          </Col>
          {
            this.props.familyMemberDetails.ethnicity !== '' && 
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Ethnicity:  </SummaryTitle>
                {this.props.familyMemberDetails.ethnicity}
              </SummaryDetails>
            </Col>
          }
          {
            this.props.familyMemberDetails.deceased !== false &&
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Deceased:  </SummaryTitle>
                {this.props.familyMemberDetails.deceased ? 'Yes' : 'No'}
              </SummaryDetails>
            </Col>
          }
          {
            (this.props.familyMemberDetails.deceased !== false && this.props.familyMemberDetails.sampleSource !== '') && 
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Sample source:  </SummaryTitle>
                {this.props.familyMemberDetails.sampleSource}
              </SummaryDetails>
            </Col>
          }
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Email:  </SummaryTitle>
              {this.props.familyMemberDetails.email}
            </SummaryDetails>
          </Col>
          <Col md={12}>
            <SectionHeading> 
              Clinical Information
            </SectionHeading>
          </Col>
          <Col md={12}>
            <SummaryTitle> Clinical note </SummaryTitle>
            <SummaryNotes>
              {this.props.familyMemberClinicalInfo.clinicalInfo}
            </SummaryNotes>
          </Col>
          {
            this.props.familyMemberClinicalInfo.relevantInvestigation !== '' &&
            <Col md={12}>
              <SummaryTitle> Relevant investigation note </SummaryTitle>
              <SummaryNotes>
                {this.props.familyMemberClinicalInfo.relevantInvestigation}
              </SummaryNotes>
            </Col>
          }
          {
            this.props.familyMemberClinicalInfo.familyHistory !== '' &&
            <Col md={12}>
              <SummaryTitle> Family history note </SummaryTitle>
              <SummaryNotes>
                {this.props.familyMemberClinicalInfo.familyHistory}
              </SummaryNotes>
            </Col>
          }
          <Col md={12}>
            <SummaryDetails> 
            <SummaryTitle> Consanguinity:  </SummaryTitle>
              {this.props.familyMemberClinicalInfo.consanguinity ? 'Yes' : 'No'} 
            </SummaryDetails>
          </Col>
        </Row>
      </SummaryBox>
    )
  }
}

export default FamilyMemberModule;