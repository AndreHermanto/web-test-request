import styled from 'styled-components';
import {
  HelpBlock,
  Glyphicon,
  FormControl
} from 'react-bootstrap';
import Select from 'react-select';

export const PageHeading = styled.h3`
  margin-bottom: 21px;
  font-weight: bold;
  text-transform:capitalize;
`;

export const SubHeading = styled.h4`
  margin-bottom: 15px;
  font-weight: 550;
  text-transform:capitalize;
`;

export const FormButton = styled.button`
  margin: 18px 6px 0px 0px;
  border-style: none;
  background-color: ${props => props.back ? '#ff6f2b' : props.cancel? 'red' : '#00a6b6'};
  color: white;
  padding: 11px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
  border-radius: 0px;
  -webkit-transition: background-color 0.3s;
  -webkit-transition-timing-function: ease;
  text-transform: uppercase;

  &:hover {
    background-color: ${props => props.back ? '#ff8d57' : props.cancel? '#e65f5f' :'#00c9dc'};
  }
`;


export const SubLabel = styled.span`
  margin-left: 8px;
  font-weight: normal;
  font-size: 11px;
  color: #008b8b;
`;

export const Helper = styled.p`
  color: #222;
  margin-top: -12px;
  margin-bottom: 18px;
  line-height: 1.3;
  font-size: 90%;
`;

export const ValidationFeedback = styled(HelpBlock)`
  font-weight: normal;
  font-size: 11px;
`;

export const SubLabelInvoice = styled.span`
  font-weight: normal;
  font-size: 11px;
  color: #bbb;
`;

export const GlyphForm = styled(Glyphicon)`
  margin-top: 5px;
  margin-right: 100%;
  color: #00525a;
`;

export const FormInput = styled(FormControl)`
  border-radius: 0px !important;
  height: 38px !important;
`;

export const FormNoBorder = styled(FormControl)`
  border-radius: 0px !important;
`;

export const FormSelect = styled(Select)`
  div:first-child { 
    border-radius: 0px;
  }
`;
