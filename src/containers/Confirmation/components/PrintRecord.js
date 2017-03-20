import React from 'react';
import styled from 'styled-components';
import PrintOrderTestModule from './PrintRecordComponents/PrintOrderTestModule';
import PrintPatientModule from './PrintRecordComponents/PrintPatientModule';
import PrintFamilyModule  from './PrintRecordComponents/PrintFamilyModule';
import PrintClinicianDetailsModule from './PrintRecordComponents/PrintClinicianDetailsModule';
import PrintBillingInfoModule from './PrintRecordComponents/PrintBillingInfoModule';
const Page = styled.div`
  width: 100%;
  font-size: 12pt;
  padding: 20px 75px 20px 75px;
`;

// Print the entire test request
export default function PrintRecord(props) {
  return (
    <Page>
      <PrintOrderTestModule orderTestModule={props.orderTestModule}/>
      <PrintPatientModule patientDetails={props.patientDetails} clinicalInfo={props.clinicalInfo}/>
      <PrintFamilyModule familyMember={props.familyMember}/>
      <PrintClinicianDetailsModule clinicianDetails={props.clinicianDetails}/>
      <PrintBillingInfoModule clinicianDetails={props.clinicianDetails} billingInfo={props.billingInfo}/>
    </Page>
  );
}