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
  BreakLine,
  Helper
} from './../../components/SharedStyle';
import Input from './../../components/Input';
import Toggle from './../../components/Toggle';
import RadioSet from './../../components/RadioSet';

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
    this.state = initData(props.route.data, this.props.route.patientData);
  }
  
  componentDidMount() {
    this.priceChange();
    if(this.props.route.preventUnvisitedFormAccess) {
      this.props.router.setRouteLeaveHook(this.props.route, this.props.route.preventUnvisitedFormAccess.bind(this));
    }
  }
  
  priceChange() {
    return getPricing(
      this.props.route.orderTestData.test ? this.props.route.orderTestData.test.id : '',
      (this.props.route.orderTestData.test && this.props.route.orderTestData.test.geneLists.length > 0) ? this.props.route.orderTestData.test.geneLists[0].type : 'complete',
      this.state.form.billOption === 'Institution' ? this.props.route.clinicianData.organisation : this.state.form.payer,
      this.props.route.familyMemberData.familyMembers ? this.props.route.familyMemberData.familyMembers.length : 0
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
                { id: this.props.route.clinicianData.organisation || '' } : 
                this.getPayers()[0];
    this.setState(setBillOption(this.state, event.target, payer), this.priceChange);
  }

  handleSelectChange(event) {
    this.setState(setSelectData(this.state, event.target.value), this.priceChange);
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
    var payers = [{ id: 'Other', label: 'Other' }];

    if(this.props.route.familyMemberData && this.props.route.familyMemberData.familyMembers) {
      this.props.route.familyMemberData.familyMembers.forEach((member) => {
        let memberName = member.familyMemberDetails.firstName.toString() + ' ' + 
                         member.familyMemberDetails.lastName.toString();
        payers.unshift({
          id: memberName, 
          label: memberName + ' (Family Member)'
        })
      });
    }

    if(this.props.route.patientData.firstName &&
      this.props.route.patientData.lastName) {
      let patientName = this.props.route.patientData.firstName.toString() + ' ' + 
                        this.props.route.patientData.lastName.toString();
      payers.unshift({ 
        id: patientName, 
        label: patientName + ' (Patient)'
      });
    }
    return payers;
  }

  getPayerOption(payers) {
    let options = [];
    payers.map((p) => {
      return options.push(p.label);
    })
    return options;
  }
  
  // This renders the validation result after confirm button is clicked.
  validate() {
    return this.state.validated && this.state.validation;
  }
  
  render() {
    const payers = this.getPayers();
    const options = this.getPayerOption(payers);
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
          this.state.form.billOption === 'Private' &&
          <div>  
            <BreakLine top={'2em'} bottom={'2em'}></BreakLine>
            <FormGroup>
              <ControlLabel style={{fontSize:24, fontWeight:500}}>Payer</ControlLabel>
              <div style={{marginTop:'-2em'}}>
                <RadioSet 
                  field="payer"
                  options={options}
                  onChange={this.handleSelectChange}
                  formState={this.state.form}
                />
              </div>
            </FormGroup>
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
              />
              <Input
                field="phone"
                label="Mobile Number"
                onChange={this.handleChange}
                onValidate={this.validate()}
                formState={this.state.form}
                required
              />
              <Helper style={{marginTop:-5, color:'#008b8b'}}>
                The mobile number entered will be used as the password to open the invoice sent to the payer.
              </Helper>
              <Toggle
                field="consent"
                label="Has payer's consent been received?"
                onChange={this.handleChange}
                onValidate={this.validate()}
                formState={this.state.form}
                declaration="I have advised the patient that this test is dependent on private payment and will not proceed till it is received."
                required
              />
          </div>
        }
        {
          this.props.route.isEdited !== true &&
          <FormButton 
          onClick={this.handleBack}
          label="Back"
          back
          >
            Back
          </FormButton> 
        }
      
        <FormButton 
          type="submit" 
          onClick={this.handleConfirm}
        >
          Next
        </FormButton> 
      </div>
    );
  }
}

export default BillingInfo;