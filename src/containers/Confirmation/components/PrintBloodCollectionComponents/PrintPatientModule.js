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

// PrintPatientModule section
export default function PrintPatientModule(props) {
  let clinicalNotes = displayNotes(props.clinicalInfo.clinicalInfo.split(/\r?\n/));
  let relevantInvestigationNotes = displayNotes(props.clinicalInfo.relevantInvestigation.split(/\r?\n/));
  let familyNotes = displayNotes(props.clinicalInfo.familyHistory.split(/\r?\n/));
  let consanguinityNotes = displayNotes(props.clinicalInfo.consanguinityInfo.split(/\r?\n/));
  return (
    <div>
      <PrintHeading>
        {props.patientDetails.firstName + ' ' + props.patientDetails.lastName} - Patient
      </PrintHeading>
    
      <p> 
        <strong> Date of Birth: </strong>
        {isoToShortDate(props.patientDetails.dob)}
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

      <p> 
        <strong> Consanguinity:  </strong>
          {props.clinicalInfo.consanguinity ? 'Yes' : 'No'} 
      </p>

      {
        (props.clinicalInfo.consanguinity && props.clinicalInfo.consanguinityInfo !== '') &&
        <div> 
          <strong> Consanguinity Information:  </strong>
          {consanguinityNotes}
        </div>
      }
          
      <PageBreak />
        
      <strong> Clinical note: </strong>
      <div>
        {clinicalNotes}
      </div>        
      {
        props.clinicalInfo.relevantInvestigation !== '' &&
        <div>
          <br />
          <strong> Relevant investigation: </strong>
          <div>
            {relevantInvestigationNotes}
          </div>
          <br />
        </div>
      }
      
      {
        props.clinicalInfo.familyHistory !== '' &&
        <div>
          <strong> Family history: </strong>
          <div>
            {familyNotes}          
          </div>
          <br/>
        </div>
      }
    </div>
  );
}