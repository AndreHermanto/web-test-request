import React from 'react';
import logo from './logo.png';
import { 
  Row, 
  Col
} from 'react-bootstrap';

// Print Record Header
export default function PrintRecordHeader(props) {
  let date = (new Date(props.showDate)).toLocaleDateString('en-GB', {
    day : 'numeric',
    month : 'numeric',
    year : 'numeric',
    hour: 'numeric',
    minute:'numeric',
    second:'numeric'
  }).split('/').join('-');

  return (
    <div>
      <Row>
        <Col sm={6}>
          <img 
            src={logo} 
            className="App-logo" 
            alt="logo"
            style={{ width: 250, marginTop:20 }}
            />
          <div style={{ marginTop: 70 }}>
            Request Id: {props.showId} <br />
            Date submitted: {date}
          </div>
        </Col>

        <Col sm={6}>
          <div className="pull-right" style={{marginRight:'20pt'}}>
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