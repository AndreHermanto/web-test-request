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
export default function TextArea({
  field,
  label,
  placeholder,
  onChange,
  onValidate,
  formState,
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
      {label && (
        <ControlLabel>
          {label}
          {required && (<SubLabel>Required</SubLabel>)}
          {optional && (<SubLabel>Optional</SubLabel>)} 
        </ControlLabel>
      )}
      <FormControl
        componentClass="textarea"
        name={field}
        placeholder={placeholder || "Enter the " + label.toLowerCase()}
        onChange={onChange}
        value={formState && formState[field]}
        style={{ minHeight: 90 }}
      />
      <FormControl.Feedback />
      <ValidationFeedback>{validator.feedback}</ValidationFeedback>
    </FormGroup>
  );
} 