import React from 'react';
import { Nav, Navbar,  NavItem, Grid } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../../assets/images/g1_logo.png';

const Bar = styled(Navbar)`
  background-color: #e8f0ff !important;
  background-image: none !important;
  background-repeat: no-repeat !important;
`;

const Link = styled(NavItem)`
  &:hover {
    background-color: #aabfca !important;
  }
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
                <a href="/"><img src={logo} alt="logo" width="80px" height="30px"/></a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
                <Link eventKey={1} href="#">Link</Link>
                <Link eventKey={2} href="#">Link</Link>
            </Nav>
          </Grid>
        </Bar>
    )
  }
}
