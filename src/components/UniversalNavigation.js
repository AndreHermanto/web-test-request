import React from 'react';
import { Navbar, Grid } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../assets/images/g1_logo.png';

const Bar = styled(Navbar)`
  background-image: none !important;
  background-repeat: no-repeat !important;
  height: 80px;
  background-color: #fff !important;
  box-shadow: none !important;
  border-radius: 0 !important;
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
        <Grid style={{ maxWidth: 940, padding: 0 }}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">
                <img 
                  src={logo} 
                  alt="logo" 
                  style={{ width: 'auto', height: 50, marginTop: 0 }} />
              </a>
              <NavTitle style={{ color: '#222' }}>Test Request App</NavTitle>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Bar>
    )
  }
}
