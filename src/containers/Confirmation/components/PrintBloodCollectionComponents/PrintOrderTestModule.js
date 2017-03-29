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
        props.orderTestModule.test.genes && 
        <p> 
          Total number of genes available: {props.orderTestModule.test.genes.length} 
        </p>
      }
    
      {
        props.orderTestModule.test.genes && (
        <div>
          {
            props.orderTestModule.test.genes.map((gene, $index) => {
              return <Gene key={$index}>{gene}</Gene> 
            })
          }
        </div>
        )
      }
    </Section>
  );
}