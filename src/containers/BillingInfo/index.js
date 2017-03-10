import React, { Component } from 'react';
import { 
  FormGroup, 
  ControlLabel
} from 'react-bootstrap';
import {
  initData,
  setFormData,
  setSelectData,
  validatedToTrue
} from './reducer'
import { 
  PageHeading,
  FormButton
} from './../../components/SharedStyle';
import Select from 'react-select';
import Input from './../../components/Input';
import Toggle from './../../components/Toggle';
import RadioSet from './../../components/RadioSet';
import PriceList from './components/PriceList';

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
    //this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = initData(props.route.data);
  }

  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
  }

  handleSelectChange(event) {
    this.setState(setSelectData(this.state, event.value, this.props.route.patientData.email));
  }

  handleBack() {
    this.props.route.onChange(this);
    this.props.router.push('/step5');
  }

  handleNext(passValidation) {
    if(!passValidation) return false;
    this.props.route.onChange(this);
    this.props.router.push('/summary');
  }

  handleConfirm() {
    return this.setState(validatedToTrue(this.state), () => {    
      var pass = true;
      for (var field in this.state.validation) {
        if(!this.state.validation[field].skip) {
          if(this.state.validation[field].status === 'error') pass = false;
        }
      }
      this.handleNext(pass); 
    });
  }

  getPayers() {
    if(
      !this.props.route.patientData.firstName ||
      !this.props.route.patientData.lastName
    ) return [{ value: 'Other', label: 'Other' }];
    
    
    let patient = this.props.route.patientData.firstName.toString() + ' ' + this.props.route.patientData.lastName.toString();
    return [
      { value: patient, label: patient },
      { value: 'Other', label: 'Other' }
    ];
  }
  
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
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
        <PageHeading>Step 6: Billing info</PageHeading>
        <RadioSet
          label="Select billing option"
          field="billOption"
          options={['Institution', 'Private']}
          subLabels={[this.props.route.clinicianData.organisation,'']}
          formState={this.state.form}
          onChange={this.handleChange}
          onValidate={this.validate()}
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
          {
            (this.state.form.billOption === 'Private') &&
            <FormGroup>
              <ControlLabel>Payer</ControlLabel>
              <Select
                name={payers.label}
                value={this.state.form.payer}
                options={payers}
                onChange={this.handleSelectChange}
                clearable={false}
              />
            </FormGroup>
          }
          {
            (this.state.form.billOption === 'Private') &&
            <div>
              <Toggle
                field="consent"
                label="Payer's consent confirmation"
                onChange={this.handleChange}
                onValidate={this.validate()}
                formState={this.state.form}
                required
              />

              <p style={{ fontSize: 11, fontStyle: 'italic', marginTop: -12 }}>
                I have advised the patient that this test is dependent on private payment and will not proceed till it is received.
              </p>
            </div>
          }
          {
            (this.state.form.billOption === 'Private') &&
            <div>
              <Input
                field="firstName"
                label="First Name"
                onChange={this.handleChange}
                onValidate={this.validate()}
                formState={this.state.form}
                required
                disabled={(this.state.form.payer !== 'Other')}
              />
              <Input
                field="lastName"
                label="Last Name"
                onChange={this.handleChange}
                onValidate={this.validate()}
                formState={this.state.form}
                required
                disabled={(this.state.form.payer !== 'Other')}
              />
              <Input
                field="payerEmail"
                label="Email"
                onChange={this.handleChange}
                onValidate={this.validate()}
                formState={this.state.form}
                required
                disabled={(this.state.form.payer !== 'Other')}
              />
              <Input
                field="phone"
                label="Mobile Number"
                onChange={this.handleChange}
                onValidate={this.validate()}
                formState={this.state.form}
                required
              />
            </div>
          }

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
          bsStyle="success" 
          type="submit" 
          onClick={this.handleConfirm}
        >
          Confirm
        </FormButton> 
      </div>
    );
  }
}

export default BillingInfo;