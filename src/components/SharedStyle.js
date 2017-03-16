import styled from 'styled-components';
import {
  Button,
  HelpBlock,
  Glyphicon,
  FormControl
} from 'react-bootstrap';

export const PageHeading = styled.h3`
  margin-bottom: 21px;
  font-weight: 300;
  text-transform:capitalize;
`;
 
export const FormButton = styled(Button)`
  margin-right: 6px;
  margin-top: 21px;
`;

export const SubLabel = styled.span`
  margin-left: 8px;
  font-weight: normal;
  font-size: 11px;
  color: #bbb;
`;

export const Helper = styled.p`
  color: #696969;
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
  height: 45px !important;
`;