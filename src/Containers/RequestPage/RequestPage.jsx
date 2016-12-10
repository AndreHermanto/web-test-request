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
  
  componentWillMount() {
    this.getList('#','testList'); // # is only temporary url
  }
  
  /**
   * A shared function to retrieve the option list from the gateway
   * e.g., retrieving the test list and gene list
   *
   * @param {String} url - url of the api call
   * @param {String} stateChild - name of the state that the list applies
   */
  getList(url, stateChild) {
    var func = this;
    fetch(url)
      .then(
        (response) => response.text()
      )
      .then(
        (json) => {
          func.setState(
            (state) => {
              state[stateChild] = json;
              return state;
            }
          );
        }
      );
  }
  
  /**
   * A shared function to generate options from a list contained in state.
   * e.g., generating options for the test list and gene list
   *
   * @param {String} stateChild - name of the state that the list applies
   */
  genOptions(stateChild) {
    this.state[stateChild].map(
      (item) => {
        return <option value={item}>{item}</option>
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
            
          {this.genOptions('testList')}
            
          </FormControl>
        </FormGroup>
      </div>
      
    );
  }
};

export default RequestPage;