import React, { Component } from 'react';
import { 
  Row,
  Col,
  Form,
  Glyphicon
} from 'react-bootstrap';
import styled from 'styled-components';
import { 
  initData,
  setFormState,
  validatedToTrue,
  authenticatedToFalse } from './reducer';
import { getInvoice } from './api';
import { hashHistory } from 'react-router';
import InputInvoice from './../../components/InputInvoice';

const FormContainer = styled.div`
  height: 90px; 
`;

const Container = styled.div`
  margin-top: 50px;
`;

const SubmitButton = styled.button`
  border-style: solid;
  border-width: 0.01px;
  background-color: #00a6b6;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 0px;
  -webkit-transition: background-color 0.5s;
  -webkit-transition-timing-function: ease;
  text-transform: uppercase;
  &:hover {
    background-color: #00c9dc;
  }
`;

const Login = styled.div`
  width: 100%;
  height: 400px;
  border-style: solid;
  padding: 40px 40px 40px 50px;
  text-align: center;
  background-color: #f6f6f6;
  border-width: 3px;
  border-color: #00525a;
  color: #00525a;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const Invoice = styled.h3`
  width:130px;
  margin-top:-57px;
  margin-left: 31%;
  margin-bottom: 30px;
  background:white;
`;

const Warning = styled.div`
  height: 15px;
  color: #a94442;
  margin-bottom: 20px;
`;

/**
 * LoginInvoice - Landing page to see invoice
 */
class LoginInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = initData();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

	}
  handleInputChange(event) {
    const target = event.target;
    this.setState(setFormState(this.state, target));
  }

  handleSubmit(passValidation) {
    if(!passValidation) return false;
    var self = this;
    getInvoice(Object.assign({}, this.state.form, {id: this.props.params.id}))
    .then(function(response) {
      if(response.length){
        hashHistory.push({
          pathname: '/invoice',
          query: {data: JSON.stringify(response[0]).data}
        })
      }else{
        self.setState(authenticatedToFalse(self.state));
      }
    })
  }

  handleConfirm() {
    return this.setState(validatedToTrue(this.state), () => {    
      var pass = true;
      for (var field in this.state.validation) {
        if(!this.state.validation[field].skip) {
          if(this.state.validation[field].status === 'error') pass = false;
        }
      }

      this.handleSubmit(pass); 
    });
  }
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }

	render(){
    return(
    <Container>
      <Row>
        <Col xs={6} xsOffset={3}>
          <Login>     
            <Invoice><Glyphicon glyph="glyphicon glyphicon-list-alt" /> INVOICE</Invoice>
            <Form>
              <FormContainer>              
                <InputInvoice
                  field="lastName"
                  label="Last Name"
                  onChange={this.handleInputChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                  glyphicon="glyphicon-user"
                />
              </FormContainer>
              <FormContainer>
                <InputInvoice
                  field="phone"
                  label="Phone"
                  onChange={this.handleInputChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                  glyphicon="glyphicon-phone-alt"
                />
              </FormContainer>
              <Warning>{this.state.authenticated? null : "Invalid phone number or last name"}</Warning>
              <SubmitButton type="button" onClick={this.handleConfirm}>
                View Invoice
              </SubmitButton>
            </Form>
          </Login>
        </Col>
      </Row>
    </Container>
	  )
  }
}

export default LoginInvoice;