import React, { Component } from 'react';
import { 
  FormGroup, 
  ControlLabel
} from 'react-bootstrap';
import {
  initData,
  setFormData,
  setBillOption,
  setSelectData,
  setPricing,
  validatedToTrue
} from './reducer'
import { getPricing } from './api';
import { 
  PageHeading,
  FormButton,
  Helper
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
    this.handleBillingChange = this.handleBillingChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.state = initData(props.route.data);
  }
  
  componentDidMount() {
    this.priceChange();
  }
  
  priceChange() {
    return getPricing(
      this.props.route.orderTestData.test ? this.props.route.orderTestData.test.id : '',
      this.state.form.billOption === 'Institution' ? this.props.route.clinicianData.organisation : this.state.form.payer,
      this.props.route.familyMemberData.familyMember ? this.props.route.familyMemberData.familyMember.length : 0
    )
      .then((pricing) => {
        this.setState(setPricing(this.state, pricing.breakdown));
      });
  }

  handleChange(event) {
    this.setState(setFormData(this.state, event.target));
  }
  
  handleBillingChange(event) {
    var payer = (event.target.value === 'Institution') ? 
                { value: this.props.route.clinicianData.organisation || '' } : 
                this.getPayers()[0];
    this.setState(setBillOption(this.state, event.target, payer), this.priceChange);
  }

  handleSelectChange(event) {
    this.setState(setSelectData(this.state, event.value, event.email), this.priceChange);
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
    var payers = [{ value: 'Other', label: 'Other' }];
    
    if(this.props.route.patientData.firstName &&
      this.props.route.patientData.lastName) {
      let patientName = this.props.route.patientData.firstName.toString() + ' ' + 
                        this.props.route.patientData.lastName.toString();
      payers.unshift({ 
        value: patientName, 
        label: patientName + ' (Patient)',
        email: this.props.route.patientData.email
      });
    }

    if(this.props.route.familyMemberData && this.props.route.familyMemberData.familyMember) {
      this.props.route.familyMemberData.familyMember.forEach((member) => {
        let memberName = member.FamilyMemberDetails.firstName.toString() + ' ' + 
                         member.FamilyMemberDetails.lastName.toString();
        payers.unshift({
          value: memberName, 
          label: memberName + ' (Family Member)',
          email: member.FamilyMemberDetails.email
        })
      });
    }
    
    return payers;
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
          onChange={this.handleBillingChange}
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
              <Helper>
              I have advised the patient that this test is dependent on private payment and will not proceed till it is received.
              </Helper>
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
              
              <br />
              <Helper>
                When this test request form is submitted, an email will be sent to this payer with a weblink to view the invoice. <br /><br />
                To open the link, the payer will need to type the patient's surname, and the payer's mobile number that you provided us in the Billing section when completing this form.<br /><br />
                Testing does not begin until payment is received.
              </Helper>
                  
            </div>
          }

          </div>
        }
        {
          this.props.route.isEdited !== true &&
          <FormButton 
          bsStyle="warning" 
          onClick={this.handleBack}
          label="Back"
          >
            Back
          </FormButton> 
        }
      
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