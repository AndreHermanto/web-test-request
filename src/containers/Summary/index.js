import React, { Component } from 'react';
import { submitTestRequest } from './api';
import { 
  PageHeading,
  FormButton,
  Helper
} from './../../components/SharedStyle';

import Toggle from './../../components/Toggle';
import {
  initData,
  setSignatureData,
  validatedToTrue,
  setSubmitStatusData,
  setSubmitData
} from './reducer';
import './loading.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import OrderTestModule from './components/OrderTestModule';
import PatientDetailsModule  from './components/PatientDetailsModule';
import FamilyMemberModule from './components/FamilyMemberModule';
import ClinicianDetailsModule  from './components/ClinicianDetailsModule';
import BillingInfoModule from './components/BillingInfoModule';
/**
* Summary - UI for summary page to display all form data.
*/
class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = initData(props.route.testRequest);
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
    this.setState(setSubmitData(this.state, this.state.form.signature));
    return submitTestRequest({testRequest:this.state.form.testRequest})
      .then((response) => {
        if(!response.ok) {
          setTimeout(function() { 
            this.setState(setSubmitStatusData(this.state, ''));
            NotificationManager.error('Error','Submit fail', 1000); 
          }.bind(this), 100);
          return false;
        } else {
          this.setState(setSubmitStatusData(this.state, ''));
          this.props.router.push('/confirmation'); 
          return true;
        }
    })
  }
  
  handleValidateSubmit() {
    this.setState(validatedToTrue(this.state), () => {
      for (var field in this.state.validation) {
        if(this.state.validation[field].status !== 'error') {
          this.setState(setSubmitStatusData(this.state, 'loading'));
          this.handleSubmit();
        }
      }
    });
  }

  render() {
    return (
      <div>
        <PageHeading> Request summary</PageHeading>
        <OrderTestModule orderTestModule={this.state.form.testRequest.orderTestModule} handleOnClick={this.handleEdit}/>
        <PatientDetailsModule patientDetails={this.state.form.testRequest.patientDetailsModule} clinicalInfo={this.state.form.testRequest.clinicalInfoModule} handleOnClick={this.handleEdit}/>
        {
          this.state.form.testRequest.familyMembersModule.familyMembers.length > 0 &&
          this.state.form.testRequest.familyMembersModule.familyMembers.map((member, i) => 
          {
            return <FamilyMemberModule familyMemberDetails={member.familyMemberDetails} familyMemberClinicalInfo={member.familyMemberClinicalInfo}
              handleOnClick={this.handleEdit} key={i}/>
          })
        }
        <ClinicianDetailsModule clinicianDetailsModule={this.state.form.testRequest.clinicianDetailsModule} handleOnClick={this.handleEdit}/>
        <BillingInfoModule billingInfoModule={this.state.form.testRequest.billingInfoModule} clinicianDetailsModule={this.state.form.testRequest.clinicianDetailsModule} handleOnClick={this.handleEdit}/>
        <Toggle
          field="signature"
          label="Click here to digitally sign the form"
          onChange={this.handleChange}
          onValidate={this.validate()}
          formState={this.state.form}
          required
        />
        <br />
        <Helper>
            When you submit this test request, an email will be sent to this payer with a weblink to view the invoice.  
        </Helper>
        <FormButton  
          onClick={this.handleBack}
          label="Back"
          back
        >
          Back
        </FormButton>       
        <FormButton 
          type="submit" 
          onClick={this.handleValidateSubmit}
        >
          Submit
        </FormButton> 
        <span className={this.state.submitStatus}/>
        <NotificationContainer/>
      </div>
    );
  }
}

export default Summary;