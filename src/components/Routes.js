import React from 'react';
import {
  Router,
  Route,
  Redirect,
  hashHistory
} from 'react-router';
import OrderTest from './../containers/OrderTest';
import PatientDetails from './../containers/PatientDetails';

function Routes({ onChange, data }) {
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/step1" component={OrderTest} onChange={onChange} data={data.OrderTest}/>
      <Route path="/step2" component={PatientDetails} onChange={onChange} data={data.PatientDetails}/>
      <Redirect from="/" to="step1"/> 
    </Router>
  );
}

export default Routes;
