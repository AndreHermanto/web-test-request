import React from 'react';
import {
  Router,
  Route,
  Redirect,
  hashHistory
} from 'react-router';
import OrderTest from './../containers/OrderTest';
import ClinicianDetails from './../containers/ClinicianDetails';
function Routes({ onChange }) {
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Route path="/step4" component={OrderTest} onChange={onChange} />
      <Route path="/step1" component={ClinicianDetails} onChange={onChange}/>
      <Redirect from="/" to="step1"/> 
    </Router>
  );
}

export default Routes;
