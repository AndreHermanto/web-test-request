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
import BillingInfo from './../containers/BillingInfo';
import Summary from './../containers/Summary';

function Routes({ onChange, data, previousData }) {
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/step1" component={OrderTest} onChange={onChange} data={data.OrderTest}/>
      <Route path="/step2" component={PatientDetails} onChange={onChange} data={data.PatientDetails}/>
      <Route path="/step3" component={ClinicalInfo} onChange={onChange} data={data.ClinicalInfo}/>
      <Route path="/step4" component={FamilyMember} onChange={onChange} data={data.FamilyMember} patientData={data.PatientDetails}/>
      <Route path="/step5" component={ClinicianDetails} onChange={onChange} data={data.ClinicianDetails} />
      <Route path="/step6" component={BillingInfo} onChange={onChange} data={data.BillingInfo} clinicianData={data.ClinicianDetails || {}} />
      <Route path="/summary" component={Summary} onChange={onChange} data={data}/>
      <Redirect from="/" to="step1"/> 
    </Router>
  );
}

export default Routes;
