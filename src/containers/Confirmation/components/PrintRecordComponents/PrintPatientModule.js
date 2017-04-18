import React from 'react';
import {
  PrintHeading,
  PageBreak
} from './../sharedPrintStyle';
import { Glyphicon } from 'react-bootstrap';
import { isoToShortDate } from './../../../../components/dateConvert';
import { 
  FileList,
  FileLink
} from './../../../../components/SharedStyle';
// PrintPatientModule page
export default function PrintPatientModule(props) {
  return (
    <div style={{marginTop:'5pt'}}>
      <PrintHeading>
        Patient - {props.patientDetails.firstName + ' ' + props.patientDetails.lastName}
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
        <strong> Consanguinity:  </strong>
          {props.clinicalInfo.consanguinity ? 'Yes' : 'No'} 
      </p>

      {
        (props.clinicalInfo.consanguinity && props.clinicalInfo.consanguinityInfo !== '') &&
        <p> 
        <strong> Consanguinity Information:  </strong>
          {props.clinicalInfo.consanguinityInfo} 
        </p>
      }
          
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

      { 
        (props.clinicalInfo.attachments && props.clinicalInfo.attachments.length > 0) &&
        <div>
          <strong> Attachments: </strong>
          {
            props.clinicalInfo.attachments.map((attachment, $index) => {
              return <FileList key={$index}>
                <FileLink 
                  bsStyle="link" 
                  style={{ padding: '6px 0'}}
                >
                  <Glyphicon glyph="file"/> {attachment.filename}
                </FileLink>
              </FileList>
            })
          }
        </div>
      }
    </div>
  );
}