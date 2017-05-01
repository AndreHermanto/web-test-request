import React from 'react';
import {
  PrintHeading,
  PageBreak
} from './../sharedPrintStyle';
import { isoToShortDate } from './../../../../components/dateConvert';
const displayNotes = (notes) => {
  return notes.map((n, i) => {
    if(n === '') {
      return <p key={i} style={{fontWeight:200, borderBottom: '1px solid #ccc', paddingTop:15}}></p>;
    }
    else {
      return <p key={i} style={{fontWeight:200, borderBottom: '1px solid #ccc'}}>{n}</p>;
    }
  })
}
// PrintFamilyModule section
export default function PrintFamilyModule(props) {
  let clinicalNotes = displayNotes(props.familyMemberClinicalInfo.clinicalInfo.split(/\r?\n/));
  let relevantInvestigationNotes = displayNotes(props.familyMemberClinicalInfo.relevantInvestigation.split(/\r?\n/));
  let consanguinityNotes = displayNotes(props.familyMemberClinicalInfo.consanguinityInfo.split(/\r?\n/));

  return (
    <div style={{marginTop:'10pt'}}>
      <PrintHeading>
        {props.familyMemberDetails.firstName + ' ' + props.familyMemberDetails.lastName} - {props.familyMemberDetails.relationship} of {props.patientDetails.firstName + ' ' + props.patientDetails.lastName}
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

      <p> 
        <strong> Consanguinity:  </strong>
          {props.familyMemberClinicalInfo.consanguinity ? 'Yes' : 'No'} 
      </p>

      {
        (props.familyMemberClinicalInfo.consanguinity && props.familyMemberClinicalInfo.consanguinityInfo !== '') &&
        <div> 
          <strong> Consanguinity Information:  </strong>
          {consanguinityNotes} 
        </div>
      } 
    
      <p> 
        <strong> Affected:  </strong>
        {props.familyMemberClinicalInfo.affected ? 'Yes' : 'No'} 
      </p>
          
      {
        (props.familyMemberClinicalInfo.clinicalInfo !== '' || props.familyMemberClinicalInfo.relevantInvestigation !== '') &&
        <PageBreak/>
      }
            
      {
        props.familyMemberClinicalInfo.clinicalInfo !== '' &&
        <div>  
          <strong> Clinical note: </strong>
          {clinicalNotes}
          <br />
        </div>
      }
        
      {
        props.familyMemberClinicalInfo.relevantInvestigation !== '' &&
        <div>
          <strong> Relevant investigation: </strong>
          <div>
          {relevantInvestigationNotes}
          </div>
        </div>
      }
    </div>
  );
}