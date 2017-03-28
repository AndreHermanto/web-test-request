import React from 'react';
import {
  PrintHeading,
  PageBreak,
  Section
} from './../sharedPrintStyle';
// PrintFamilyModule page
export default function PrintFamilyModule(props) {
  return (
    <div>
      {
        props.familyMember.familyMembers.length > 0 &&
        props.familyMember.familyMembers.map((member, i) => 
        {
          return <Section key={i}>
          <PrintHeading>
            Family Member ({member.familyMemberDetails.relationship}) - {member.familyMemberDetails.firstName + ' ' + member.familyMemberDetails.lastName}
          </PrintHeading>
            <p> 
              <strong> Date of Birth:  </strong>
              {member.familyMemberDetails.dob}
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
              member.familyMemberDetails.ethnicity !== '' && 
              <p> 
                <strong> Ethnicity:  </strong>
                {member.familyMemberDetails.ethnicity}
              </p>
            }
    
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
            
            <p> 
              <strong> Affected:  </strong>
              {member.familyMemberClinicalInfo.affected ? 'Yes' : 'No'} 
            </p>

            <PageBreak/>

            <strong> Clinical note </strong>
            <p>
              {member.familyMemberClinicalInfo.clinicalInfo}
            </p>
            <br />

            {
              member.familyMemberClinicalInfo.relevantInvestigation !== '' &&
              <div>
                <strong> Relevant investigation </strong>
                <p>
                  {member.familyMemberClinicalInfo.relevantInvestigation}
                </p>
                <br />
              </div>
            }
              
            {
              member.familyMemberClinicalInfo.familyHistory !== '' &&
              <div>
                <strong> Family history </strong>
                <p>
                  {member.familyMemberClinicalInfo.familyHistory}
                </p>
              </div>
            }
          </Section>
        })
      }
    </div>
  );
}