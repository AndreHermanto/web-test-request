import React, { Component } from 'react';
import { 
  Button,
  Row,
  Col,
  Form
} from 'react-bootstrap';
import styled from 'styled-components';
import { 
  initData,
  setFormState,
  validatedToTrue,
  authenticatedToFalse } from './reducer';
import { getInvoice } from './api';
import { hashHistory } from 'react-router';
import Input from './../../components/Input';

const FormContainer = styled.div`
  height: 100px; 
`;

const Container = styled.div`

`;

const SubmitButton = styled(Button)`
margin-bottom: 0px;
`;

const Login = styled.div`
  width: 100%;
  height: 330px;
  border-style: solid;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  border-color: #777;
`;
const Invoice = styled.h4`
  width:80px;
  margin-top:-52px;
  margin-left: 40%;
  margin-bottom: 30px;
  background:white;
  color: #777;
`;

const Warning = styled.div`
  height: 15px;
  color: red;
  margin: 15px;
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
    getInvoice(Object.assign({}, {id: this.props.params.id}))
    .then(function(response) {
      if(self.state.form.lastName === response[0].data.BillingInfo.lastName && self.state.form.phone === response[0].data.BillingInfo.phone){
        hashHistory.push({
          pathname: '/invoice',
          query: {data: JSON.stringify(response[0].data)}
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
            <Invoice>INVOICE</Invoice>
            <Warning>{this.state.authenticated? null : "Invalid phone number or last name"}</Warning>
            <Form>
              <FormContainer>
                <Input
                  field="phone"
                  label="Phone"
                  onChange={this.handleInputChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                  required
                />
              </FormContainer>
              <FormContainer>              
                <Input
                  field="lastName"
                  label="Surname"
                  onChange={this.handleInputChange}
                  onValidate={this.validate()}
                  formState={this.state.form}
                  required
                />
              </FormContainer>
              <SubmitButton type="button" onClick={this.handleConfirm} bsStyle="success">
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