import React, { useContext, useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import UserContext from "../context/UserContext";

const RegisterPage: React.FC = () => {
  const { login, error } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginHandler = async () => {
    await login(email, password);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.detail
    ) {
      setErrorMessage(error.response.data.detail);
    }
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
                  type="submit"
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

export default RegisterPage;
