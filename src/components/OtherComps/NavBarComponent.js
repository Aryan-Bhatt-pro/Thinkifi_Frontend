// NavbarComponent.js

import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" className='justify-content-center'>
      <Navbar.Brand href="#home">ThinkiFi</Navbar.Brand>
      <Nav className="mr-auto " >
        <Nav.Link href="tweet">Hashtag Analysis</Nav.Link>
        <Nav.Link href="user">User Analysis</Nav.Link>
        {/* <Nav.Link href="contact">Contact</Nav.Link> */}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
