import React, { Component } from 'react';
import { Row, Col, Well, Label } from 'react-bootstrap';
import { submitTestRequest } from './api';
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import { 
  SummaryBox,
  SummaryHeading,
  SummaryBreakLine,
  EditButton,
  EditButtonXS,
  SummaryTitle,
  SummaryDetails,
  SectionHeading,
  Gene,
  Tag,
  SummaryNotes
} from './summaryStyled'; 
import Toggle from './../../components/Toggle';
import {
  initData,
  setSignatureData,
  validatedToTrue,
  setLoadingData
} from './reducer';
import './loading.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import styled from 'styled-components';

const GeneLabel = styled(Label)`
  margin-right: 4px;
  display: inline-block !important;
  font-weight: 300 !important;
`;


/**
* Summary - UI for summary page to display all form data.
*/
class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = initData(props.route.data);
    this.handleBack = this.handleBack.bind(this);
    this.handleValidateSubmit = this.handleValidateSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(setSignatureData(this.state, event.target));
  }

  handleEdit(step) {
    this.props.route.onEdit(true); 
    this.props.router.push(step);
  }
  
  handleBack() {
    this.props.route.onChange(this); 
    this.props.router.push('/step6');
  }

  validate() {
    return this.state.validated && this.state.validation;
  }

  handleSubmit()
  {
    return submitTestRequest(this.state.form)
      .then((response) => {
        if(!response.ok) {
          this.setState(setLoadingData(this.state, ''));
          setTimeout(function() { 
            NotificationManager.error('Error','Submit fail', 1000); 
          });
          return false;
        } else {
          this.setState(setLoadingData(this.state, 'loading'));
          setTimeout(function() { 
            this.props.router.push('/confirmation'); 
          }.bind(this), 3000);
          return true;
        }
    })
  }
  
  handleValidateSubmit() {
    this.setState(validatedToTrue(this.state), () => {   
      for (var field in this.state.validation) {
        if(this.state.validation[field].status !== 'error') {
          this.handleSubmit();
        }
      }
    });
  }

  render() {
    return (
      <div>
        <PageHeading> Request summary</PageHeading>
        <SummaryBox>
          <EditButton className="glyphicon glyphicon-edit pull-right" onClick={() => this.handleEdit('step1')}/>
          <SummaryHeading> Order Test </SummaryHeading>
          <SummaryBreakLine/>
          <Row>
            <Col md={12}>
              <SummaryDetails> <strong>{this.props.route.data.OrderTest.test.label}</strong></SummaryDetails>
            </Col>
            <Col md={12}>
              {this.props.route.data.OrderTest.genes && 
                <SummaryDetails> Total number of genes available: 
                  <Gene>
                    {this.props.route.data.OrderTest.genes.length} 
                  </Gene> 
                </SummaryDetails>
              }

              {this.props.route.data.OrderTest.genes && (
                <Well>
                  {
                    this.props.route.data.OrderTest.genes.map((gene, $index) => {
                      return <GeneLabel key={$index}>{gene}</GeneLabel> 
                    })
                  }
                </Well>
              )}
            </Col>
          </Row>
        </SummaryBox>
        <SummaryBox>
          <SummaryHeading> Patient - {this.props.route.data.PatientDetails.firstName + ' ' + this.props.route.data.PatientDetails.lastName} </SummaryHeading>
          <SummaryBreakLine/>
          <Row>
            <Col md={12}>
              <SectionHeading> 
                Details
                <EditButtonXS className="glyphicon glyphicon-edit" onClick={() => this.handleEdit('step2')}/>
              </SectionHeading>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
              <SummaryTitle> Date of Birth: </SummaryTitle>
              {this.props.route.data.PatientDetails.dob}
              </SummaryDetails>
            </Col>
            {
              this.props.route.data.PatientDetails.medicalRecordNo !== '' &&
              <Col md={12}>
                <SummaryDetails> 
                  <SummaryTitle> Medical record number:  </SummaryTitle>
                  {this.props.route.data.PatientDetails.medicalRecordNo}
                </SummaryDetails>
              </Col>
            }
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Gender:  </SummaryTitle>
                {this.props.route.data.PatientDetails.gender === 'Other' ?
                  this.props.route.data.PatientDetails.genderOther + ' (Other)' :
                  this.props.route.data.PatientDetails.gender
                } 
              </SummaryDetails>
            </Col>
            {
              this.props.route.data.PatientDetails.ethnicity !== '' &&
              <Col md={12}>
                <SummaryDetails> 
                  <SummaryTitle> Ethnicity:  </SummaryTitle>
                  {this.props.route.data.PatientDetails.ethnicity}
                </SummaryDetails>
              </Col>
            }
            {
              this.props.route.data.PatientDetails.deceased !== false &&
              <Col md={12}>
                <SummaryDetails> 
                  <SummaryTitle> Deceased:  </SummaryTitle>
                  {this.props.route.data.PatientDetails.deceased ? 'Yes' : 'No'}
                </SummaryDetails>
              </Col>
            }
            {
              (this.props.route.data.PatientDetails.deceased !== false && this.props.route.data.PatientDetails.sampleSource !== '') &&
              <Col md={12}>
                <SummaryDetails> 
                  <SummaryTitle> Sample source:  </SummaryTitle>
                  {this.props.route.data.PatientDetails.sampleSource}
                </SummaryDetails>
              </Col>
            }
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Email:  </SummaryTitle>
                {this.props.route.data.PatientDetails.email} 
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SectionHeading> 
                Clinical Information
                <EditButtonXS className="glyphicon glyphicon-edit" onClick={() => this.handleEdit('step3')}/>
              </SectionHeading>
            </Col>
            <Col md={12}>
              <SummaryTitle> Clinical note </SummaryTitle>
              <SummaryNotes>
                {this.props.route.data.ClinicalInfo.clinicalInfo}
              </SummaryNotes>
            </Col>
            {
              this.props.route.data.ClinicalInfo.relevantInvestigation !== '' &&
              <Col md={12}>
                <SummaryTitle> Relevant investigation </SummaryTitle>
                <SummaryNotes>
                  {this.props.route.data.ClinicalInfo.relevantInvestigation}
                </SummaryNotes>
              </Col>
            }
            {
              this.props.route.data.ClinicalInfo.familyHistory !== '' &&
              <Col md={12}>
                <SummaryTitle> Family history </SummaryTitle>
                <SummaryNotes>
                  {this.props.route.data.ClinicalInfo.familyHistory}
                </SummaryNotes>
              </Col>
            }
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Consanguinity:  </SummaryTitle>
                {this.props.route.data.ClinicalInfo.consanguinity ? 'Yes' : 'No'} 
              </SummaryDetails>
            </Col>
          </Row>
        </SummaryBox>
        {
            this.props.route.data.FamilyMember.familyMember.length > 0 &&
            this.props.route.data.FamilyMember.familyMember.map((member, i) => 
            {
              return <SummaryBox key={i}>
                <SummaryHeading> Family Member - {member.FamilyMemberDetails.firstName + ' ' + member.FamilyMemberDetails.lastName}
                  <Tag bsStyle={member.FamilyMemberClinicalInfo.affected ? 'danger' : 'success'}>
                    {member.FamilyMemberClinicalInfo.affected ? 'Affected' : 'Unaffected'}
                  </Tag>
                </SummaryHeading>
                <SummaryBreakLine/>
                  <Row>
                    <Col md={12}>
                      <SectionHeading> 
                        Details
                        <EditButtonXS className="glyphicon glyphicon-edit" onClick={() => this.handleEdit(`/step4/edit/1/${i}`)}/>
                      </SectionHeading>
                    </Col>
                    <Col md={12}>
                      <SummaryDetails> 
                        <SummaryTitle> Date of Birth:  </SummaryTitle>
                          {member.FamilyMemberDetails.dob}
                      </SummaryDetails>
                    </Col>
                    {
                      member.FamilyMemberDetails.medicalRecordNo !== '' && 
                      <Col md={12}>
                        <SummaryDetails> 
                          <SummaryTitle> Medical record number:  </SummaryTitle>
                          {member.FamilyMemberDetails.medicalRecordNo}
                        </SummaryDetails>
                      </Col>
                    }
                    <Col md={12}>
                      <SummaryDetails> 
                        <SummaryTitle> Gender:  </SummaryTitle>
                        {
                          member.FamilyMemberDetails.gender === 'Other' ?
                          member.FamilyMemberDetails.genderOther + ' (Other)' :
                          member.FamilyMemberDetails.gender
                        } 
                      </SummaryDetails>
                    </Col>
                    {
                      member.FamilyMemberDetails.ethnicity !== '' && 
                      <Col md={12}>
                        <SummaryDetails> 
                          <SummaryTitle> Ethnicity:  </SummaryTitle>
                          {member.FamilyMemberDetails.ethnicity}
                        </SummaryDetails>
                      </Col>
                    }
                    {
                      member.FamilyMemberDetails.deceased !== false &&
                      <Col md={12}>
                        <SummaryDetails> 
                        <SummaryTitle> Deceased:  </SummaryTitle>
                          {member.FamilyMemberDetails.deceased ? 'Yes' : 'No'}
                        </SummaryDetails>
                      </Col>
                    }
                    {
                      (member.FamilyMemberDetails.deceased !== false && member.FamilyMemberDetails.sampleSource !== '') && 
                      <Col md={12}>
                        <SummaryDetails> 
                          <SummaryTitle> Sample source:  </SummaryTitle>
                          {member.FamilyMemberDetails.sampleSource}
                        </SummaryDetails>
                      </Col>
                    }
                    <Col md={12}>
                      <SummaryDetails> 
                        <SummaryTitle> Email:  </SummaryTitle>
                        {member.FamilyMemberDetails.email}
                      </SummaryDetails>
                    </Col>

                    <Col md={12}>
                      <SectionHeading> 
                        Clinical Information
                        <EditButtonXS className="glyphicon glyphicon-edit" onClick={() => this.handleEdit(`/step4/edit/2/${i}`)}/>
                      </SectionHeading>
                    </Col>
                    <Col md={12}>
                      <SummaryTitle> Clinical note </SummaryTitle>
                      <SummaryNotes>
                        {member.FamilyMemberClinicalInfo.clinicalInfo}
                      </SummaryNotes>
                    </Col>
                    {
                      member.FamilyMemberClinicalInfo.relevantInvestigation !== '' &&
                      <Col md={12}>
                        <SummaryTitle> Relevant investigation note </SummaryTitle>
                        <SummaryNotes>
                          {member.FamilyMemberClinicalInfo.relevantInvestigation}
                        </SummaryNotes>
                      </Col>
                    }
                    {
                      member.FamilyMemberClinicalInfo.familyHistory !== '' &&
                      <Col md={12}>
                        <SummaryTitle> Family history note </SummaryTitle>
                        <SummaryNotes>
                          {member.FamilyMemberClinicalInfo.familyHistory}
                        </SummaryNotes>
                      </Col>
                    }
                    <Col md={12}>
                      <SummaryDetails> 
                      <SummaryTitle> Consanguinity:  </SummaryTitle>
                        {member.FamilyMemberClinicalInfo.consanguinity ? 'Yes' : 'No'} 
                      </SummaryDetails>
                    </Col>
                  </Row>
              </SummaryBox>
            })
          }
          <SummaryBox>
          <EditButton className="glyphicon glyphicon-edit pull-right" onClick={() => this.handleEdit('step5')}/>
          <SummaryHeading> Clinician details </SummaryHeading>
          <SummaryBreakLine/>
          <Row>
            <Col md={12}>
              <SummaryDetails> 
                <strong>
                  {this.props.route.data.ClinicianDetails.firstName + ' ' + this.props.route.data.ClinicianDetails.lastName}
                </strong>
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                {this.props.route.data.ClinicianDetails.organisation}
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Provider number:  </SummaryTitle>
                {this.props.route.data.ClinicianDetails.providerNumber}
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Medical specialty:  </SummaryTitle>
                {this.props.route.data.ClinicianDetails.medicalSpecialty}
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Phone:  </SummaryTitle>
                {this.props.route.data.ClinicianDetails.phone}
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Email:  </SummaryTitle>
                {this.props.route.data.ClinicianDetails.email}
              </SummaryDetails>
            </Col>
            {
              this.props.route.data.ClinicianDetails.fax !== '' &&
              <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Fax:  </SummaryTitle>
                {this.props.route.data.ClinicianDetails.fax}
              </SummaryDetails>
            </Col>
            }
          </Row>
          {
            this.props.route.data.ClinicianDetails.copyToHCP.length > 0 && 
            <div>
            <SummaryBreakLine/>
            <SummaryHeading> Copy </SummaryHeading>
            </div>
          }
          {
            this.props.route.data.ClinicianDetails.copyToHCP.length > 0 && 
            this.props.route.data.ClinicianDetails.copyToHCP.map((c, i) => {
            return <Row key={i}>
              <Col md={12}>
              <SummaryDetails> 
                <strong>
                {c.additionalFirstName} {c.additionalLastName}
                </strong>
              </SummaryDetails>
              </Col>
              <Col md={12}>
                <SummaryDetails> 
                  {c.additionalOrganisation}
                </SummaryDetails>
              </Col>
              <Col md={12}>
                <SummaryDetails> 
                  <SummaryTitle> Email: </SummaryTitle>
                  {c.additionalEmail}
                </SummaryDetails>
                </Col>
              </Row>
            })
          }
        </SummaryBox>
        
        <SummaryBox>
          <EditButton className="glyphicon glyphicon-edit pull-right" onClick={this.handleBack}/>
          <SummaryHeading> {this.props.route.data.BillingInfo.billOption} billing </SummaryHeading>
          <SummaryBreakLine/>
          <Row>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Payer:  </SummaryTitle>
                {this.props.route.data.BillingInfo.payer}
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Mobile:  </SummaryTitle>
                {this.props.route.data.BillingInfo.phone}
              </SummaryDetails>
            </Col>
            <Col md={12}>
              <SummaryDetails> 
                <SummaryTitle> Email:  </SummaryTitle>
                {this.props.route.data.BillingInfo.payerEmail}
              </SummaryDetails>
            </Col>
          </Row>
        </SummaryBox>
        <Toggle
          field="signature"
          label="Electronic signature"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />
        <FormButton 
          bsStyle="warning" 
          onClick={this.handleBack}
          label="Back"
        >
          Back
        </FormButton> 
      
        <FormButton 
          bsStyle="success" 
          type="submit" 
          onClick={this.handleValidateSubmit}
        >
          Submit
        </FormButton> 
        <span className={this.state.loading}/>
        <NotificationContainer/>
      </div>
    );
  }
}

export default Summary;