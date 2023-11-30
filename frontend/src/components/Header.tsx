import React, { useContext, useEffect } from "react";
import { Container, Nav, Navbar, Button, ButtonGroup } from "react-bootstrap";

import UserContext from "../context/UserContext";

import "./Header.css";

const Header: React.FC = () => {
  const { data, login } = useContext(UserContext);

  useEffect(() => {
    // login("test@localhost.com", "password");
  }, []);

  // console.log("USER", user);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="HeaderContainer">
        <Navbar.Brand className="NavbarBrand">Social Media App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ButtonGroup className="ButtonGroup">
              <Button className="HeaderButton" href="#home">
                Feed
              </Button>
              <Button className="HeaderButton">Profile</Button>
              <Button className="HeaderButton">Register</Button>
              <Button className="HeaderButton">Login</Button>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
