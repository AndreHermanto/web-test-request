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
  onClean,
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
          data={data.orderTestModule}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route 
          path="step2"
          component={PatientDetails}
          onChange={onChange}
          data={data.patientDetailsModule}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route 
          path="step3"
          component={ClinicalInfo}
          onChange={onChange}
          data={data.clinicalInfoModule}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step4"
          component={FamilyMember}
          onChange={onChange}
          onDelete={onFamilyMemberDelete}
          data={data.familyMembersModule}
          patientData={data.patientDetailsModule}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route 
          path="step4/:mode/1/:id"
          component={FamilyMemberDetails}
          onChange={onFamilyMemberChange}
          onDelete={onFamilyMemberDelete}
          data={data.familyMembersModule}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step4/:mode/2/:id"
          component={FamilyMemberClinicalInfo}
          onChange={onFamilyMemberChange}
          onDelete={onFamilyMemberDelete}
          data={data.familyMembersModule}
          clinicalInfoData={data.clinicalInfoModule}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step5"
          component={ClinicianDetails}
          onChange={onChange}
          data={data.clinicianDetailsModule}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="step6"
          component={BillingInfo}
          onChange={onChange}
          data={data.billingInfoModule}
          orderTestData={data.orderTestModule || {}}
          clinicianData={data.clinicianDetailsModule || {}}
          patientData={data.patientDetailsModule || {}}
          familyMemberData={data.familyMembersModule || {}}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
        <Route
          path="summary"
          component={Summary}
          onChange={onChange}
          testRequest={data}
          onEdit={onEdit}
          isEdited={isEdited}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
      </Route>
      <Route path="/confirmation" component={Confirmation} data={data} onClean={onClean}/>
    </Router>
  );
}



export default Routes;
