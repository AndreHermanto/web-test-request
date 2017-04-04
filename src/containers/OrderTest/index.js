import React, { Component } from 'react';
import { getPanelsData } from './api';
import {
  initData,
  setPanelsData,
  setCategory,
  setPanel,
  validatedToTrue
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import TestPanel from './components/TestPanel';
import TestPanelCategory from './components/TestPanelCategory';
/**
 * OrderTest - UI for ordering type of tests, selecting disorder and related genes for testing.
 */
class OrderTest extends Component {
  constructor(props) {
    super(props);
    this.handleMainCategoryChange = this.handleMainCategoryChange.bind(this);
    this.handleSubCategoryChange = this.handleSubCategoryChange.bind(this);
    this.handleTestSelect = this.handleTestSelect.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = initData(props.route.data);
  }
  
  componentWillMount() {
    return getPanelsData()
      .then((tests) => {
        tests[0].label = 'Whole Genome Analysis';
        this.setState(setPanelsData(this.state, tests));
        //If have prefill data, loop through the data and search for the panel, then preselect the categories.
        if(this.props.route.data && this.props.route.data.test) {
          for (var main of tests) {
            for (var sub of main.categories) {
              for (var panel of sub.panels) {
                if(panel.id === this.props.route.data.test.id) {
                  this.setState(setCategory(this.state, 'chosenPanelMainCategory', main));
                  this.setState(setCategory(this.state, 'chosenPanelSubCategory', sub));
                  return false;
                }
              }
            }
          }
        }
      });
  }
  
  componentDidMount() {
    if(this.props.route.preventUnvisitedFormAccess) {
      this.props.router.setRouteLeaveHook(this.props.route, this.props.route.preventUnvisitedFormAccess.bind(this));
    }
  }
  
  handleMainCategoryChange(category) {
    this.setState(setPanel(this.state, {}),   
      () => this.setState(setCategory(this.state, 'chosenPanelSubCategory', {}),               
        () => this.setState(
          setCategory(this.state, 'chosenPanelMainCategory', category),
          () => {
            if(this.state.chosenPanelMainCategory.categories.length === 1) {
              this.setState(
                setCategory(this.state, 'chosenPanelSubCategory', this.state.chosenPanelMainCategory.categories[0]),
                () => {
                  if(this.state.chosenPanelSubCategory.panels.length === 1) {
                    this.setState(setPanel(this.state, this.state.chosenPanelSubCategory.panels[0]));
                  }
                }
              );
            }
          }
        )               
      )
    );
    
  }
  
  handleSubCategoryChange(category) {
    this.setState(setCategory(this.state, 'chosenPanelSubCategory', category));
  }
  
  handleTestSelect(value) {
    if(!this.state.chosenPanelSubCategory) return;
    
    this.state.chosenPanelSubCategory.panels.forEach((panel) => {
      if(panel.id === value.id) this.setState(setPanel(this.state, panel));
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
        <PageHeading>Step 1: Select a Test</PageHeading>
        
        <TestPanelCategory 
          field="chosenPanelMainCategory"
          label="Select the type of test"
          width="48%"
          options={this.state.panelCategories}
          handleClick={this.handleMainCategoryChange}
          onValidate={this.validate()}
          formState={this.state}
          latestSelectId={this.state.chosenPanelMainCategory ? this.state.chosenPanelMainCategory.id : ''}
          required
        />
        <br />    
        {
          (
            this.state.chosenPanelMainCategory && 
            this.state.chosenPanelMainCategory.id &&
            this.state.chosenPanelMainCategory.label !== 'Whole Genome Analysis'
          ) &&
          <TestPanelCategory 
            field="chosenPanelSubCategory"
            label="Select the type of panels"
            width="31%"
            options={this.state.chosenPanelMainCategory.categories}
            handleClick={this.handleSubCategoryChange}
            onValidate={this.validate()}
            formState={this.state}
            latestSelectId={this.state.chosenPanelSubCategory ? this.state.chosenPanelSubCategory.id : ''}
            required
          />
        }    
        <br />
        {
          (
            this.state.chosenPanelSubCategory && 
            this.state.chosenPanelSubCategory.id &&
            this.state.chosenPanelMainCategory.label !== 'Whole Genome Analysis'
          ) &&
          <TestPanel 
            field="test"
            label="Select a Panel"
            options={this.state.chosenPanelSubCategory.panels}
            handleClick={this.handleTestSelect}
            onValidate={this.validate()}
            formState={this.state.form}
            latestSelectId={this.state.form.test ? this.state.form.test.id : ''}
            genes={this.state.form.test ? this.state.form.test.genes : []}
            required
          />
        }
          
        <FormButton 
          type="submit" 
          onClick={this.handleConfirm}
        >
          Next
        </FormButton>
      </div>
    );
  }
}

export default OrderTest;