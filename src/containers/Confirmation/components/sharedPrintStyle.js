import styled from 'styled-components';
import { Label } from 'react-bootstrap';

export const PageBreak = styled.div`
  border: 1px solid #abc6ca;
  margin-top: 20pt;
  margin-bottom: 20pt;
  width: 98%;
`;

export const PageEnd = styled.div`
  border: 1px solid #333;
  margin-top: 10pt;
  margin-bottom: 10pt;
  width: 98%;
`;


export const PrintHeading = styled.h3`
  text-align: center !important;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -webkit-print-color-adjust: exact;
  color-adjust: exact; 
  padding-top: 12pt;
  padding-bottom: 12pt;
  margin-bottom: 16pt;
  display: inline-block;
  width: 98%;
  text-transform: capitalize;
  span {
    text-transform: lowercase;
    color: #fff !important;
  }
`;

export const Gene = styled(Label)`
  margin-left: 5px;
  border-color: #00A6B6 !important;
  color: #00A6B6 !important;
  display: inline-block !important;
`;