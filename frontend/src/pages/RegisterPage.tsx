import React, { useContext, useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import UserContext from "../context/UserContext";
import axios from "../utils/api";

const RegisterPage: React.FC = () => {
  const { data, error, login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const registerHandler = async () => {
    if (!email || !password || !firstName || !lastName) {
      setErrorMessage("Please enter all fields");
      return;
    }
    setErrorMessage("");

    const formData = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = await axios.post("/users/register", formData);

      if (response.status === 200) {
        await login(email, password);
      } else {
        setErrorMessage("Something went wrong");
      }
    } catch (error: any) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh", paddingTop: "100px" }}
    >
      <Row>
        <Col>
          <Card style={{ padding: 50 }}>
            <Card.Body>
              <Card.Title className="text-center">Register</Card.Title>
              <Form>
                <Form.Group className="py-4" controlId="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="pb-4" controlId="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder="Enter first name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="pb-4" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="pb-4" controlId="formBasicPassword">
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
                  onClick={() => registerHandler()}
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
