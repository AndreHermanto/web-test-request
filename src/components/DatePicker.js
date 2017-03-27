import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  FormGroup,
  ControlLabel
} from 'react-bootstrap';
import styled from 'styled-components';
import { 
  SubLabel,
  ValidationFeedback,
  FormInput
} from './SharedStyle';

const DateLabel = styled.span`
  color: #222;
  margin-top: 8px;
  margin-bottom: 2px;
  font-size: 90%;
`;

const DateBlock = styled.div`
  float: left !important;
  margin-right: 12px;
  display:inline-block;
`;

const DateSlash = styled.div`
  float: left !important;
  margin-right: 12px;
  font-size: 28px;
  margin-top: 18px;
`;

/**
 * This provides a date input via 3 select boxes
 */
class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.handleDateChange = this.handleDateChange.bind(this);
    
    var prefill = [];
    if(props.formState[props.field]) {
      prefill = props.formState[props.field].split('-');
    }
    
    this.state = {
      day: prefill[0] || '',
      month: prefill[1] || '',
      year: prefill[2] || ''
    }
  }
  
  handleDateChange(event) {
    var target = event.currentTarget;
    if(!target) { return; }
    
    if(target.name === 'day' && target.value.length > 2) target.value = target.value.substring(0,2);
    if(target.name === 'month' && target.value.length > 2) target.value = target.value.substring(0,2);
    if(target.name === 'year' && target.value.length > 4) target.value = target.value.substring(0,4);
    
    this.setState({ [target.name]: target.value }, () => {
      var date = Object.assign({}, this.state), value;
      if(
        !date.day || !date.month || !date.year ||
        date.day > 31 || date.day < 1 ||
        date.month > 12 || date.day < 1 ||
        date.year.length !== 4
      ) {
        value = '';
      } else {
        value = parseInt(date.day, 0) + '-' + parseInt(date.month, 0) + '-' + parseInt(date.year, 0);
      }

      if(target.name === 'day' && target.value.length >= 2) ReactDOM.findDOMNode(this.refs.month).focus();
      if(target.name === 'month' && target.value.length >= 2) ReactDOM.findDOMNode(this.refs.year).focus();
      
      this.props.onChange({
        target: {
          name: this.props.field,
          value: value,
          dataset: {
            index: this.props['data-index']
          }
        }
      });
    });
  }
  
  render() {
    var validator;
    if(!this.props.onValidate) {
      validator = { status: null, rule: {} };
    } else {
      validator = this.props.onValidate[this.props.field] || { status: null, rule: {} };
    }
    
    return (
      <FormGroup validationState={validator.status}>
        <ControlLabel>
          {this.props.label}
          {this.props.required && (<SubLabel>Required</SubLabel>)}
          {this.props.optional && (<SubLabel>Optional</SubLabel>)} 
        </ControlLabel>
        <br />
        <div className="date" style={{ height: 25 }}>      
          <DateBlock
            style={{ width: 50 }}
          >
            <DateLabel>Day</DateLabel>
            <FormInput
              type="text"
              name="day"
              ref="day"
              onChange={this.handleDateChange}
              value={this.state.day || ''}
            />
          </DateBlock>
          <DateSlash> / </DateSlash>
          <DateBlock
            style={{ width: 50 }}
          >
            <DateLabel>Month</DateLabel>
            <FormInput
              type="text"
              name="month"
              ref="month"
              onChange={this.handleDateChange}
              value={this.state.month || ''}
            />
          </DateBlock>
          <DateSlash> / </DateSlash>
          <DateBlock
            style={{ width: 80 }}
          >
            <DateLabel>Year</DateLabel>
            <FormInput
              type="text"
              name="year"
              ref="year"
              onChange={this.handleDateChange}
              value={this.state.year || ''}
            />
          </DateBlock>
        </div>

        <br /><br />
        <ValidationFeedback>{validator.feedback}</ValidationFeedback>
      </FormGroup>
    )
  }
}
  
export default DatePicker;

