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
    
    this.state = {
      testList: []
    };
  }
  
  componentDidMount() {
    var func = this;
    fetch('#')
      .then(
        (response) => response.json()
      )
      .then(
        (json) => {
          func.setState(
            (state) => {
              state.testList = json;
              return state;
            }
          );
        }
      );
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
            this.state.testList.map(
              (test) => {
                return <option key={test.id} value={test.id}>{test.label}</option>
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