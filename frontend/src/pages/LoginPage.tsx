import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import UserContext from "../context/UserContext";

const LoginPage: React.FC = () => {
  const { data, login, error } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  console.log(data);

  useEffect(() => {
    if (data.isAuthenticated) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.detail
    ) {
      setErrorMessage(error.response.data.detail);
    }
  }, [error]);

  const loginHandler = async () => {
    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      return;
    }
    setErrorMessage("");
    await login(email, password);
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", paddingTop: "100px" }}
    >
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Login</Card.Title>
              <Form>
                <Form.Group className="pb-4" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div>
                  {errorMessage && (
                    <div className="pt-2 text-danger text-center">
                      {errorMessage}
                    </div>
                  )}
                </div>
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={() => loginHandler()}
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
