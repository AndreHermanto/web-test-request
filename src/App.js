import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import Routes from './components/Routes';
import UniversalNavigation from './components/UniversalNavigation';
import { setFormInputData } from './rootReducer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    
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
  
  render() {
    return (
      <div>
        <UniversalNavigation />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Routes onChange={this.handleChange} data={this.state.formInput}/>
            </Col>
          </Row>
        </Grid> 
      </div>
    );
  }
};

export default App;
