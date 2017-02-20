import React, { Component } from 'react';
import {
  FormGroup,
  ControlLabel
} from 'react-bootstrap';

import { Typeahead } from 'react-bootstrap-typeahead';
import styled from 'styled-components';
import { 
  SubLabel,
  ValidationFeedback
} from './SharedStyle';

const DateSelect = styled(Typeahead)`
  float: left;
  margin-right: 12px;
  width: 100px;
`;

/**
 * This provides a date input via 3 select boxes
 */
class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    
    this.state = {
      day:'',
      month:'',
      year:''
    }
  }
  
  handleSelectionChange(e) {
    var select = e[0];
    if(!select) { return; }
    
    this.setState({ [select.name]: select.value }, () => {
      var date = Object.assign({}, this.state), value;
      if(!date.day || !date.month || !date.year) {
        value = '';
      } else {
        value = date.day + '-' + date.month + '-' + date.year;
      }
      
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
        <DateSelect
          labelKey={option => `${option.label}`}
          placeholder="Day"
          style={{ width: 30 }}
          onChange={this.handleSelectionChange}
          options={ 
            (function() {
              var arr = [], i;
              for(i=1;i<=31;i++) {
                arr.push({
                  name: 'day',
                  value: i, 
                  label: i
                });
              }
              return arr;
            })()
          }
        />

        <DateSelect
          labelKey={option => `${option.label}`}
          placeholder="Month"
          onChange={this.handleSelectionChange}
          options={ 
            ([
              'January', 'February', 'March', 
              'April', 'May', 'June', 
              'July', 'August', 'September', 
              'October', 'November', 'December'         
            ]).map(function(mm) {
              return (
                {
                  name: 'month',
                  value: mm, 
                  label: mm
                }
              );
            })
          }
        />
        
        <DateSelect
          labelKey={option => `${option.label}`}
          placeholder="Year"
          onChange={this.handleSelectionChange}
          options={ 
            (function() {
              var arr = [], i;
              for(i=0;i<100;i++) {
                arr.push({
                  name: 'year',
                  value: i+1917, 
                  label: i+1917
                });
              }
              return arr;
            })()
          }
        />
        <br /><br />
        <ValidationFeedback>{validator.feedback}</ValidationFeedback>
      </FormGroup>
    )
  }
}
  
export default DatePicker;

