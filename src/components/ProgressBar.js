import React, { Component } from 'react';
import styled from 'styled-components';
import { hashHistory } from 'react-router';
import { Row, Col } from 'react-bootstrap';

const Content = styled.strong`
  display: block;
  font-weight: 500;
`;

const Container = styled(Col)`
  padding-top: 30px;
  padding-left: 77px !important;

`;

const ContainerContent = styled(Col)`
  padding-left: 70px !important;
  border-left: thin solid #CCC;
`;

const Lists = styled.ul`
  position: relative;
  padding-left: 45px;
  list-style: none;
  
  &::before {
    display: inline-block;
    content: '';
    position: absolute;
    top: 0;
    left: 15px;
    width: 10px;
    height: 100%;
    border-left: 2px solid #CCC;
  }  
`;

const Nav = styled.li`
    position: relative;
    counter-increment: list;
    
    &:not(:last-child) {
      padding-bottom: 20px;
    }
    
    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      left: -30px;
      height: 100%;
      width: 10px;
    }
    
    &::after {
      content: counter(list);
      display: inline-block;
      position: absolute;
      padding-top: 1px;
      top: -4px;
      left: -40px;
      width: 24px;
      height: 24px;;
      border: 2px solid #CCC;
      border-radius: 50%;
      background-color: #FFF;
      text-align: center;
      color: #CCC;
    }
`;

const Active = styled.li`
    position: relative;
    counter-increment: list;
    
    &:not(:last-child) {
      padding-bottom: 20px;
    }
    
    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      left: -30px;
      height: 100%;
      width: 10px;
      border-left: 2px solid green;
    }
    
    &::after {
      content: counter(list);
      display: inline-block;
      padding-top: 1px;
      position: absolute;
      top: -4px;
      left: -40px;
      width: 24px;
      height: 24px;
      border: 2px solid green;
      border-radius: 50%;
      background-color: white;
      text-align: center;
      color: green;
    }
`;


export default class ProgressBar extends Component 
{ 
  render() 
  {  
    return(
    <div style={{ display: hashHistory.getCurrentLocation().pathname === "/confirmation" ? 'none' : 'block' }}>
      <Row>
        <Container md={3}>
          <Lists>
          {hashHistory.getCurrentLocation().pathname === "/step1"?
            <Active>
              <Content>Select Test</Content>
            </Active>
            :
            <Nav>
              <Content>Select Test</Content>
            </Nav>
          }

          {hashHistory.getCurrentLocation().pathname === "/step2"?
            <Active>
              <Content>Patient Details</Content>
            </Active>
            :
            <Nav>
              <Content>Patient Details</Content>
            </Nav>
          }

          {hashHistory.getCurrentLocation().pathname === "/step3"?
            <Active>
              <Content>Clinical Information</Content>
            </Active>
            :            
            <Nav>
              <Content>Clinical Information</Content>
            </Nav>
          }

          {hashHistory.getCurrentLocation().pathname.includes("/step4") ?
            <Active>
              <Content>Family Member</Content>
            </Active>
            :          
            <Nav>
              <Content>Family Member</Content>
            </Nav>
          }

          {hashHistory.getCurrentLocation().pathname === "/step5"?
            <Active>
              <Content>Clinician Details</Content>
            </Active>
            :
            <Nav>
              <Content>Clinician Details</Content>
            </Nav>
          }

          {hashHistory.getCurrentLocation().pathname === "/step6"?
            <Active>
              <Content>Billing Info</Content>
            </Active>
            :
            <Nav>
              <Content>Billing Info</Content>
            </Nav>
          }

          {hashHistory.getCurrentLocation().pathname === "/summary"?
            <Active>
              <Content>Summary</Content>
            </Active>
            :            
            <Nav>
              <Content>Summary</Content>
            </Nav>
          } 
          </Lists>
        </Container>
        <ContainerContent md={9}>
          {this.props.children}
        </ContainerContent>
      </Row>
    </div>
    )
  }
}
