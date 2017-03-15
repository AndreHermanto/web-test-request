import React, { Component } from 'react';
import styled from 'styled-components';
import { hashHistory } from 'react-router';
import { Row } from 'react-bootstrap';


const Container = styled.div`
  width: 1000px;
  margin: auto; 
`;

const Lists = styled.ul`
  margin: 0;
  padding: 0;
  counter-reset: step;
`;

const Nav = styled.li`
  list-style-type: none;
  width: 14%;
  float: left;
  font-size: 12px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;

  &:before{
    width: 30px;
    height: 30px;
    content: counter(step);
    counter-increment: step;
    line-height: 30px;
    border: 2px solid #7d7d7d;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
  }

  &:after{
    width: 100%;
    height: 2px;
    content: '';
    position: absolute;
    background-color: #7d7d7d;
    top: 15px;
    left: -50%;
    z-index: -1;
  }

  &:first-child:after {
    content: none;
  }
`;

const active = {
  color: "black",
  fontWeight: "bold",
  fontSize: "13px"
};


export default class ProgressBar extends Component 
{ 
  render() 
  {  
    return(
    <div style={{ display: hashHistory.getCurrentLocation().pathname === "/confirmation" ? 'none' : 'block' }}>
      <Row>
        <Container>
          <Lists>
            <Nav style={hashHistory.getCurrentLocation().pathname === "/step1"? active : {}}>
              Order Test
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/step2"? active : {}}>
              Patient Details
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/step3"? active : {}}>
              Clinical Information
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname.includes("/step4") ? active : {}}>
              Family Member
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/step5"? active : {}}>
              Clinician Details
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/step6"? active : {}}>
              Billing Info
            </Nav>

            <Nav style={hashHistory.getCurrentLocation().pathname === "/summary"? active : {}}>
              Summary
            </Nav> 
          </Lists>
        </Container>
      </Row>
            
      <Row>
        {this.props.children}
      </Row>
    </div>
    )
  }
}
