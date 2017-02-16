import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

import Routes from './components/Routes';
import UniversalNavigation from './components/UniversalNavigation'
import './App.css';

class App extends Component {
  render() {
    return (

      <div>
        <UniversalNavigation />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1}>
              <Routes onChange={this.handleChange} />
            </Col>
          </Row>
        </Grid>
      </div>
      
    );
  }
};

export default App;
