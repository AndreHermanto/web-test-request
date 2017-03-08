import React from 'react';
import {
  FormGroup,
  ControlLabel
} from 'react-bootstrap';
import ReactToggle from 'react-toggle';
import { 
  SubLabel,
  ValidationFeedback
} from './SharedStyle';

/**
 * This adds bootstrap validation styling to react-toggle.
 */
export default function Toggle({
  field,
  label,
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
      <ControlLabel>
        {label}
        {required && (<SubLabel>Required</SubLabel>)}
        {optional && (<SubLabel>Optional</SubLabel>)} 
      </ControlLabel>
      <br />
      <ReactToggle
        name={field}
        checked={formState[field] === true}
        onChange={onChange} />
      <ValidationFeedback>{validator.feedback}</ValidationFeedback>
    </FormGroup>
  );
} 