import React, { Component } from 'react';
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import secretPrefill from './components/secretPrefill';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Routes from './components/Routes';
import UniversalNavigation from './components/UniversalNavigation';
import Footer from './components/Footer';
import { 
  setFormInputData,
  setFormEditState,
  setFamilyMemberData,
  deleteFamilyMemberData,
  validatedToTrue,
  cleanFormState
} from './rootReducer';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFamilyMemberChange = this.handleFamilyMemberChange.bind(this);
    this.handleFamilyMemberDelete = this.handleFamilyMemberDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleClean = this.handleClean.bind(this);
    this.redirectStepOne = this.redirectStepOne.bind(this);
    this.state = {
      formInput: {},
      isEdited: false
    }
  }
  
  /*
  * only display message if user's not in confirmation page
  */
  componentDidMount() {
    window.onbeforeunload = function() {
      if(window.location.hash !== '#/confirmation') 
      { 
        return "Are you sure to leave this page?";
      }
    }
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
  
  handleClean() {
    this.setState(cleanFormState(this.state));
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
      this.state
    ));
  }
  
  // This enforce redirection to step1 if you refresh the browser in the middle of filling form. A warning
  // will be given to warn about the data loss upon refreshing and give the user a choice.
  redirectStepOne(nextState, replace) {
    if(Object.keys(this.state.formInput).length === 0 && nextState.location.pathname !== '/step1') {
      replace({
        pathname: '/step1'
      })
    }
  }
  
  // If a user attempt to skip the process via changing the url, it will block that attempt unless going back
  // to the previous form.
  preventUnvisitedFormAccess(nextLocation) {
    if(this.props.location.query && this.props.location.query.shazam) return true;

    var pass = true;
    var targetStep = parseInt(nextLocation.pathname.split('step')[1], 0);
    var currentStep = parseInt(this.props.location.pathname.split('step')[1], 0);
                                  
    for (var field in this.state.validation) {
      if(!this.state.validation[field].skip) {
        if(this.state.validation[field].status === 'error') {
          pass = false;
          this.setState(validatedToTrue());
        }
      }
    }

    // Allow proceeding to the next step if validation passes and detect no manual url change.
    if(pass && targetStep === (currentStep + 1)) {
      return true;
    }
    
    // Allow proceeding backward without validation.
    if(targetStep <= (currentStep - 1)) {
      return true;
    }
    
    // If current step is 4, allow /step4/add and /step4/edit
    if(targetStep === 4 && currentStep === 4) {
      return true;
    }
    
    // Allow summary after step6.
    if(pass && nextLocation.pathname === '/summary' && currentStep === 6) {
      return true;
    }
    
    // Summary page remains accessible once isEdited status is true.
    if(pass && nextLocation.pathname === '/summary' && this.props.route.isEdited) {
      return true;
    }
    
    // If any url other than back/next a step, it will block the accessand enforce the user to use the buttons. 
    NotificationManager.warning('Please do not intend to skip the form via manually editing the url', 'Steps cannot be skipped.', 6000);
    this.props.router.replace(this.props.location.pathname);
    return false;
  }
  
  
  render() {
    return (
      <div>
        <UniversalNavigation />
        <br />
        <Grid>
          <Row>
            <Col md={10} mdOffset={1} className="pageArea">
              <Routes 
                onChange={this.handleChange}
                onClean={this.handleClean}
                onFamilyMemberChange={this.handleFamilyMemberChange}
                onFamilyMemberDelete={this.handleFamilyMemberDelete}
                data={this.state.formInput}
                onEdit={this.handleEdit}
                isEdited={this.state.isEdited}
                redirectStepOne={this.redirectStepOne}
                preventUnvisitedFormAccess={this.preventUnvisitedFormAccess}
              />
              <NotificationContainer/>
            </Col>
          </Row>
        </Grid> 
        <Footer />
      </div>
    );
  }
};

export default App;
