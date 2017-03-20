import React from 'react';
import { Navbar, Grid } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../assets/images/g1_logo.png';

const Bar = styled(Navbar)`
  background-image: none !important;
  background-repeat: no-repeat !important;
`;

const NavTitle = styled.span`
  margin-left: 32px;
`;

export default class UniversalNavigation extends React.Component 
{    
  render() 
  {  
    return( 
      <Bar>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                <img 
                  src={logo} 
                  alt="logo" 
                  style={{ width: 80, height:30, marginTop: -4 }} />
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
