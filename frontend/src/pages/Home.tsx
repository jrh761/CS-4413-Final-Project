import React from "react";
import { Container } from "react-bootstrap";
import "./Home.css";
import PostCard from "../components/PostCard";

const HomePage: React.FC = () => {
  return (
  <div>
    <Container className="HomeContainer">
      <body className="HomeBodyDiv">
        <main>
          <PostCard></PostCard>
          <PostCard></PostCard>
          <PostCard></PostCard>
        </main>
      </body>
    </Container>
  </div>
  );
};

export default HomePage;
