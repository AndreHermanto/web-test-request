import React, {Component} from 'react';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

import * as Apis from './Apis';
import * as Reduce from './rootReducer';
import RequestPage from './Containers/RequestPage';
import UniversalNavigation from './Containers/UniversalNavigation'

import './App.css';

class App extends Component {
  constructor() {
    super(); 
    
    this.state = {
      testList: []
    };
  }
  
  componentDidMount() {
    var ths = this;
    Apis.getTestList()
      .then((json) => Reduce.setTestList(ths, json));
  }
  
  render() {
    return (

      <div>
      <UniversalNavigation />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <RequestPage testList={this.state.testList} />
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
};

export default App;
