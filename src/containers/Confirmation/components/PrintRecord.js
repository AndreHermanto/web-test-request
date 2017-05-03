import React from 'react';
import styled from 'styled-components';
import PrintRecordHeader from './PrintRecordHeader';
import PrintOrderTestModule from './PrintRecordComponents/PrintOrderTestModule';
import PrintPatientModule from './PrintRecordComponents/PrintPatientModule';
import PrintFamilyModule  from './PrintRecordComponents/PrintFamilyModule';
import PrintClinicianDetailsModule from './PrintRecordComponents/PrintClinicianDetailsModule';
import PrintBillingInfoModule from './PrintRecordComponents/PrintBillingInfoModule';
const Page = styled.div`
  display: block !important;
  box-sizing: content-box !important; 
  page-break-after: always !important;
  -webkit-region-break-after: always !important;
  position: static !important;
  padding: 0px 75px 0px 75px !important;
  font-size: 14pt;
`;

// Print the entire test request
export default function PrintRecord(props) {
  return (
    <Page>
      <PrintRecordHeader showId={props.showId} showDate={props.showDate} />
      <br />
      <PrintPatientModule patientDetails={props.patientDetails} clinicalInfo={props.clinicalInfo}/>
      <PrintFamilyModule familyMember={props.familyMember}/>
      <PrintClinicianDetailsModule clinicianDetails={props.clinicianDetails}/>
      <PrintOrderTestModule orderTestModule={props.orderTestModule}/>
      <PrintBillingInfoModule clinicianDetails={props.clinicianDetails} billingInfo={props.billingInfo}/>
    </Page>
  );
}