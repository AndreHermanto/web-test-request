import styled from 'styled-components';
import { Label } from 'react-bootstrap';

export const Font = {
  'font-family': 'Gotham A,Helvetica,sans-serif',
  'line-height': '1.5em'
}

export const SummaryBox = styled.div`
  border: 1px solid rgb(227, 231, 241);
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
`;

export const SummaryHeading = styled.h3`
  font-weight: 400;
  margin-bottom: 10px;
  color: #1ba8b7;
  ${Font}
`;

export const SectionHeading = styled.h4`
  margin-top: 10px !important;
`;

export const SummaryBreakLine = styled.div`
  border-bottom: 1px solid rgb(227, 231, 241);
  margin-bottom: 15px;
`;

export const EditButton = styled.i`
  cursor: pointer;
  font-size: 2em;
  line-height: 2.3 !important;
  color: #1ba8b7;
`;
export const SummaryTitle = styled.span`
  ${Font}
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 200;
`;

export const SummaryDetails = styled.p`
  ${Font}
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 200;
  line-height: 1;
`;

export const Gene = styled(Label)`
  display: inline-block !important;
  font-weight: 300 !important;
  background-color: #00a6b6 !important;
  padding: 5px 10px 5px 10px !important;
  margin-left:5px;
`;


export const Tag = styled(Label)`
  margin-left: 10px;
  margin-top: 3px;
  position: absolute;
`;

export const SummaryNotes = styled.div`
  background-color: #fafafa;
  padding: 1.3em;
  border-bottom: 1px solid rgb(227, 231, 241);
  margin-bottom: 10px;
`;

export const EditButtonXS = styled.i`
  cursor: pointer;
  font-size: 20px;
  color: #1ba8b7;
  margin-left:10px;
`;
