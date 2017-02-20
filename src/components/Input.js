import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { 
  SubLabel,
  ValidationFeedback
} from './SharedStyle';

/**
 * This provides a validatable input textbox
 */
export default function Input({
  field,
  label,
  placeholder,
  onChange,
  onValidate,
  required,
  optional
}) {
  var validator;
  if(!onValidate) {
    validator = { status: null, rule: {} };
  } else {
    validator = onValidate[field] || { status: null, rule: {} };
  }

  return (
    <FormGroup validationState={validator.status}>
      <ControlLabel>
        {label}
        {required && (<SubLabel>Required</SubLabel>)}
        {optional && (<SubLabel>Optional</SubLabel>)} 
      </ControlLabel>
      <FormControl
        type="text"
        name={field}
        placeholder={placeholder || "Enter the " + label.toLowerCase()}
        onChange={onChange}
      />
      <FormControl.Feedback />
      <ValidationFeedback>{validator.feedback}</ValidationFeedback>
    </FormGroup>
  );
} 