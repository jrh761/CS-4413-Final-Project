import React from "react";
import { Container } from "react-bootstrap";
import "./Profile.css";

const Profile: React.FC = () => {
  return (
  <div>
    <Container className="ProfileContainer">
      <body className="ProfileBodyDiv">
        <main>
          <p>Profile Page</p>
        </main>
      </body>
    </Container>
  </div>
  );
};

export default Profile;
