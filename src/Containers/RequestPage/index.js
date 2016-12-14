import React, {Component} from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

/**
 * RequestPage - this generates the main page sending the test request.
 */
class RequestPage extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      
      <div>
        <h4>Web Test Request</h4>
        <FormGroup>
          <ControlLabel>Available Test List</ControlLabel>
          <FormControl 
            componentClass="select" 
            placeholder="Select test" 
            name="test"
          >
            
          {
            (this.props.testList || []).map(
              (test) => {
                return <option key={test} value={test}>{test}</option>
              }
            )
          }
            
          </FormControl>
        </FormGroup>
      </div>
      
    );
  }
};

export default RequestPage;