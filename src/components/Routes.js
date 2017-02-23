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
import BillingInfo from './../containers/BillingInfo';

function Routes({ onChange, data, previousData }) {
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/step1" component={OrderTest} onChange={onChange} data={data.OrderTest}/>
      <Route path="/step2" component={PatientDetails} onChange={onChange} data={data.PatientDetails}/>
      <Route path="/step3" component={ClinicalInfo} onChange={onChange} data={data.ClinicalInfo}/>
      <Route path="/step4" component={ClinicianDetails} onChange={onChange} data={data.ClinicianDetails} />
      <Route path="/step5" component={BillingInfo} onChange={onChange} data={data.BillingInfo} previousData={data.ClinicianDetails}/>
      <Redirect from="/" to="step1"/> 
    </Router>
  );
}

export default Routes;
