import React from 'react';
import {
  PrintHeading,
  PageBreak
} from './../sharedPrintStyle';
import { isoToShortDate } from './../../../../components/dateConvert';
// PrintFamilyModule section
export default function PrintFamilyModule(props) {
  return (
    <div>
      <PrintHeading>
        {props.familyMemberDetails.firstName + ' ' + props.familyMemberDetails.lastName} - {props.familyMemberDetails.relationship} <span>of</span> {props.patientDetails.firstName + ' ' + props.patientDetails.lastName}
      </PrintHeading>
    
      <p> 
        <strong> Date of Birth: </strong>
        {isoToShortDate(props.familyMemberDetails.dob)}
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

      {
        (props.familyMemberClinicalInfo.consanguinity && props.familyMemberClinicalInfo.consanguinityInfo !== '') &&
        <p> 
          <strong> Consanguinity Information:  </strong>
          {props.familyMemberClinicalInfo.consanguinityInfo} 
        </p>
      } 

      {
        (props.familyMemberClinicalInfo.consanguinity && props.familyMemberClinicalInfo.consanguinityInfo !== '') &&
        <p> 
          <strong> Consanguinity Information:  </strong>
          {props.familyMemberClinicalInfo.consanguinityInfo}
        </p>
      }
    
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
    </div>
  );
}