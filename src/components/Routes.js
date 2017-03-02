import React from 'react';
import {
  Router,
  Route,
  Redirect,
  hashHistory
} from 'react-router';
import OrderTest from './../containers/OrderTest';
import PatientDetails from './../containers/PatientDetails';
import ClinicianDetails from './../containers/ClinicianDetails';
import ClinicalInfo from './../containers/ClinicalInfo';
import FamilyMember from './../containers/FamilyMember';
import FamilyMemberDetails from './../containers/FamilyMemberDetails';
import FamilyMemberClinicalInfo from './../containers/FamilyMemberClinicalInfo';
import BillingInfo from './../containers/BillingInfo';
import Summary from './../containers/Summary';

function Routes({ onChange, onFamilyMemberChange, onFamilyMemberDelete, data }) {
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/step1" component={OrderTest} onChange={onChange} data={data.OrderTest}/>
      <Route path="/step2" component={PatientDetails} onChange={onChange} data={data.PatientDetails}/>
      <Route path="/step3" component={ClinicalInfo} onChange={onChange} data={data.ClinicalInfo}/>
      <Route path="/step4" component={FamilyMember} onChange={onChange} onDelete={onFamilyMemberDelete} data={data.FamilyMember} patientData={data.PatientDetails}/>
      <Route path="/step4/:mode/1/:id" component={FamilyMemberDetails} onChange={onFamilyMemberChange} onDelete={onFamilyMemberDelete} data={data.FamilyMember}/>
      <Route path="/step4/:mode/2/:id" component={FamilyMemberClinicalInfo} onChange={onFamilyMemberChange} onDelete={onFamilyMemberDelete} data={data.FamilyMember} clinicalInfoData={data.ClinicalInfo}/>
      <Route path="/step5" component={ClinicianDetails} onChange={onChange} data={data.ClinicianDetails} />
      <Route path="/step6" component={BillingInfo} onChange={onChange} data={data.BillingInfo} clinicianData={data.ClinicianDetails || {}} />
      <Route path="/summary" component={Summary} onChange={onChange} data={data}/>
      <Redirect from="/" to="step1"/>
    </Router>
  );
}

export default Routes;
