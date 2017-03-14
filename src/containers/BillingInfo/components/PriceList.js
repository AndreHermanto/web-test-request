import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Box = {
  border: '1px solid #eee',
  'border-bottom':'0px',
  'padding-top': '5px',
  'padding-bottom': '5px'
}
const InfoBox = styled.div`
  ${Box}
`;

const PriceBox = styled.div`
  ${Box}
`;

/**
 * PriceList - UI for input billing details.
 */
function PriceList (props) {
    return (
      <Row>
        <Col md={12}>
          <InfoBox className="col-md-9" style={props.style}>
            {props.priceList.info} {props.index}
          </InfoBox>
          <PriceBox className="col-md-2" style={props.style}>
            ${props.priceList.price}
          </PriceBox>
        </Col>
      </Row>
    );
}

export default PriceList;