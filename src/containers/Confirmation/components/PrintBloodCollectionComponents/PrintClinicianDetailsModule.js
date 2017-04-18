import React from 'react';
import {
  PrintHeading,
  PageBreak
} from './../sharedPrintStyle';
// PrintClinicianDetailsModule section
export default function PrintClinicianDetailsModule(props) {
  return (
    <div style={{marginTop:'-15pt'}}>
      <PrintHeading>
        {props.clinicianDetails.firstName + ' ' + props.clinicianDetails.lastName} - Clinician
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
              <p style={{marginTop:'-5pt'}}> <strong>Copy of report to - {c.firstName} {c.lastName}</strong></p>

              <p>
                <strong> Organisation/Address of practice:  </strong>
                {c.organisation}
              </p>

              <p> 
                <strong> Email: </strong>
                {c.email}
              </p>
              <br />
          </div>
        })
      }
    </div>
  );
}