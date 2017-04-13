import React, { Component } from 'react';
import { 
  Tab,
  Nav,
  NavItem
} from 'react-bootstrap';
import styled from 'styled-components';
import {
  initData,
  setFormData,
  setTestRequestList,
  validatedToTrue
} from './reducer';
import {
  getTestRequestById,
  getTestRequestByPatientInfo
} from './api';
import OrderTestModule from './../Summary/components/OrderTestModule';
import PatientDetailsModule  from './../Summary/components/PatientDetailsModule';
import FamilyMemberModule from './../Summary/components/FamilyMemberModule';
import ClinicianDetailsModule  from './../Summary/components/ClinicianDetailsModule';
import BillingInfoModule from './../Summary/components/BillingInfoModule';
import { 
  FormButton,
  PageHeading
} from './../../components/SharedStyle';
import Input from './../../components/Input';
import RadioSet from './../../components/RadioSet';
import DatePicker from './../../components/DatePicker';
import './tabs.css';

const SearchArea = styled.div`
  width: 35%;
  float: left;
  overflow: hidden;
  padding-right: 24px;
  padding-left: 4px;
  padding-top: 0px;
  margin-top: 0px;
  border-right: thin solid #e7e7e7;
`;

const TestRequestView = styled.div`
  width: 65%
  padding-left: 6%;
  float: left;
  min-height: 450px;
`;

const ListContainer = styled(Nav)`
  padding: 4px !important;
  border-radius: 0px !important;
  background-color: #fff;
  border: 1px solid;
  margin: 6px 0 6px 0;
  cursor: pointer;
  color:${props => props.selected ? '#00a6b6' : '#000'};
  border-color: ${props => props.selected ? '#00a6b6' : '#ccc'};
  &:hover {
    border-color: #00a6b6;
    color: #00a6b6 !important;
  }

  li {
    border-color: #00a6b6;
    color: #00a6b6 !important;
  }
`;

/**
* Confirmation - UI for ordering type of tests, selecting disorder and related genes for testing.
*/
class View extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchById = this.handleSearchById.bind(this);
    this.handleSearchByPatientDetails = this.handleSearchByPatientDetails.bind(this);
    this.state = initData();
  }
  
  handleChange(event) {
    this.setState(setFormData(this.state, event.target),
    this.setState(setTestRequestList(this.state, [])));
  }
  
  handleSearchById() {
    this.setState(validatedToTrue(this.state));
    
    if(
      this.state.validation.testRequestId.status !== 'error'
    ) {
      return getTestRequestById(this.state.form.testRequestId)
        .then((data) => {
          var array = [];
          if(data.id) array.push(data);
          this.setState(setTestRequestList(this.state, array));
        });
    }
    
    return false;
  }
  
  handleSearchByPatientDetails() {
    this.setState(validatedToTrue(this.state));
    
    if(
      this.state.validation.firstName.status !== 'error' &&
      this.state.validation.lastName.status !== 'error' &&
      this.state.validation.dob.status !== 'error'
    ) {                              
      return getTestRequestByPatientInfo(
        this.state.form.firstName,
        this.state.form.lastName,
        this.state.form.dob
      )
        .then((data) => {
          this.setState(setTestRequestList(this.state, data));
        });  
    }
                                  
    return false;
  }
  
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }
  
  render() {
    return (
      <Tab.Container id="testRequestSearch">
        <div>
          <SearchArea>
            <PageHeading>Search Test Request</PageHeading>

            <RadioSet 
              field="searchBy"
              label="Search by"
              options={['Test Request Id', 'Patient Details']}
              onChange={this.handleChange}
              formState={this.state.form}
              inline
            />

            <hr />

            {this.state.form.searchBy === 'Test Request Id' &&
              <div>
                <Input
                  field="testRequestId"
                  label="Test Request Id"
                  onChange={this.handleChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                />

                <FormButton  
                  type="submit" 
                  onClick={this.handleSearchById}
                >
                  Search
                </FormButton> 
              </div>
            }

            {this.state.form.searchBy === 'Patient Details' &&
              <div>
                <Input
                  field="firstName"
                  label="Given Name"
                  onChange={this.handleChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                />

                <Input
                  field="lastName"
                  label="Surname"
                  onChange={this.handleChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                />

                <DatePicker
                  field="dob"
                  label="Date of Birth"
                  onChange={this.handleChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                />

                <FormButton  
                  type="submit" 
                  onClick={this.handleSearchByPatientDetails}
                >
                  Search
                </FormButton> 
              </div>
            }

            {(this.state.testRequestList && this.state.validated) &&
              <div>
                <br /><hr />
                <PageHeading>Found Test Request</PageHeading>
                {
                  (this.state.testRequestList.length > 0) &&
                  <ListContainer bsStyle="pills" stacked>
                  {
                    this.state.testRequestList.map((testRequest, $index) => {
                      return <NavItem eventKey={'tr'+$index} key={'tr'+$index}>
                        <div>ID: {testRequest.id}</div>
                        <div>Submitted time: {testRequest.createdDateTime}</div>
                      </NavItem>
                    })
                  }
                  </ListContainer>
                }
                
                {
                  (this.state.testRequestList.length === 0) &&
                  <p>
                    No test request is found.
                  </p>
                }
              </div>
            }
          </SearchArea>

          <TestRequestView>
            {(this.state.testRequestList && this.state.testRequestList.length === 0) &&
              <p><br /><br />Please use the left hand panel to search for test request. </p>
            }
            
            {(this.state.testRequestList && this.state.testRequestList.length > 0) &&
              <Tab.Content>
                {
                  this.state.testRequestList.map((testRequest, $index) => {
                    return <Tab.Pane eventKey={'tr'+$index} key={'tr'+$index} >
                      <OrderTestModule orderTestModule={testRequest.orderTestModule}/>
                      <PatientDetailsModule patientDetails={testRequest.patientDetailsModule} clinicalInfo={testRequest.clinicalInfoModule}/>
                      {
                        testRequest.familyMembersModule.familyMembers.length > 0 &&
                        testRequest.familyMembersModule.familyMembers.map((member, i) => 
                        {
                          return <FamilyMemberModule familyMemberDetails={member.familyMemberDetails} familyMemberClinicalInfo={member.familyMemberClinicalInfo} key={i}/>
                        })
                      }
                      <ClinicianDetailsModule clinicianDetailsModule={testRequest.clinicianDetailsModule}/>
                      <BillingInfoModule billingInfoModule={testRequest.billingInfoModule} clinicianDetailsModule={testRequest.clinicianDetailsModule}/>
                    </Tab.Pane>
                  })
                }
              </Tab.Content>
            }
          </TestRequestView>
        </div>
      </Tab.Container>
    );
  }
}

export default View;