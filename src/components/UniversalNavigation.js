import React from 'react';
import { Navbar, Grid } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../assets/images/g1_logo.png';

const Bar = styled(Navbar)`
  background-image: none !important;
  background-repeat: no-repeat !important;
  height: 90px;
  margin-bottom: 100px;
`;


const NavTitle = styled.span`
  margin-left: 32px;
`;

export default class UniversalNavigation extends React.Component 
{    
  render() 
  {  
    return( 
      <Bar fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                <img 
                  src={logo} 
                  alt="logo" 
                  style={{ width: 120, height:45, marginTop: 10 }} />
              </a>
              <NavTitle>Test Request App</NavTitle>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Bar>
    )
  }
}
