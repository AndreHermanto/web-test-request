import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Label,
  Well
} from 'react-bootstrap';
import { 
  getTestList,
  getTest
} from './api';
import {
  setTestList,
  setTestType
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import styled from 'styled-components';

const Gene = styled(Label)`
  margin-right: 4px;
  display: inline-block !important;
  font-weight: 300 !important;
`;


/**
 * OrderTest - UI for ordering type of tests, selecting disorder and related genes for testing.
 */
class OrderTest extends Component {
  constructor(props) {
    super(props);
    
    this.handleTestSelect = this.handleTestSelect.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

    this.state = {
      testList: [],
      form: props.route.data || {}
    };
  }
  
  componentWillMount() {
    return getTestList()
      .then((tests) => {
        this.setState(setTestList(this.state, tests));
      });
  }
  
  handleTestSelect(event) {
    if(event.target.value === 'whole') {
      var test = {
        "id": "whole",
        "label": "Whole Genome Analysis",
        "description": "Analysis on the entire genome."
      };

      this.setState(setTestType(this.state, test));
      return;
    }
    
    return getTest(event.target.value)
      .then((test) => { 
        this.setState(setTestType(this.state, test));
      });
  }
  
  handleConfirm() {
    this.props.route.onChange(this);
    this.props.router.push('/step2');
  }

  render() {
    return (
      <div>
        <PageHeading>Step 1: Order a Test</PageHeading>
        <FormGroup>
          <ControlLabel>Select a Disease Panel / Whole Genome Analysis</ControlLabel>
          <FormControl 
            componentClass="select" 
            name="test"
            value={this.state.form.test ? this.state.form.test.id : ''}
            onChange={this.handleTestSelect}
          >
            <option key="0" value="" disabled>Select a panel.</option> 
      
            {this.state.testList && (
              this.state.testList.map(
                (test) => {
                  return <option key={test.id} value={test.id}>{test.label}</option>
                }
              )
            )}
  
            <option key="whole" value="whole">Whole Genome Analysis</option>
          </FormControl>
        </FormGroup>
          
        {this.state.form.test && (
          <div style={{ marginBottom: 24 }}>
            {this.state.form.test.description}
          </div>
        )}
          

        {this.state.form.genes && (
          <div> 
            <ControlLabel>Available Genes:</ControlLabel>
            <Well>
            {this.state.form.genes.map((gene, $index) => {
              return <Gene key={$index}>{gene}</Gene> 
            })}
            </Well>
          </div>
        )}


        <FormButton 
          bsStyle="success" 
          type="submit" 
          onClick={this.handleConfirm}
        >
          Confirm
        </FormButton> 
      </div>
    );
  }
}

export default OrderTest;