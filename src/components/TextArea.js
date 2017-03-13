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
import styled from 'styled-components';

const Helper = styled.div`
  font-size: 12px;
  color: #777;
`;

/**
 * This provides a validatable input textbox
 */
export default function TextArea({
  field,
  label,
  helper,
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

      {helper && (
        <Helper>{helper}</Helper>
      )}
        
      <FormControl
        componentClass="textarea"
        name={field}

        onChange={onChange}
        value={formState && formState[field]}
        style={{ minHeight: 90 }}
      />
      <FormControl.Feedback style={{ marginTop: 16 }} />
      <ValidationFeedback>{validator.feedback}</ValidationFeedback>
    </FormGroup>
  );
} 