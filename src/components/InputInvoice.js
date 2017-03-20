import React from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import { 
  ValidationFeedback,
  GlyphForm,
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
  disabled,
  glyphicon
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
        </ControlLabel>
      )}
      <FormInput
        type="text"
        name={field}
        onChange={onChange}
        value={formState && formState[field]}
        disabled={disabled}
      />
      <GlyphForm glyph={"glyphicon " + glyphicon} className="form-control-feedback"/>
      <FormControl.Feedback />
      <ValidationFeedback>{validator.feedback}</ValidationFeedback>
    </FormGroup>
  );
} 