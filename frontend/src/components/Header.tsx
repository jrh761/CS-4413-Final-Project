import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

import UserContext, { LoginToken } from "../context/UserContext";

import "./Header.css";

const Header: React.FC = () => {
  const { data, logout } = useContext(UserContext);

  const [user, setUser] = useState<LoginToken | null>(null);

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <Navbar
      expand="lg"
      className="HeaderContainer"
      style={{ marginBottom: 50 }}
    >
      <Container>
        <Navbar.Brand className="NavbarBrand" href="/">
          Social Media App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="HeaderButton" href="/">
              Feed
            </Nav.Link>
            <Nav.Link
              className="HeaderButton"
              href={`profile/${data?.user.id}`}
            >
              Profile
            </Nav.Link>
          </Nav>
          <Nav>
            {!user?.isAuthenticated && (
              <Nav.Link className="HeaderButton" href="/login">
                Login
              </Nav.Link>
            )}
            {!user?.isAuthenticated && (
              <Nav.Link href="/register" className="HeaderButton">
                Register
              </Nav.Link>
            )}
          </Nav>
          {user?.isAuthenticated && (
            <Nav>
              <Navbar.Text style={{ color: "whitesmoke" }}>
                {user.user.role === "Admin" && (
                  <span
                    style={{ color: "lightgoldenrodyellow", fontWeight: 800 }}
                  >
                    You are an admin user -
                  </span>
                )}{" "}
                Logged in as:{" "}
                <strong>{`${user.user.first_name} ${user.user.last_name}`}</strong>
              </Navbar.Text>
              <Button
                variant="outline-danger"
                className="HeaderButton"
                onClick={logout}
              >
                Logout
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
