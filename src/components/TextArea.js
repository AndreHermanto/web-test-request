import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { 
  SubLabel,
  ValidationFeedback,
  FormNoBorder
} from './SharedStyle';
import styled from 'styled-components';

const Helper = styled.div`
  color: #696969;
  line-height: 1.3;
  margin-bottom: 4px;
  font-size: 90%;
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
        
      <FormNoBorder
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