import React, { Component } from 'react';
import {
  Grid,
  Col,
  Row,
  Panel
} from 'react-bootstrap';

import './App.css';

// This will use ref later on, so I leave it to use the default class assigned by create-react-app.
class App extends React.Component {
  render() {
    return (
      
      <div>
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <h4>Web Test Request Base</h4>
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
};

export default App;
