import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.userLogin);
  const { userInfo } = loginUser;

  const logoutHandler = () => {
    dispatch(logout());
  };
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
            {userInfo ? (
              <NavDropdown title={userInfo.username} id="basic-nav-dropdown">
                <NavDropdown.Item href="">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fa-brands fa-pied-piper-hat"></i>Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
