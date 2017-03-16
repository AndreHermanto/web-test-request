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
import styled from 'styled-components';

const StyledRadio = styled(Radio)`
  padding: 16px !important;
  background-color: #fff;
  border: 1px solid #eee;
  &:hover {
    border-color:#00a6b6;
    box-shadow: 2px 2px 2px 0 rgba(46,46,46,.3);
    -webkit-transform: translateY(-2px);
    transform: translateY(-2px);
    color: #00a6b6 !important;
    span {
      color: #00a6b6 !important;
    }
  }
`;

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
        var id, label, defaultVal, totalGene, radio;
        var genes = [];
        // This support object with label and id
        if(typeof option === "object") {
          label = option.label;
          id = option.id;
          defaultVal = formState[field] ? formState[field].id : '';
        } else {
          label = option;
          id = option;
          defaultVal = formState[field];
        }

        //Check if RadioSet is used for gene panel or not
        if(field === 'test') {
          if(option.genes !== undefined) {
            totalGene = option.genes.length - 3;
            option.genes.map((gene, index) => {
              if(index < 3)
              {
                genes.push(gene);
              }
              return genes;
            })
          }
          radio = <StyledRadio
            key={id}
            name={field} 
            value={id} 
            inline={inline}
            defaultChecked={defaultVal === id}
            >
            {label}{(subLabels && subLabels[$index]) && (<SubLabel>({subLabels[$index]})</SubLabel>)}
            {
              genes.length > 0 &&
              <div className="text-muted">
              { 
                genes.map((g, i) => {
                  return (<span key={i}> {g}</span>)
                })
              }
              {
                totalGene > 0 &&
                <span> + {totalGene} more </span>
              }
              </div>
            }
          </StyledRadio>
        }
        else {
          radio = <Radio
            key={id}
            name={field} 
            value={id} 
            inline={inline}
            defaultChecked={defaultVal === id}
            >
            {label}{(subLabels && subLabels[$index]) && (<SubLabel>({subLabels[$index]})</SubLabel>)}
          </Radio>
        }
        return (
          radio 
        )
      })}
      <ValidationFeedback>{validator.feedback}</ValidationFeedback> 
    </FormGroup>
  );
} 