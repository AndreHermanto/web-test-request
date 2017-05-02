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

// PrintFamilyModule page
export default function PrintFamilyModule(props) {
  return (
    <div >
      {
        props.familyMember.familyMembers.length > 0 &&
        props.familyMember.familyMembers.map((member, i) => 
        {
          let clinicalNotes = displayNotes(member.familyMemberClinicalInfo.clinicalInfo.split(/\r?\n/));
          let relevantInvestigationNotes = displayNotes(member.familyMemberClinicalInfo.relevantInvestigation.split(/\r?\n/));
          let consanguinityNotes = displayNotes(member.familyMemberClinicalInfo.consanguinityInfo.split(/\r?\n/));
          return <div key={i}>
          <PrintHeading>
            Family Member ({member.familyMemberDetails.relationship}) - {member.familyMemberDetails.firstName + ' ' + member.familyMemberDetails.lastName}
          </PrintHeading>
            <p> 
              <strong> Date of Birth:  </strong>
              {isoToShortDate(member.familyMemberDetails.dob)}
            </p>

            {
              member.familyMemberDetails.medicalRecordNo !== '' && 
              <p> 
                <strong> Medical record number:  </strong>
                {member.familyMemberDetails.medicalRecordNo}
              </p>
            }

            <p> 
              <strong> Gender:  </strong>
              {
                member.familyMemberDetails.gender === 'Other' ?
                member.familyMemberDetails.genderOther + ' (Other)' :
                member.familyMemberDetails.gender
              } 
            </p>
    
            {
              member.familyMemberDetails.deceased !== false &&
              <p> 
                <strong> Deceased:  </strong>
                {member.familyMemberDetails.deceased ? 'Yes' : 'No'}
              </p>
            }
    
            {
              (member.familyMemberDetails.deceased !== false && member.familyMemberDetails.sampleSource !== '') && 
              <p> 
                <strong> Sample source:  </strong>
                {member.familyMemberDetails.sampleSource}
              </p>
            }

            <p> 
              <strong> Consanguinity:  </strong>
              {member.familyMemberClinicalInfo.consanguinity ? 'Yes' : 'No'} 
            </p>

            {
              (member.familyMemberClinicalInfo.consanguinity && member.familyMemberClinicalInfo.consanguinityInfo !== '') &&
              <div> 
                <strong> Consanguinity Information:  </strong>
                {consanguinityNotes}
              </div>
            }
            
            <p> 
              <strong> Affected:  </strong>
              {member.familyMemberClinicalInfo.affected ? 'Yes' : 'No'} 
            </p>
            {
              (member.familyMemberClinicalInfo.clinicalInfo !== '' || member.familyMemberClinicalInfo.relevantInvestigation !== '') &&
              <PageBreak/>
            }
            
            {
              member.familyMemberClinicalInfo.clinicalInfo !== '' &&
              <div>
              <strong> Clinical note </strong>
              {clinicalNotes}
              </div>
            }
            <br />
            {
              member.familyMemberClinicalInfo.relevantInvestigation !== '' &&
              <div>
                <strong> Relevant investigation </strong>
                <div>
                {relevantInvestigationNotes}
                </div>
                <br />
              </div>
            }
          </div>
        })
      }
    </div>
  );
}