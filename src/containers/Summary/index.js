import React, { Component } from 'react';
import {
} from 'react-bootstrap';
import { submitTestRequest } from './api';
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';

/**
 * Summary - UI for ordering type of tests, selecting disorder and related genes for testing.
 */
class Summary extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { form: props.route.data || {} }
  }
  
  handleBack() {
    this.props.router.push('/step5');
  }
  
  handleSubmit() {
    return submitTestRequest(this.state.form)
      .then((response) => {
        if(!response.ok) {
          alert('Submit fail');
          return false;
        } else {
          alert('Submit success');
          return true;
        }
      })
  }

  render() {
    return (
      <div>
        <PageHeading>Summary</PageHeading>
      
        <FormButton 
          bsStyle="warning" 
          onClick={this.handleBack}
          label="Back"
        >
          Back
        </FormButton> 
      
        <FormButton 
          bsStyle="success" 
          type="submit" 
          onClick={this.handleSubmit}
        >
          Submit
        </FormButton> 
      </div>
    );
  }
}

export default Summary;