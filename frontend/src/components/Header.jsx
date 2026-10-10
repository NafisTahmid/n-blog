import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      data-bs-theme="dark"
      variant="dark"
      collapseOnSelect={true}
    >
      <Container>
        <LinkContainer to="/">
          {/* <Navbar.Brand href="#home">NBlog</Navbar.Brand> */}
          <Nav.Link className="text-white">NBlog</Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/blogs">
              <Nav.Link>
                <i className="fa-brands fa-pied-piper-hat"></i> Become a
                Member!!!
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
