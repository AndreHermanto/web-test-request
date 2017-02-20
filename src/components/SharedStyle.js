import styled from 'styled-components';
import {
  Button,
  HelpBlock
} from 'react-bootstrap';

export const PageHeading = styled.h3`
  margin-bottom: 21px;
  font-weight: 300;
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

export const ValidationFeedback = styled(HelpBlock)`
  font-weight: normal;
  font-size: 11px;
`;
