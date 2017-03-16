import React from 'react';
import {
  PrintHeading,
  PageBreak,
  Section
} from './sharedPrintStyle';
// PrintPatientModule page
export default function PrintPatientModule(props) {
  return (
    <Section>
      <PrintHeading>
        Patient - {props.patientDetails.firstName + ' ' + props.patientDetails.lastName}
      </PrintHeading>
    
      <p> 
        <strong> Date of Birth: </strong>
        {props.patientDetails.dob}
      </p>
    
      {
        props.patientDetails.medicalRecordNo !== '' &&
        <p> 
          <strong> Medical record number:  </strong>
          {props.patientDetails.medicalRecordNo}
        </p>
      }
    
      <p> 
        <strong> Gender:  </strong>
        {props.patientDetails.gender === 'Other' ?
          props.patientDetails.genderOther + ' (Other)' :
          props.patientDetails.gender
        } 
      </p>
    
      {
        props.patientDetails.ethnicity !== '' &&
        <p> 
          <strong> Ethnicity:  </strong>
          {props.patientDetails.ethnicity}
        </p>
      }
    
      {
        props.patientDetails.deceased !== false &&
        <p> 
          <strong> Deceased:  </strong>
          {props.patientDetails.deceased ? 'Yes' : 'No'}
        </p>
      }
    
      {
        (props.patientDetails.deceased !== false && props.patientDetails.sampleSource !== '') &&
        <p> 
          <strong> Sample source:  </strong>
          {props.patientDetails.sampleSource}
        </p>
      }

      <p> 
        <strong> Email:  </strong>
        {props.patientDetails.email} 
      </p>

      <p> 
        <strong> Consanguinity:  </strong>
          {props.clinicalInfo.consanguinity ? 'Yes' : 'No'} 
      </p>
          
      <PageBreak />
        
      <strong> Clinical note: </strong>
      <p>
        {props.clinicalInfo.clinicalInfo}
      </p>
      <br />
        
      {
        props.clinicalInfo.relevantInvestigation !== '' &&
        <div>
          <strong> Relevant investigation: </strong>
          <p>
            {props.clinicalInfo.relevantInvestigation}
          </p>
          <br />
        </div>
      }
      
      {
        props.clinicalInfo.familyHistory !== '' &&
        <div>
          <strong> Family history: </strong>
          <p>
            {props.clinicalInfo.familyHistory}
          </p>
        </div>
      }
    </Section>
  );
}