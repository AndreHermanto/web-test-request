import React from 'react';
import { Nav, Navbar,  NavItem } from 'react-bootstrap';
export default class UniversalNavigation extends React.Component 
{    
  render() 
  {  
    return( 
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Home</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">Link</NavItem>
          <NavItem eventKey={2} href="#">Link</NavItem>
        </Nav>
      </Navbar>
    )
  }
}
