import React from 'react';
import {
  Router,
  Route,
  Redirect,
  hashHistory
} from 'react-router';
import ProgressBar from './ProgressBar';
import OrderTest from './../containers/OrderTest';
import PatientDetails from './../containers/PatientDetails';
import ClinicianDetails from './../containers/ClinicianDetails';
import ClinicalInfo from './../containers/ClinicalInfo';
import FamilyMember from './../containers/FamilyMember';
import FamilyMemberDetails from './../containers/FamilyMemberDetails';
import FamilyMemberClinicalInfo from './../containers/FamilyMemberClinicalInfo';
import BillingInfo from './../containers/BillingInfo';
import Summary from './../containers/Summary';
import Confirmation from './../containers/Confirmation';

function Routes({ 
  onChange,
  onFamilyMemberChange,
  onFamilyMemberDelete,
  data,
  onEdit,
  isEdited,
  redirectStepOne,
  preventUnvisitedFormAccess
}) {
  
  return (
    <Router key={Math.random()} history={hashHistory}>
      <Redirect replace={true} from="/" to="/step1"/>
      <Route path="/" component={ProgressBar} data={data} onEnter={redirectStepOne}>
        <Route 
          path="step1"
          component={OrderTest}
          onChange={onChange}
          data={data.OrderTest}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route 
          path="step2"
          component={PatientDetails}
          onChange={onChange}
          data={data.PatientDetails}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route 
          path="step3"
          component={ClinicalInfo}
          onChange={onChange}
          data={data.ClinicalInfo}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step4"
          component={FamilyMember}
          onChange={onChange}
          onDelete={onFamilyMemberDelete}
          data={data.FamilyMember}
          patientData={data.PatientDetails}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route 
          path="step4/:mode/1/:id"
          component={FamilyMemberDetails}
          onChange={onFamilyMemberChange}
          onDelete={onFamilyMemberDelete}
          data={data.FamilyMember}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step4/:mode/2/:id"
          component={FamilyMemberClinicalInfo}
          onChange={onFamilyMemberChange}
          onDelete={onFamilyMemberDelete}
          data={data.FamilyMember}
          clinicalInfoData={data.ClinicalInfo}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step5"
          component={ClinicianDetails}
          onChange={onChange}
          data={data.ClinicianDetails}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step6"
          component={BillingInfo}
          onChange={onChange}
          data={data.BillingInfo}
          orderTestData={data.OrderTest || {}}
          clinicianData={data.ClinicianDetails || {}}
          patientData={data.PatientDetails || {}}
          familyMemberData={data.FamilyMember || {}}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="summary"
          component={Summary}
          onChange={onChange}
          testRequest={data}
          onEdit={onEdit}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
      </Route>
      <Route path="/confirmation" component={Confirmation} data={data}/>
    </Router>
  );
}



export default Routes;
