import React from 'react';
import styled from 'styled-components';
import PrintHeader from './PrintBloodCollectionComponents/PrintHeader';
import PrintOrderTestModule from './PrintBloodCollectionComponents/PrintOrderTestModule';
import PrintPatientModule from './PrintBloodCollectionComponents/PrintPatientModule';
import PrintFamilyModule  from './PrintBloodCollectionComponents/PrintFamilyModule';
import PrintClinicianDetailsModule from './PrintBloodCollectionComponents/PrintClinicianDetailsModule';
import PrintBillingInfoModule from './PrintBloodCollectionComponents/PrintBillingInfoModule';
import PrintSpecimenInfo from './PrintBloodCollectionComponents/PrintSpecimenInfo';
import PrintCollectorDeclaration from './PrintBloodCollectionComponents/PrintCollectorDeclaration';
const Page = styled.div`
  display: block !important;
  box-sizing: content-box !important; 
  page-break-after: always !important;
  -webkit-region-break-after: always !important;
  position: static !important;
  padding: 0px 75px 0px 75px !important;
`;

// Print the entire test request
export default function PrintBloodCollection(props) {
  return (
    <div>
      <Page>
        <PrintHeader />
        <br />
        <PrintOrderTestModule orderTestModule={props.orderTestModule}/>
        <PrintPatientModule patientDetails={props.patientDetails} clinicalInfo={props.clinicalInfo}/>
        <PrintClinicianDetailsModule clinicianDetails={props.clinicianDetails}/>
        <PrintBillingInfoModule clinicianDetails={props.clinicianDetails} billingInfo={props.billingInfo}/>
        <PrintSpecimenInfo />
        <PrintCollectorDeclaration />
      </Page>
      
      {props.familyMember.familyMembers.map((member, $index) => {
          return (
            <Page key={$index}>
              <PrintHeader />
              <br />
              <PrintOrderTestModule orderTestModule={props.orderTestModule}/>
              <PrintFamilyModule patientDetails={props.patientDetails} familyMemberDetails={member.familyMemberDetails} familyMemberClinicalInfo={member.familyMemberClinicalInfo}/>
              <PrintClinicianDetailsModule clinicianDetails={props.clinicianDetails}/>
              <PrintBillingInfoModule clinicianDetails={props.clinicianDetails} billingInfo={props.billingInfo}/>
              <PrintSpecimenInfo />
              <PrintCollectorDeclaration />
            </Page>  
          )
        })
      }
    </div>
    
  );
}