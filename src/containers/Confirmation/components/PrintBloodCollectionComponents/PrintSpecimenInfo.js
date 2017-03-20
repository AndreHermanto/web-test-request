import React from 'react';
import {
  PrintHeading,
  Section
} from './../sharedPrintStyle';
import styled from 'styled-components';

export const TickBox = styled.div`
  width: 0.76cm;
  height: 0.76cm;
  display: inline-block;
  border: 1px solid #000;
  margin-bottom: -0.24cm;
  margin-right: 12px;
`;

// PrintSpecimenInfo section
export default function PrintSpecimenInfo(props) {
  return (
    <Section>
      <PrintHeading>
        Specimen Information
      </PrintHeading>
      
      <TickBox /> EDTA Blood: ≥2 mL (neonates); 5-10 mL (adults) <br /><br />
      <TickBox /> DNA: Conc: 10-100ng/uL, Vol: 100uL <br /><br />
      <TickBox /> Other: _______________________________________
    </Section>
  );
}