import React from 'react';
import {
  PrintHeading,
  Gene,
  Section
} from './../sharedPrintStyle';
// PrintOrderTestModule section
export default function PrintOrderTestModule(props) {
  return (
    <Section>
      <PrintHeading>
        Test Ordered
      </PrintHeading>
      <h4><strong>{props.orderTestModule.test.label}</strong></h4>
    
      {
        props.orderTestModule.genes && 
        <p> 
          Total number of genes available: {props.orderTestModule.genes.length} 
        </p>
      }
    
      {
        props.orderTestModule.genes && (
        <div>
          {
            props.orderTestModule.genes.map((gene, $index) => {
              return <Gene key={$index}>{gene}</Gene> 
            })
          }
        </div>
        )
      }
    </Section>
  );
}