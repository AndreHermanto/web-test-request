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
  SectionHeading
} from '../summaryStyled';
import { 
  FileList,
  FileLink
} from './../../../components/SharedStyle';
import { isoToShortDate } from './../../../components/dateConvert';
import { downloadAttachment } from './../api';

/**
* PatientDetailsModule summary - UI for summary page to display all patient details/clinical info data.
*/
class PatientDetailsModule extends Component
{
  constructor(props) {
    super(props);
    this.handleDetailsClick = this.handleDetailsClick.bind(this);
    this.handleClinicalInfoClick = this.handleClinicalInfoClick.bind(this);
  }

  handleDetailsClick() {
    this.props.handleOnClick('step2');
    return 2;
  }

  handleClinicalInfoClick() {
    this.props.handleOnClick('step3');
    return 3;
  }

  displayNotes(notes) {
    return notes.map((n, i) => {
      if(n === '') {
        return <p key={i} style={{fontWeight:200, borderBottom: '1px solid #ccc', paddingTop:15}}></p>;
      }
      else {
        return <p key={i} style={{fontWeight:200, borderBottom: '1px solid #ccc'}}>{n}</p>;
      }
    })
  }

  render() {
    let clinicalNotes = this.displayNotes(this.props.clinicalInfo.clinicalInfo.split(/\r?\n/));
    let relevantInvestigationNotes = this.displayNotes(this.props.clinicalInfo.relevantInvestigation.split(/\r?\n/));
    let familyNotes = this.displayNotes(this.props.clinicalInfo.familyHistory.split(/\r?\n/));
    let consanguinityNotes = this.displayNotes(this.props.clinicalInfo.consanguinityInfo.split(/\r?\n/));
    return(
    <SummaryBox>
      <SummaryHeading> Patient - {this.props.patientDetails.firstName + ' ' + this.props.patientDetails.lastName} </SummaryHeading>
      <SummaryBreakLine/>
      <Row>
        <Col md={12}>
          <SectionHeading> 
            Details
            {this.props.handleOnClick &&
              <Button 
                bsStyle="link"
                onClick={this.handleDetailsClick}
              >
                <Glyphicon glyph="pencil"/> Edit
              </Button>
            }
          </SectionHeading>
        </Col>
        <Col md={12}>
          <SummaryDetails> 
            <SummaryTitle> Date of Birth: </SummaryTitle>
            {isoToShortDate(this.props.patientDetails.dob)}
          </SummaryDetails>
        </Col>
        {
          this.props.patientDetails.medicalRecordNo !== '' &&
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Medical record number:  </SummaryTitle>
              {this.props.patientDetails.medicalRecordNo}
            </SummaryDetails>
          </Col>
        }
        <Col md={12}>
          <SummaryDetails> 
            <SummaryTitle> Gender:  </SummaryTitle>
              {this.props.patientDetails.gender === 'Other' ?
                this.props.patientDetails.genderOther + ' (Other)' :
                this.props.patientDetails.gender
              } 
          </SummaryDetails>
        </Col>
        {
          this.props.patientDetails.deceased !== false &&
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Deceased:  </SummaryTitle>
              {this.props.patientDetails.deceased ? 'Yes' : 'No'}
            </SummaryDetails>
          </Col>
        }
        {
          (this.props.patientDetails.deceased !== false && this.props.patientDetails.sampleSource !== '') &&
          <Col md={12}>
            <SummaryDetails> 
              <SummaryTitle> Sample source:  </SummaryTitle>
              {this.props.patientDetails.sampleSource}
            </SummaryDetails>
          </Col>
        }
        <Col md={12}>
          <SectionHeading> 
            Clinical Information
            {this.props.handleOnClick &&
              <Button 
                bsStyle="link"
                onClick={this.handleClinicalInfoClick}
              >
                <Glyphicon glyph="pencil"/> Edit
              </Button>
            }
          </SectionHeading>
        </Col>
        <Col md={12}>
          <SummaryTitle> Clinical note </SummaryTitle>
          <SummaryNotes>
          {clinicalNotes}
          </SummaryNotes>
        </Col>
        {
          this.props.clinicalInfo.relevantInvestigation !== '' &&
          <Col md={12}>
            <SummaryTitle> Relevant investigation </SummaryTitle>
            <SummaryNotes>
              {relevantInvestigationNotes}
            </SummaryNotes>
          </Col>
        }
        {
          this.props.clinicalInfo.familyHistory !== '' &&
          <Col md={12}>
            <SummaryTitle> Family history </SummaryTitle>
            <SummaryNotes>
              {familyNotes}
            </SummaryNotes>
          </Col>
        }
        {
          (this.props.clinicalInfo.attachments && this.props.clinicalInfo.attachments.length > 0) &&
          <Col md={12}>
            <SummaryTitle> Attachments </SummaryTitle>
              <div>
              { 
                this.props.clinicalInfo.attachments.map((attachment, $index) => {
                  return <FileList key={$index}>
                    <FileLink 
                      bsStyle="link" 
                      onClick={() => downloadAttachment(attachment.id, attachment.filename)}
                      style={{ padding: '6px 0'}}
                    >
                      <Glyphicon glyph="file"/> {attachment.filename}
                    </FileLink>
                  </FileList>
                })
              }
            </div>
            <br />
          </Col>
        }

        <Col md={12}>
          <SummaryDetails> 
            <SummaryTitle> Consanguinity:  </SummaryTitle>
              {this.props.clinicalInfo.consanguinity ? 'Yes' : 'No'}
            </SummaryDetails>
        </Col>
        {
          (this.props.clinicalInfo.consanguinity && this.props.clinicalInfo.consanguinityInfo !== '') &&
          <Col md={12}>
            <SummaryTitle> Consanguinity Information </SummaryTitle>
            <SummaryNotes>
            {consanguinityNotes}
            </SummaryNotes>
          </Col>
        }
      </Row>
    </SummaryBox>
    )
  }
}

export default PatientDetailsModule;