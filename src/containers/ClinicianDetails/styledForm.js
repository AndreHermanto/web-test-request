import styled, { keyframes } from 'styled-components';

export const LabelOut = keyframes`
  0% {
    left: 1px;
    opacity: 1;
    top: 1.2em;
    font-size: 1em;
    font-weight: 300;
  }
  50% {
    font-size: 1em;
    left: 1em;
    opacity: 0;
    top: 1.2em;
    font-weight: 300;
  }
  50.01% {
    font-size: 0.65em;
    left: 1em;
    opacity: 0;
    top: 0.2em;
    color: #00A6B6;
    font-weight: 400;
  }
  100% {
    font-size: 0.7em;
    opacity: 1;
    left: 1px;
    top: 0.2em;
    color: #00A6B6;
    font-weight: 400;
  }
`;

export const LabelIn = keyframes`
  0% {
    left: 1px;
    opacity: 1;
    top: 1.2em;
    font-size: 1em;
    font-weight: 300;
  }
  50% {
    font-size: 1em;
    left: 1em;
    opacity: 0;
    top: 1.2em;
    font-weight: 300;
  }
  50.01% {
    font-size: 0.65em;
    left: 1em;
    opacity: 0;
    top: 0.2em;
    color: #00A6B6;
    font-weight: 400;
  }
  100% {
    font-size: 0.65em;
    opacity: 1;
    left: 1px;
    top: 0.2em;
    color: #00A6B6;
    font-weight: 400;
  }
`;

export const FormBox = styled.div`
    border-color: #e3e7f1;
    box-shadow: 0 1px 3px #e3e7f1, 0 1px 0 #e3e7f1;
    padding: 19px;
`;

export const InputContainer = styled.div`
  position: relative;
  height: 2.9em;
  border: 0px solid #ECECEC;
  border-bottom-width: 1px;
  label {
    animation-name: ${LabelIn};
    animation-duration: 0.35s;
    animation-direction: reverse;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  }
`;

export const Label = styled.label`
  font-family: "Helvetica Neue", Helvetica, Arial;
  display: block;
  position: absolute;
  margin-top: 2px;
  padding: 1px;
  letter-spacing: 0.012em;
  color: #ACACAC;
  font-size: 1em;
`;


export const InputText = styled.input`
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  border: 0;
  top: 1.2em;
  background: none;
  z-index: 1;
  padding: 1px;
  font-size: 1em;
  font-family: "Helvetica Neue", Helvetica, Arial;
  letter-spacing: 0.012em;
  &:focus {
    outline: 0;
  }

  &:focus + label, &:valid + label {
    animation-name: ${LabelOut};
    animation-duration: 0.35s;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);
  } 
`;

export default { 
  LabelOut, LabelIn, FormBox, InputContainer, Label, InputText
}