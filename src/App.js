import React, {Component} from 'react';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';

import RequestPage from './Containers/RequestPage/RequestPage'

import './App.css';

class App extends Component {
  render() {
    return (
      
      <div>
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <RequestPage />
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
};

export default App;
