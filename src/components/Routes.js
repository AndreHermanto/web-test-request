import React from 'react';
import {
  Router,
  Route,
  Redirect,
  hashHistory
} from 'react-router';
import OrderTest from './../containers/OrderTest';
import PatientDetails from './../containers/PatientDetails';
import ClinicalInfo from './../containers/ClinicalInfo';

function Routes({ onChange, data }) {
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/step1" component={OrderTest} onChange={onChange} data={data.OrderTest}/>
      <Route path="/step2" component={PatientDetails} onChange={onChange} data={data.PatientDetails}/>
      <Route path="/step3" component={ClinicalInfo} onChange={onChange} data={data.ClinicalInfo}/>
      <Redirect from="/" to="step1"/> 
    </Router>
  );
}

export default Routes;
