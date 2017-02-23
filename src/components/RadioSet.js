import React from 'react';
import {
  FormGroup,
  ControlLabel,
  Radio
} from 'react-bootstrap';
import { 
  SubLabel
} from './SharedStyle';

/**
 * This creates a set of radio buttons via a single component.
 */
export default function RadioSet({
  field,
  label,
  options,
  subLabels,
  onChange,
  formState,
  required,
  optional,
  inline
}) {
  return (
    <FormGroup onChange={onChange}>
      {label && (
        <ControlLabel>
          {label}
          {required && (<SubLabel>Required</SubLabel>)}
          {optional && (<SubLabel>Optional</SubLabel>)} 
        </ControlLabel>
      )}
      <br />
      {options.map((option, $index) => {
        return (
          <Radio
            key={option}
            name={field} 
            value={option} 
            inline={inline}
            defaultChecked={formState[field] === option}
          >
            {option}{(subLabels && subLabels[$index]) && (<SubLabel>({subLabels[$index]})</SubLabel>)}
          </Radio>
        )
      })}
    </FormGroup>
  );
} 