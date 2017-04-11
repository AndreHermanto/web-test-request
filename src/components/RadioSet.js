import React from 'react';
import {
  FormGroup,
  ControlLabel,
  Radio
} from 'react-bootstrap';
import { 
  SubLabel,
  ValidationFeedback
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
  onValidate,
  formState,
  required,
  optional,
  inline
}) {
  var validator;
  if(!onValidate) {
    validator = { status: null, rule: {} };
  } else {
    validator = onValidate[field] || { status: null, rule: {} };
  }
  
  return (
    <FormGroup onChange={onChange} validationState={validator.status}>
      {label && (
        <ControlLabel>
          {label}
          {required && (<SubLabel>Required</SubLabel>)}
          {optional && (<SubLabel>Optional</SubLabel>)} 
        </ControlLabel>
      )}
      <br />
      {options.map((option, $index) => {
        var id, label, defaultVal;
        // This support object with label and id
        if(typeof option === "object") {
          label = option.label;
          id = option.id;
          defaultVal = formState[field] ? formState[field].id : '';
        } else if(typeof option === "boolean"){
          if(option){
            label = "Affected";
            id = true;
            defaultVal = true;
          }else{
            label = "Unaffected";
            id = false;
            defaultVal = false;            
          }
        }else {
          label = option;
          id = option;
          defaultVal = formState[field];
        }
       
        return (
          <Radio
            key={id}
            name={field} 
            value={id} 
            inline={inline}
            defaultChecked={defaultVal === id}
          >
            {label}{(subLabels && subLabels[$index]) && (<SubLabel>({subLabels[$index]})</SubLabel>)}
          </Radio>
        )
      })}
      <ValidationFeedback>{validator.feedback}</ValidationFeedback> 
    </FormGroup>
  );
} 