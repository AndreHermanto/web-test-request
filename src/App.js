import React, { Component } from 'react';
import {
  Grid
} from 'react-bootstrap';

import { 
  getTestList, 
  getGeneList,
  submitForm
} from './Apis';
import { 
  setTestList, 
  setFormData,
  setGeneList
} from './rootReducer';
import ClinicianDetails from './containers/ClinicianDetails';
import UniversalNavigation from './components/UniversalNavigation'

import './App.css';

class App extends Component {
  constructor() {
    super(); 
    
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      testList: [],
      geneList: [],
      form: {test:''}
    };
  }
  
  componentDidMount() {
    getTestList()
      .then((tests) => {
        this.setState(setTestList(this.state, tests));
        this.handleChange({
          target: { name: 'test', value: tests[0] }
        });
      });
  }
  
  handleChange(event) {
    var target = event.target,
        name = target.name,
        value = target.value;
    
    this.setState(setFormData(this.state, name, value));
    
    if(name === 'test') {
      getGeneList(value)
        .then(
          (json) => this.setState(setGeneList(this.state, json))
        );
    }
  }
  
  onFormSubmit() {
    return submitForm({ 
      name: 'Hello World' 
    });
  }
  
  render() {
    return (

      <div>
        <UniversalNavigation />
        <Grid>
        <ClinicianDetails/>
        </Grid>
      </div>
      
    );
  }
};

export default App;
