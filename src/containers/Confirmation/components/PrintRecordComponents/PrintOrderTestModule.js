import React from 'react';
import {
  PrintHeading,
  Gene
} from './../sharedPrintStyle';
// PrintOrderTestMobule page
export default function PrintOrderTestModule(props) {
  return (
    <div>
      <PrintHeading>
        Test Ordered
      </PrintHeading>
      <h4 style={{fontSize: '16pt'}}><strong>{props.orderTestModule.test.label}</strong></h4>
    
      {
        (props.orderTestModule.test.geneLists.length > 0) && 
        <p style={{ textTransform: 'capitalize', fontWeight: 400 }}> 
          {props.orderTestModule.test.geneLists[0].type} panel - included genes: 
        </p>
      }
      {
        (props.orderTestModule.test.geneLists.length > 0) && (
        <div>
        {
          props.orderTestModule.test.geneLists[0].genes.map((gene, $index) => {
            return <Gene key={$index}>{gene}</Gene> 
          })
        }
        </div>
      )}
    </div>
  );
}