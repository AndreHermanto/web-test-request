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
        props.familyMember.familyMember.length > 0 &&
        props.familyMember.familyMember.map((member, i) => 
        {
          return <Section key={i}>
          <PrintHeading>
            Family Member - {member.FamilyMemberDetails.firstName + ' ' + member.FamilyMemberDetails.lastName}
          </PrintHeading>
            <p> 
              <strong> Relationship:  </strong>
              {member.FamilyMemberDetails.relationship}
            </p>
    
            <p> 
              <strong> Date of Birth:  </strong>
              {member.FamilyMemberDetails.dob}
            </p>

            {
              member.FamilyMemberDetails.medicalRecordNo !== '' && 
              <p> 
                <strong> Medical record number:  </strong>
                {member.FamilyMemberDetails.medicalRecordNo}
              </p>
            }

            <p> 
              <strong> Gender:  </strong>
              {
                member.FamilyMemberDetails.gender === 'Other' ?
                member.FamilyMemberDetails.genderOther + ' (Other)' :
                member.FamilyMemberDetails.gender
              } 
            </p>

            {
              member.FamilyMemberDetails.ethnicity !== '' && 
              <p> 
                <strong> Ethnicity:  </strong>
                {member.FamilyMemberDetails.ethnicity}
              </p>
            }
    
            {
              member.FamilyMemberDetails.deceased !== false &&
              <p> 
                <strong> Deceased:  </strong>
                {member.FamilyMemberDetails.deceased ? 'Yes' : 'No'}
              </p>
            }
    
            {
              (member.FamilyMemberDetails.deceased !== false && member.FamilyMemberDetails.sampleSource !== '') && 
              <p> 
                <strong> Sample source:  </strong>
                {member.FamilyMemberDetails.sampleSource}
              </p>
            }


            <p> 
              <strong> Email:  </strong>
              {member.FamilyMemberDetails.email}
            </p>

            <p> 
              <strong> Consanguinity:  </strong>
              {member.FamilyMemberClinicalInfo.consanguinity ? 'Yes' : 'No'} 
            </p>
            
            <p> 
              <strong> Affected:  </strong>
              {member.FamilyMemberClinicalInfo.affected ? 'Yes' : 'No'} 
            </p>

            <PageBreak/>

            <strong> Clinical note </strong>
            <p>
              {member.FamilyMemberClinicalInfo.clinicalInfo}
            </p>
            <br />

            {
              member.FamilyMemberClinicalInfo.relevantInvestigation !== '' &&
              <div>
                <strong> Relevant investigation </strong>
                <p>
                  {member.FamilyMemberClinicalInfo.relevantInvestigation}
                </p>
                <br />
              </div>
            }
              
            {
              member.FamilyMemberClinicalInfo.familyHistory !== '' &&
              <div>
                <strong> Family history </strong>
                <p>
                  {member.FamilyMemberClinicalInfo.familyHistory}
                </p>
              </div>
            }
          </Section>
        })
      }
    </div>
  );
}