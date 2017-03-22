import React, { Component } from 'react';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import secretPrefill from './components/secretPrefill';
import Routes from './components/Routes';
import UniversalNavigation from './components/UniversalNavigation';
import Footer from './components/Footer';
import { 
  setFormInputData,
  setFormEditState,
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
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      formInput: {},
      isEdited: false
    }
  }
  
  componentWillMount() {
    secretPrefill(this, 'formInput');
  }
  
  handleChange(formComponent) {
    if(!formComponent.state) return;
         
    this.setState(setFormInputData(
      this.state,
      formComponent.state.formId, 
      formComponent.state.form
    ));
  }

  handleEdit() {
    this.setState(setFormEditState(this.state));
  }
  
  handleFamilyMemberChange(formComponent) {
    if(!formComponent.state) return;
               
    this.setState(setFamilyMemberData(
      this.state,
      formComponent.state.formId,
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
            <Col md={10} mdOffset={1} className="pageArea">
              <Routes 
                onChange={this.handleChange}
                onFamilyMemberChange={this.handleFamilyMemberChange}
                onFamilyMemberDelete={this.handleFamilyMemberDelete}
                data={this.state.formInput}
                onEdit={this.handleEdit}
                isEdited={this.state.isEdited}
              />
            </Col>
          </Row>
        </Grid> 
        <Footer />
      </div>
    );
  }
};

export default App;
