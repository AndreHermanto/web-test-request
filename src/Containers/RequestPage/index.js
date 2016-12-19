import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

/**
 * RequestPage - this generates the main page sending the test request.
 */
function RequestPage({ formState, handleChange, testList, geneList }) {
  return (

    <div>
      <h4>Web Test Request</h4>
      <FormGroup>
        <ControlLabel>Available Test List</ControlLabel>
        <FormControl 
          componentClass="select" 
          placeholder="Select test"
          name="test"
          onChange={handleChange}
        >

        {
          testList.map(
            (test) => {
              return <option key={test} value={test}>{test}</option>
            }
          )
        }

        </FormControl>
      </FormGroup>
      
      <FormGroup>  
        <ControlLabel>Gene List</ControlLabel>
          <FormControl 
            componentClass="select" 
            placeholder="Select gene list" 
            name="geneList"
          >

          {
            geneList.map(
              (gene) => {
                return ( 
                  <option key={gene.disorder} value={gene.disorder}>
                    {gene.disorder}
                  </option>
                )
              }
            )
          }

          </FormControl>
      </FormGroup>
    </div>

  );
}

export default RequestPage;