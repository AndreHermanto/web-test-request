import React from 'react';
import {
  PrintHeading,
  PageBreak
} from './../sharedPrintStyle';
import { isoToShortDate } from './../../../../components/dateConvert';
// PrintFamilyModule section
export default function PrintFamilyModule(props) {
  let clinicalNotes = props.familyMemberClinicalInfo.clinicalInfo.split(/\r?\n/);
  let relevantInvestigationNotes = props.familyMemberClinicalInfo.relevantInvestigation.split(/\r?\n/);
  let consanguinityNotes = props.familyMemberClinicalInfo.consanguinityInfo.split(/\r?\n/);

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
          {
            consanguinityNotes.length > 1 ?
            consanguinityNotes.map((c, i) => {
              if(c === '') {
                return <p key={i} style={{width:'98%', fontWeight:200, borderBottom: '1px solid #ccc', paddingTop:20}}></p>;
              }
              else {
                return <p key={i} style={{width:'98%', fontWeight:200, borderBottom: '1px solid #ccc'}}>{c}</p>;
              }            
            })
            : <p>{props.familyMemberClinicalInfo.consanguinityInfo}</p>
          } 
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
          {
            clinicalNotes.length > 1 ? 
            clinicalNotes.map((n, i) => {
              if(n === '') {
                return <p key={i} style={{width:'98%', fontWeight:200, borderBottom: '1px solid #ccc', paddingTop:20}}></p>;
              }
              else {
                return <p key={i} style={{width:'98%', fontWeight:200, borderBottom: '1px solid #ccc'}}>{n}</p>;
              }
            }) 
            : <p>props.familyMemberClinicalInfo.clinicalInfo</p>
          }
          <br />
        </div>
      }
        
      {
        props.familyMemberClinicalInfo.relevantInvestigation !== '' &&
        <div>
          <strong> Relevant investigation: </strong>
          <div>
          {
            relevantInvestigationNotes.length > 1 ?
            relevantInvestigationNotes.map((r, i) => {
              if(r === '') {
                return <p key={i} style={{width:'98%', fontWeight:200, borderBottom: '1px solid #ccc', paddingTop:20}}></p>;
              }
              else {
                return <p key={i} style={{width:'98%', fontWeight:200, borderBottom: '1px solid #ccc'}}>{r}</p>;
              }                      
            })
            : props.familyMemberClinicalInfo.relevantInvestigation
          }
          </div>
        </div>
      }
    </div>
  );
}