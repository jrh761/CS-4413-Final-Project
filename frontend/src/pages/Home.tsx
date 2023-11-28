import React from "react";
import { Container } from "react-bootstrap";
import "./Home.css";

const HomePage: React.FC = () => {
  return (
  <div>
    <Container className="HomeContainer">
      <div className="ContentDiv">
        <header>This is the Home page!</header>
      </div>
    </Container>
  </div>
  );
};

export default HomePage;
