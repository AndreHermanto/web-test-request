import React from 'react';
import {
  PrintHeading,
  PageBreak
} from './../sharedPrintStyle';
import { isoToShortDate } from './../../../../components/dateConvert';
// PrintFamilyModule page
export default function PrintFamilyModule(props) {
  return (
    <div >
      {
        props.familyMember.familyMembers.length > 0 &&
        props.familyMember.familyMembers.map((member, i) => 
        {
          let clinicalNotes = member.familyMemberClinicalInfo.clinicalInfo.split(/\r?\n/);
          let relevantInvestigationNotes = member.familyMemberClinicalInfo.relevantInvestigation.split(/\r?\n/);
          let consanguinityNotes = member.familyMemberClinicalInfo.consanguinityInfo.split(/\r?\n/);
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
                  : <p>{member.familyMemberClinicalInfo.consanguinityInfo}</p>
                }
              </div>
            }
            
            <p> 
              <strong> Affected:  </strong>
              {member.familyMemberClinicalInfo.affected ? 'Yes' : 'No'} 
            </p>

            <PageBreak/>

            <strong> Clinical note </strong>
            <div>
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
                : <p>member.familyMemberClinicalInfo.clinicalInfo</p>
              }
            </div>
            <br />
            {
              member.familyMemberClinicalInfo.relevantInvestigation !== '' &&
              <div>
                <strong> Relevant investigation </strong>
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
                  : <p>{member.familyMemberClinicalInfo.relevantInvestigation}</p>
                }
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