import React, { Component } from 'react';
import { 
  FormGroup, 
  ControlLabel,
  Glyphicon
} from 'react-bootstrap';
import {
  initData,
  setFormData,
  setSelectData,
  setPhoneData,
  validatedToTrue
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import Select from 'react-select';
import Phone from 'react-phone-number-input';
import Input from './../../components/Input';
import RadioSet from './../../components/RadioSet';
import PriceList from './components/PriceList';
import Toggle from 'react-toggle';
import styled from 'styled-components';

const PayerConsent = styled(ControlLabel)`
  position: absolute;
  marginTop: 2px;
  marginLeft: 5px;
`;
const MobileNumber = styled(Phone)`
  input {
    width: 200px;
    padding: 6px 12px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    width: 100%;
    border-color: #ccc;
  }
  img {
    width:30px;
    height:30px;
    border: 0px solid #fff;
  }
  .react-phone-number-input__country {
    marginRight: 1.3em;
  }
`;
/**
 * BillingInfo - UI for input billing details.
 */
class BillingInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.getPayers = this.getPayers.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = initData(props.route.data);
  }

  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
  }

  handleSelectChange(event) {
    this.setState(setSelectData(this.state, event.value));
  }

  handlePhoneChange(event) {
    this.setState(setPhoneData(this.state, event));
  }

  handleBack() {
    this.props.route.onChange(this);
    this.props.router.push('/step4');
  }

  handleNext(passValidation) {
    if(!passValidation) return false;
    this.props.route.onChange(this);
    this.props.router.push('/summary');
  }

  handleConfirm() {
    this.setState(validatedToTrue(this.state), () => {    
      var pass = true;
      for (var field in this.state.validation) {
        if(this.state.validation[field].status === 'error') pass = false;
      }
      this.handleNext(pass); 
    });
  }
  
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }

  getPayers() {
    if(this.props.route.clinicianData.firstName)
    {
      return [
        { value: this.props.route.clinicianData.firstName, label: this.props.route.clinicianData.firstName },
        { value: 'Bob', label: 'Bob' },
        { value: 'Jane', label: 'Jane' },
        { value: 'Other', label: 'Other' }
      ];
    }
    else {
      return [
        { value: 'Bob', label: 'Bob' },
        { value: 'Jane', label: 'Jane' },
        { value: 'Other', label: 'Other' }
      ];
    }
  }
  
  render() {
    const even = {
      backgroundColor:'#f9f9f9'
    }
    const odd = {
      backgroundColor:'#fff'
    }
    const total = {
      backgroundColor:'#fcf8e3',
      borderBottom: '1px solid #eee'
    }

    const payers = this.getPayers();
    return (
      <div>
        <PageHeading>Step 5: Billing info</PageHeading>

        <RadioSet
          label="Select billing option"
          field="billOption"
          options={['Institution', 'Private']}
          subLabels={[this.props.route.clinicianData.organisation,'']}
          formState={this.state.form}
          onChange={this.handleChange}
        />

        {
          this.state.form.billOption !== '' &&
          <div>  
          <FormGroup>
          {
            this.state.priceList.map((p, i) => {
              if(i === (this.state.priceList.length - 1)) {
                return <PriceList style={total} priceList={p} key={i}/>;
              }
              else if(i % 2 === 0) {
                return <PriceList style={even} priceList={p} key={i}/>;
              }
              else {
                return <PriceList style={odd} priceList={p} key={i}/>;
              }
            })
          }
          </FormGroup>

          <FormGroup>
            <ControlLabel>Payer</ControlLabel>
            <Select
              name={payers.label}
              value={this.state.form.payer}
              options={payers}
              onChange={this.handleSelectChange}
            />
          </FormGroup>

          <FormGroup>
            <Toggle
              name='consent'
              checked={this.state.form.consent === true}
              onChange={this.handleChange} />
            <PayerConsent>I have advised the patient that this test is dependent on private payment and will not proceed till it is received</PayerConsent>
          </FormGroup>

          <Input
            field="givenName"
            label="First Name"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />
              
          <Input
            field="lastName"
            label="Last Name"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />    

          <FormGroup>
            <ControlLabel>Mobile number</ControlLabel>
            <MobileNumber
              placeholder="Enter phone number"
              country='AU'
              onChange={this.handlePhoneChange}
            />
          </FormGroup>

          <Input
            field="email"
            label="Email"
            onChange={this.handleChange}
            onValidate={this.validate()}
            formState={this.state.form}
            required
          />

          </div>
        }
        <FormButton 
          bsStyle="warning" 
          onClick={this.handleBack}
          label="Back"
        >
          Back
        </FormButton> 

        <FormButton 
          bsStyle="info" 
          label="Print"
        >
          <Glyphicon glyph="print" /> Print Invoice
        </FormButton> 
      
        <FormButton 
          bsStyle="success" 
          type="submit" 
          onClick={this.handleConfirm}
        >
          Confirm and email
        </FormButton> 
      </div>
    );
  }
}

export default BillingInfo;