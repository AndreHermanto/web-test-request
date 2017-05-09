import styled from 'styled-components';
import {
  HelpBlock,
  Glyphicon,
  FormControl,
  Button
} from 'react-bootstrap';
import Select from 'react-select';
import colorLine from './../assets/images/color_line.jpg';

export const PageHeading = styled.h3`
  margin-bottom: 21px;
  text-transform:capitalize;
  font-weight: 400;
  font-size: 32px
  line-height: 38px;
  color: #484848;

  &:after { 
    background:url(${colorLine}) no-repeat;
    background-size: 50px 6.25px;
    content:" ";
    display: block;
    width: 50px;
    height: 6.25px;
    margin: 20px 0 20px 0;
  }
`;

export const SubHeading = styled.h4`
  margin-bottom: 15px;
  font-weight: 450;
  text-transform:capitalize;
`;

export const FormButton = styled.button`
  margin: 18px 6px 0px 0px;
  border: 2px solid;
  border-color: rgba(0, 0, 0, .1)
  border-radius: 100px;
  background-color: ${props => props.back ? '#fff' : props.cancel? 'red' : '#00a6b6'};
  color: ${props => props.back ? 'black' : '#fff'};
  padding: 0 30px 0 30px;
  height: 40px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir;
  line-height: 16px;
  font-weight: 800;
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

export const BreakLine = styled.div`
  border:1px solid #eee;
  margin-top: ${props => props.top ? props.top : 0};
  margin-right: ${props => props.right ? props.right : 0};
  margin-bottom: ${props => props.bottom ? props.bottom : 0};
  margin-left: ${props => props.left ? props.left : 0};
`;

export const FileList = styled.div`
  width: 100%;
  height: 24px;
  margin-bottom: 8px;

`;

export const FileLink = styled(Button)`
  color: #000 !important; 
  float: left;
  width: 70%;
  word-break: break-all;
  white-space: normal !important;
  text-align: left !important;
`;
