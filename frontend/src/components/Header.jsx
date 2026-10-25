import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

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
          <Nav.Link className="text-white">NBlog</Nav.Link>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox />
          <Nav className="ms-auto">
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                {userInfo.is_admin == true && (
                  <div>
                    <NavDropdown.Item href="/admin/users">
                      Users
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/admin/blogs">
                      Blogs
                    </NavDropdown.Item>
                  </div>
                )}
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
