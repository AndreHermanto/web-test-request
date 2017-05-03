import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { 
  SubLabel,
  ValidationFeedback,
  FormInput
} from './SharedStyle';

/**
 * This provides a validatable input textbox
 */
export default function Input({
  field,
  label,
  onChange,
  onValidate,
  formState,
  required,
  optional,
  disabled,
  password
}) {
  var validator;
  if(!onValidate) {
    validator = { status: null, rule: {} };
  } else {
    validator = onValidate[field] || { status: null, rule: {} };
  }

  return (
    <FormGroup validationState={validator.status}>
      {label && (
        <ControlLabel>
          {label}
          {required && (<SubLabel>Required</SubLabel>)}
          {optional && (<SubLabel>Optional</SubLabel>)} 
        </ControlLabel>
      )}
      <FormInput
        type={password ? 'password' : 'text'}
        name={field}
        onChange={onChange}
        value={formState && formState[field]}
        disabled={disabled}
      />
      <FormControl.Feedback />
      <ValidationFeedback>{validator.feedback}</ValidationFeedback>
    </FormGroup>
  );
} 