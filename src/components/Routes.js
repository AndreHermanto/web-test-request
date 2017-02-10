import React from 'react';
import {
  Router,
  Route,
  Redirect,
  hashHistory
} from 'react-router';
import OrderTest from './../containers/OrderTest';
import PatientDetails from './../containers/PatientDetails';

function Routes({ onChange }) {
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/step1" component={OrderTest} onChange={onChange} />
      <Route path="/step2" component={PatientDetails} onChange={onChange}/>
      <Redirect from="/" to="step1"/> 
    </Router>
  );
}

export default Routes;
