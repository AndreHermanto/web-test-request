import React from 'react';
import {
  PrintHeading,
  PageBreak,
  Section
} from './../sharedPrintStyle';
// PrintFamilyModule section
export default function PrintFamilyModule(props) {
  return (
    <Section>
      <PrintHeading>
        Patient's Family Member' - {props.familyMemberDetails.firstName + ' ' + props.familyMemberDetails.lastName}
      </PrintHeading>
    
      <p> 
        <strong> Date of Birth: </strong>
        {props.familyMemberDetails.dob}
      </p>
    
      {
        props.familyMemberDetails.medicalRecordNo !== '' &&
        <p> 
          <strong> Medical record number:  </strong>
          {props.familyMemberDetails.medicalRecordNo}
        </p>
      }
    
      <p> 
        <strong> Gender:  </strong>
        {props.familyMemberDetails.gender === 'Other' ?
          props.familyMemberDetails.genderOther + ' (Other)' :
          props.familyMemberDetails.gender
        } 
      </p>
    
      {
        props.familyMemberDetails.ethnicity !== '' &&
        <p> 
          <strong> Ethnicity:  </strong>
          {props.familyMemberDetails.ethnicity}
        </p>
      }

      <p> 
        <strong> consanguinity:  </strong>
          {props.familyMemberClinicalInfo.consanguinity ? 'Yes' : 'No'} 
      </p>
    
      <p> 
        <strong> Affected:  </strong>
        {props.familyMemberClinicalInfo.affected ? 'Yes' : 'No'} 
      </p>
          
      <PageBreak />
        
      <strong> Clinical note: </strong>
      <p>
        {props.familyMemberClinicalInfo.clinicalInfo}
      </p>
      <br />
        
      {
        props.familyMemberClinicalInfo.relevantInvestigation !== '' &&
        <div>
          <strong> Relevant investigation: </strong>
          <p>
            {props.familyMemberClinicalInfo.relevantInvestigation}
          </p>
          <br />
        </div>
      }
      
      {
        props.familyMemberClinicalInfo.familyHistory !== '' &&
        <div>
          <strong> Family history: </strong>
          <p>
            {props.familyMemberClinicalInfo.familyHistory}
          </p>
        </div>
      }
    </Section>
  );
}