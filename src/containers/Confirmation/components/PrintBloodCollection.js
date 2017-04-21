import React from 'react';
import styled from 'styled-components';
import PrintHeader from './PrintHeader';
import PrintOrderTestModule from './PrintBloodCollectionComponents/PrintOrderTestModule';
import PrintPatientModule from './PrintBloodCollectionComponents/PrintPatientModule';
import PrintFamilyModule  from './PrintBloodCollectionComponents/PrintFamilyModule';
import PrintClinicianDetailsModule from './PrintBloodCollectionComponents/PrintClinicianDetailsModule';
import PrintSpecimenInfo from './PrintBloodCollectionComponents/PrintSpecimenInfo';
import PrintCollectorDeclaration from './PrintBloodCollectionComponents/PrintCollectorDeclaration';
const Page = styled.div`
  font-size: 16pt;
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
        <PrintHeader showId={props.showId} showDate={props.showDate} />
        <br />
        <PrintPatientModule patientDetails={props.patientDetails} clinicalInfo={props.clinicalInfo}/>
        <PrintClinicianDetailsModule clinicianDetails={props.clinicianDetails}/>
        <PrintOrderTestModule orderTestModule={props.orderTestModule}/>
        <PrintSpecimenInfo />
        <PrintCollectorDeclaration />
      </Page>
      
      {props.familyMember.familyMembers.map((member, $index) => {
          return (
            <Page key={$index}>
              <PrintHeader />
              <br />
              <PrintFamilyModule patientDetails={props.patientDetails} familyMemberDetails={member.familyMemberDetails} familyMemberClinicalInfo={member.familyMemberClinicalInfo}/>
              <PrintClinicianDetailsModule clinicianDetails={props.clinicianDetails}/>
              <PrintOrderTestModule orderTestModule={props.orderTestModule}/>
              <PrintSpecimenInfo />
              <PrintCollectorDeclaration />
            </Page>  
          )
        })
      }
    </div>
    
  );
}