import styled from 'styled-components';
import { Label } from 'react-bootstrap';

export const SummaryBox = styled.div`
  border: 1px solid rgb(227, 231, 241);
  width: 100%;
  padding: 20px;
  border-bottom: 0px solid transparent;
`;
export const LastBox = styled.div`
  border: 1px solid rgb(227, 231, 241);
  width: 100%;
  padding: 20px;
  margin-bottom:21px;
`;

export const SummaryHeading = styled.h3`
  margin-top: 10px !important;
  font-size: 22px !important;
`;

export const SectionHeading = styled.h4`
  margin-top: 10px !important;
`;

export const SummaryBreakLine = styled.div`
  border-bottom: 1px solid rgb(227, 231, 241);
  margin-bottom: 15px;
`;

export const SummaryTitle = styled.span`
  margin-bottom: 10px;
  font-weight: 200;
`;

export const SummaryDetails = styled.p`
  margin-bottom: 10px;
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
export const GeneLabel = styled(Label)`
  margin-right: 4px;
  display: inline-block !important;
  font-weight: 300 !important;
`;
export const SummaryNotes = styled.div`
  background-color: #fafafa;
  padding: 1.3em;
  border-bottom: 1px solid rgb(227, 231, 241);
  margin-bottom: 10px;
`;

export const Tag = styled(Label)`
  margin-left: 10px;
  position: absolute;
  line-height: normal !important;
  font-size: 12px !important;
  margin-top: 9px;
`;

