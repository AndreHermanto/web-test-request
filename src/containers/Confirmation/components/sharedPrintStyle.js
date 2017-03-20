import styled from 'styled-components';
import { Label } from 'react-bootstrap';

export const PageBreak = styled.div`
  border: 1px solid #abc6ca;
  margin-top: 10pt;
  margin-bottom: 10pt;
  width: 98%;
`;

export const Section = styled.div`
  margin-bottom: 32pt;
`;

export const PrintHeading = styled.h3`
  text-align: center !important;
  background-color: #678286 !important;
  border: 1px solid #678286;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -webkit-print-color-adjust: exact;
  color-adjust: exact; 
  padding-top: 12pt;
  padding-bottom: 12pt;
  margin-bottom: 16pt;
  color: white !important;
  display: inline-block;
  width: 98%;
`;

export const Gene = styled(Label)`
  margin-left: 5px;
  border-color: #00A6B6 !important;
  color: #00A6B6 !important;
  display: inline-block !important;
`;