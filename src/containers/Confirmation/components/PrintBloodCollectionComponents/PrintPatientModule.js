import React from 'react';
import {
  PrintHeading,
  PageBreak
} from './../sharedPrintStyle';
import { isoToShortDate } from './../../../../components/dateConvert';

// PrintPatientModule section
export default function PrintPatientModule(props) {
  let clinicalNotes = props.clinicalInfo.clinicalInfo.split(/\r?\n/);
  let relevantInvestigationNotes = props.clinicalInfo.relevantInvestigation.split(/\r?\n/);
  let familyNotes = props.clinicalInfo.familyHistory.split(/\r?\n/);
  let consanguinityNotes = props.clinicalInfo.consanguinityInfo.split(/\r?\n/);
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
    
      {
        props.patientDetails.ethnicity !== '' &&
        <p> 
          <strong> Ethnicity:  </strong>
          {props.patientDetails.ethnicity}
        </p>
      }

      <p> 
        <strong> Consanguinity:  </strong>
          {props.clinicalInfo.consanguinity ? 'Yes' : 'No'} 
      </p>

      {
        (props.clinicalInfo.consanguinity && props.clinicalInfo.consanguinityInfo !== '') &&
        <div> 
          <strong> Consanguinity Information:  </strong>
          {
            consanguinityNotes.length > 1 ?
            consanguinityNotes.map((ri, i) => {
              return <p key={i}>{ri}</p>;
            })
            : <p>{props.clinicalInfo.consanguinityInfo}</p>
          }
        </div>
      }
          
      <PageBreak />
        
      <strong> Clinical note: </strong>
      <div>
        {
          clinicalNotes.length > 1 ? 
          clinicalNotes.map((n, i) => {
            return <p key={i}>{n}</p>;
          }) 
          : <p>{props.clinicalInfo.clinicalInfo}</p>
        }
      </div>
      <br />
        
      {
        props.clinicalInfo.relevantInvestigation !== '' &&
        <div>
          <strong> Relevant investigation: </strong>
          <div>
            {
              relevantInvestigationNotes.length > 1 ?
              relevantInvestigationNotes.map((ri, i) => {
                return <p key={i}>{ri}</p>;
              })
              : <p>props.clinicalInfo.relevantInvestigation</p>
            }
          </div>
          <br />
        </div>
      }
      
      {
        props.clinicalInfo.familyHistory !== '' &&
        <div>
          <strong> Family history: </strong>
          <div>
            {
              familyNotes.length > 1 ?
              familyNotes.map((ri, i) => {
                return <p key={i}>{ri}</p>;
              })
              : <p>{props.clinicalInfo.familyHistory}</p>
            }          
          </div>
        </div>
      }
    </div>
  );
}