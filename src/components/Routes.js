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

const data = {
  "orderTestModule": {
            test: {
      id:'7052d137-a166-48b0-a52e-e05a167bd176',
      label: 'Consequatur adipisci modi laudantium tenetur ea exercitationem id',
      geneLists:[{
        type: "complete",
        genes: ["GZOW","KIHG","DRCO","DWBY","ZMZY","BMBP","OLZO","PZOA"]
      }]
    }
    },
    "patientDetailsModule": {
        "lastName": "Agudo",
        "firstName": "Joshua",
        "dob": "2020-02-02",
        "medicalRecordNo": "",
        "gender": "Male",
        "genderOther": "",
        "ethnicity": "Filipino",
        "deceased": false,
        "sampleSource": "",
        "consent": true
    },
    "clinicalInfoModule": {
        "clinicalInfo": "Here is some clinical information",
        "affected": false,
        "relevantInvestigation": "",
        "familyHistory": "",
        "consanguinity": false,
        "attachments":[]
    },
    "familyMembersModule": {
        "familyMembers": [
            {
                "familyMemberDetails": {
                    "lastName": "Blah",
                    "firstName": "Mother",
                    "dob": "2020-02-02",
                    "medicalRecordNo": "adsa",
                    "gender": "Female",
                    "genderOther": "",
                    "ethnicity": "",
                    "deceased": false,
                    "sampleSource": "",
                    "consent": true
                },
                "familyMemberClinicalInfo": {
                    "clinicalInfo": "adssda",
                    "affected": true,
                    "relevantInvestigation": "",
                    "familyHistory": "",
                    "consanguinity": false
                }
            }
        ]
    },
    "clinicianDetailsModule": {
        "providerNumber": "123123",
        "medicalSpecialty": "IBD",
        "firstName": "Boaty",
        "lastName": "McBoatFace",
        "organisation": "Garvan Institute",
        "phone": "12390098123",
        "email": "slkjs@alkjs.com",
        "fax": "",
        "copy": false,
        "copyToHCP": [
                {
                    "firstName": "Hello",
                    "lastName": "World",
                    "organisation": "Some organisation",
                    "email": "hello@world.com"
                }
        ],
    },
    "billingInfoModule": {
        "billOption": "Private",
        "payer": "Joshua Agudo",
        "phone": "1231232131",
        "firstName": "Joshua",
        "lastName": "Agudo",
        "payerEmail": "joshua.agudo@genome.one",
        "consent": true
    }
}
function Routes({ 
  onChange,
  onFamilyMemberChange,
  onFamilyMemberDelete,
  onFormState,
  onClean,
  isEdited,
  isSubmitted,
  isReSubmit,
  lastestRequestID,
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
          onFormState={onFormState}
          isEdited={isEdited}
          isSubmitted={isSubmitted}
          lastestRequestID={lastestRequestID}
          preventUnvisitedFormAccess={preventUnvisitedFormAccess}
        />
      </Route>
      <Route path="/confirmation/:id" component={Confirmation} data={data} isReSubmit={isReSubmit} onClean={onClean}/>
    </Router>
  );
}



export default Routes;
