import React, {Component} from 'react';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

import * as Utils from './App.utils';
import RequestPage from './Containers/RequestPage';

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
    Utils.getTestList()
      .then((json) => ths.setState({testList: json}));
  }
  
  render() {
    return (

      <div>
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
