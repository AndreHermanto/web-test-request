import React, { Component } from 'react';
import { FormGroup } from 'react-bootstrap';

import {
  initData,
  setFormData,
  // validatedToTrue
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
// import Input from './../../components/Input';
import RadioSet from './../../components/RadioSet';

/**
 * BillingInfo - UI for input billing details.
 */
class BillingInfo extends Component {
  constructor(props) {
    super(props);
    this.state = initData(props.route.data);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
  }
  
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }
  
  render() {
    return (
      <div>
        <PageHeading>Step 5: Billing info</PageHeading>

        <FormGroup>
          <RadioSet
          label="Select billing option"
          field="billOption"
          options={this.state.form.options}
          formState={this.state}
          onChange={this.handleChange}
          />
        </FormGroup>
      
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
          onClick={this.handleConfirm}
        >
          Confirm
        </FormButton> 
      </div>
    );
  }
}

export default BillingInfo;