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
import styled from 'styled-components';

const Declaration = styled.div`
  color: #222;
  font-size: 90%;
  padding-left: 14px;
  margin-top: -4px;
`;
;
/**
 * This adds bootstrap validation styling to react-toggle.
 */
export default function Toggle({
  field,
  label,
  onChange,
  onValidate,
  formState,
  declaration,
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
      <table>
        <tbody>
          <tr>
            <td>
              <ReactToggle
                name={field}
                checked={formState[field] === true}
                onChange={onChange} />
            </td>
            <td>
              {declaration && (
                <Declaration>{declaration}</Declaration>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <ValidationFeedback>{validator.feedback}</ValidationFeedback>
    </FormGroup>
  );
} 