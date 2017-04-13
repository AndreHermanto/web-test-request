import React from 'react';
import logo from './logo.png';
import { 
  Row, 
  Col
} from 'react-bootstrap';

// Print Header
export default function PrintHeader(props) {
  return (
    <div>
      <Row>
        <Col sm={4}>
          <img 
            src={logo} 
            className="App-logo" 
            alt="logo"
            style={{ width: 200 }}
            />
          <div style={{ marginTop: 70 }}>
            Request Id: {props.showId} <br />
            Date submitted: {props.showDate}
          </div>
        </Col>

        <Col sm={4} style={{ border: '2px solid #000', padding: 12 }}>
          <div>
            <b>
            Deliver specimens to: <br />
            Central Specimen Reception (CSR)SydPath <br />
            </b>
            St Vincent’s Hospital, Xavier Building <br />
            Level 6, 390 Victoria St <br />
            Darlinghurst NSW 2010 Australia <br />
            P +61 2 8382 9100
          </div>
        </Col>

        <Col sm={4}>
          <div style={{ fontSize: 11 }} className="pull-right">
            <p style={{ marginBottom: 8 }}>
            Genome.One Pty Ltd <br />
            ACN 608 029 732 <br />
            </p>
            
            <p style={{ marginBottom: 16 }}>
            370 Victoria St <br />
            Darlinghurst NSW 2010 <br />
            Sydney  Australia
            </p>
            
            <p>
            P +61 2 9359 8002 <br />
            F +61 2 9359 8033 <br />
            E enquiries@genome.one <br />
            Web: www.genome.one
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}