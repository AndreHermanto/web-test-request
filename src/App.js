import React, { Component } from 'react';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

import { getTestList, getGeneList } from './Apis';
import { 
  setTestList, 
  setFormData,
  setGeneList
} from './rootReducer';
import RequestPage from './Containers/RequestPage';
import UniversalNavigation from './Containers/UniversalNavigation'

import './App.css';

class App extends Component {
  constructor() {
    super(); 
    
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
    getGeneList(value)
      .then(
        (json) => this.setState(setGeneList(this.state, json))
      );
  }
  
  render() {
    return (

      <div>
        <UniversalNavigation />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <RequestPage
                formState={this.state.form}
                handleChange={this.handleChange}
                testList={this.state.testList}
                geneList={this.state.geneList}
              />
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
};

export default App;
