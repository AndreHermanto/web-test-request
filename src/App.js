import React, { Component } from 'react';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

import Routes from './components/Routes';
import UniversalNavigation from './components/UniversalNavigation';
import { 
  setFormInputData,
  setFamilyMemberData,
  deleteFamilyMemberData
} from './rootReducer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFamilyMemberChange = this.handleFamilyMemberChange.bind(this);
    this.handleFamilyMemberDelete = this.handleFamilyMemberDelete.bind(this);
    this.state = {
      formInput: {}
    }
  }
  
  handleChange(formComponent) {
    if(!formComponent.state) return;
                               
    this.setState(setFormInputData(
      this.state,
      formComponent.constructor.name, 
      formComponent.state.form
    ));
  }
  
  handleFamilyMemberChange(formComponent) {
    if(!formComponent.state) return;
               
    this.setState(setFamilyMemberData(
      this.state,
      formComponent.constructor.name,
      formComponent.props.params.id, 
      formComponent.state.form
    ));
  }
  
  handleFamilyMemberDelete(index) {           
    this.setState(deleteFamilyMemberData(
      this.state,
      index
    ));
  }
  
  render() {
    return (
      <div>
        <UniversalNavigation />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Routes 
                onChange={this.handleChange}
                onFamilyMemberChange={this.handleFamilyMemberChange}
                onFamilyMemberDelete={this.handleFamilyMemberDelete}
                data={this.state.formInput} 
              />
            </Col>
          </Row>
        </Grid> 
      </div>
    );
  }
};

export default App;
