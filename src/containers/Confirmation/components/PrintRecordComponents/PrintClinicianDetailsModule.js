import React from 'react';
import {
  PrintHeading,
  PageBreak,
  Section
} from './sharedPrintStyle';
// PrintClinicianDetailsModule page
export default function PrintClinicianDetailsModule(props) {
  return (
    <Section>
      <PrintHeading>
        Clinician - {props.clinicianDetails.firstName + ' ' + props.clinicianDetails.lastName}
      </PrintHeading>
    
      <p>
        <strong> Organisation/Address of practice:  </strong>
        {props.clinicianDetails.organisation}
      </p>

      <p> 
        <strong> Provider number:  </strong>
        {props.clinicianDetails.providerNumber}
      </p>

      <p> 
        <strong> Medical specialty:  </strong>
        {props.clinicianDetails.medicalSpecialty}
      </p>

      <p> 
        <strong> Phone:  </strong>
        {props.clinicianDetails.phone}
      </p>

      <p> 
        <strong> Email:  </strong>
        {props.clinicianDetails.email}
      </p>

      {
        props.clinicianDetails.fax !== '' &&
        <p> 
          <strong> Fax:  </strong>
          {props.clinicianDetails.fax}
        </p>
      }
    
      <br />
    
      {
        props.clinicianDetails.copyToHCP.length > 0 && 
        props.clinicianDetails.copyToHCP.map((c, i) => {
          return <div key={i}>
              <PageBreak/>
            
              <br />
              <p style={{marginTop:'-5pt'}}> <strong>Copy of report to - {c.additionalFirstName} {c.additionalLastName}</strong></p>

              <p>
                <strong> Organisation/Address of practice:  </strong>
                {c.additionalOrganisation}
              </p>

              <p> 
                <strong> Email: </strong>
                {c.additionalEmail}
              </p>
              <br />
          </div>
        })
      }
    </Section>
  );
}