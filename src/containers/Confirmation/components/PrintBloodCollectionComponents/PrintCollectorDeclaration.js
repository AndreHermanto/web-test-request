import React from 'react';
import { 
  Row, 
  Col
} from 'react-bootstrap';
import {
  PrintHeading
} from './../sharedPrintStyle';
import styled from 'styled-components';

const TypeBox = styled.div`
  width: 1.5cm;
  height: 1.5cm;
  text-align: center;
  display: inline-block;
  border: 1px solid #000;
  margin-right: 12px;
`;

const FieldRow = styled(Row)`
  margin: 0 0 32px 0 !important;
  padding: 0 !important;

  .col-sm-1, 
  .col-sm-2 {
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const FieldLine = styled.span`
  width: 400px;
  height: 16px;
  display: inline-block;
  margin-top: 12px;
  margin-left: -42px;
  border-bottom: 1px solid #000;
`;

// PrintOrderTestModule section
export default function PrintCollectorDeclaration(props) {
  return (
    <div>
      <br />
      <PrintHeading>
        Collector Declaration
      </PrintHeading>
      <br />
      
      <FieldRow>
        I certify that I collected the accompanying specimens from the above patient, whose identity was confirmed by enquiry and/or examination of their name band and that I labelled the specimens immediately following collection.
      </FieldRow>
    
      <FieldRow> 
        <Col sm={2}>
          <strong> Collector's name:  </strong>
        </Col>
        <Col sm={4}><FieldLine /></Col>
      </FieldRow>
    
      <FieldRow> 
        <Col sm={2}>
          <strong> Collector's date:  </strong>
        </Col>
        <Col sm={4}><FieldLine /></Col>
      </FieldRow>
    
      <FieldRow>
        <Col sm={2}>
          <strong> Collector's time:  </strong>
        </Col>
        <Col sm={4}><FieldLine /></Col>
      </FieldRow>
    
      <FieldRow>
        <Col sm={2}>
          <strong> Sample type/site:  </strong>
        </Col>
        <Col sm={4}><FieldLine /></Col>
      </FieldRow>
    
      <FieldRow>
        <TypeBox> LiHep </TypeBox>
        <TypeBox> EDTA </TypeBox>
        <TypeBox> Urine </TypeBox>
        <TypeBox> Fluid </TypeBox>
        <TypeBox> CSF </TypeBox>
        <TypeBox> Histo </TypeBox>
        <TypeBox> Cyto </TypeBox>
        <TypeBox> Other </TypeBox> 
      </FieldRow>
      
      <br />
    
      <FieldRow>
        <Col sm={1}>
          <strong> Signature:  </strong>
        </Col>
        <Col sm={3}><FieldLine style={{ marginLeft: -12, width: 250 }}/></Col>
      </FieldRow>
    
  
    </div>
  );
}