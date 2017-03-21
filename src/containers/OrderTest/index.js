import React, { Component } from 'react';
import { getTestList } from './api';
import {
  initData,
  setTestList,
  setTestType,
  validatedToTrue
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import GeneLabel from './../../components/GeneLabel';
/**
 * OrderTest - UI for ordering type of tests, selecting disorder and related genes for testing.
 */
class OrderTest extends Component {
  constructor(props) {
    super(props);
    this.handleTestSelect = this.handleTestSelect.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = initData(props.route.data);
  }
  
  componentWillMount() {
    return getTestList()
      .then((tests) => {
        this.setState(setTestList(this.state, tests));
      });
  }
  
  handleTestSelect(value) {
    this.state.testList.forEach((panel) => {
      if(panel.id === value.id) this.setState(setTestType(this.state, panel));
    });
    return;
  }

  handleNext(passValidation) {
    if(!passValidation) return false;
    if(this.props.route.isEdited === true)
    {
      this.props.route.onChange(this);
      this.props.router.push('/summary')
    }
    else {
      this.props.route.onChange(this);
      this.props.router.push('/step2'); 
    }
  }
  
  handleConfirm() {
    return this.setState(validatedToTrue(this.state), () => {    
      var pass = true;
      for (var field in this.state.validation) {
        if(this.state.validation[field].status === 'error') pass = false;
      }
      this.handleNext(pass); 
    });
  }

  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }
  
  render() {
    return (
      <div>
        <PageHeading>Step 1: Order a Test</PageHeading>
        <GeneLabel 
          field="test"
          label="Select a Disease Panel / Whole Genome Analysis"
          options={this.state.testList}
          handleClick={this.handleTestSelect}
          onValidate={this.validate()}
          formState={this.state.form}
          latestSelectId={this.state.form.latestSelectId}
          genes={this.state.form.genes}
          required
        />
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