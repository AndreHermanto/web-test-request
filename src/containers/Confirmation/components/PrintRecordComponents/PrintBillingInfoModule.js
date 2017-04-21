import React from 'react';
import {
  PrintHeading,
  PageEnd
} from './../sharedPrintStyle';
// PrintBillingInfoModule page
export default function PrintBillingInfoModule(props) {
  return (
    <div style={{marginTop:'10pt'}}>
      <PrintHeading>
        Billing Information
      </PrintHeading>
      {
        props.billingInfo.billOption !== 'Institution' ?
        <div>
          <p> 
            <strong> Payer:  </strong>
            {
              props.billingInfo.payer === 'Other' ?
              props.billingInfo.firstName + ' ' + props.billingInfo.lastName :
              props.billingInfo.payer
            } 
          </p>
          <p> 
            <strong> Mobile:  </strong>
            {props.billingInfo.phone}
          </p>
          <p> 
            <strong> Email:  </strong>
            {props.billingInfo.payerEmail}
          </p>
          <p> 
            <strong> Total price:  </strong>
            ${props.billingInfo.billPrice}
          </p>
        </div>
        :
        <div>
          <p> 
            <strong> Payer:  </strong>
            {props.clinicianDetails.organisation}
          </p>
          <p> 
            <strong> Total price:  </strong>
            ${props.billingInfo.billPrice}
          </p>
        </div>
      }
    
      <PageEnd/>
    </div>
  );
}